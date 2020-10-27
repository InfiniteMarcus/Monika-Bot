const {prefix, secret_prefix, directories, mainTextChannel} = require('./config.json');
const {Client} = require('pg');

const pg_client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: 5432,
});

async function connectTo () {
    await pg_client.connect();
    usersInfo = await pg_client.query('SELECT * FROM Users');
}

async function giveXp(bot, user, db_client, xpAmount) {
    if(db_client.rows.length < 1){
        await pg_client.query(`INSERT INTO Users VALUES ('${user.id}', '${user.username}', 0, ${xpAmount}, 0, NULL, 0)`);
    }else{
        let newLevel = 0;
        let newStars = db_client.rows[0].dis_stars;
        let newCoins = db_client.rows[0].dis_coins;
        let newXp = db_client.rows[0].dis_xp + xpAmount;
        if(newXp >= 100){
            if(db_client.rows[0].dis_lv < 10){
                newLevel++;
                newCoins += 5;
                if(newCoins > 100){
                    newCoins = 100;
                    bot.channels.cache.get(mainTextChannel).send(`<@${user.id}> está lotado de hackooncoins! Gaste algumas para continuar ganhando mais`);
                }
                bot.channels.cache.get(mainTextChannel).send(`Parabéns <@${user.id}>!!! Seu nível agora é: ${db_client.rows[0].dis_lv + 1}`);
            }else{
                newStars++;
                newLevel -= 10;
                newCoins += 25;
                bot.channels.cache.get(mainTextChannel).send(`Parabéns!!! <@${user.id}> ultrapassou o nível máximo e ganhou 25 hackooncoins! Mas seu XP foi resetado...`);
                if(newCoins > 100){
                    newCoins = 100;
                    bot.channels.cache.get(mainTextChannel).send(`<@${user.id}> está lotado de hackooncoins! Gaste algumas para continuar ganhando mais`);
                }
            }
            newXp -= 100;
        }else if(newXp < 0){
            newXp = 0;
        }
        newLevel += db_client.rows[0].dis_lv;
        await pg_client.query(`UPDATE Users SET dis_lv = ${newLevel}, dis_xp = ${newXp}, dis_coins = ${newCoins}, dis_username = '${user.username}', dis_stars = '${newStars}' WHERE dis_id = '${user.id}'`);
    }
}

async function giveCoins(bot, user, db_client, coins){
    if(db_client.rows.length < 1){
        return console.log("Não da pra dar moeda")
    }
    let newCoinAmount = db_client.rows[0].dis_coins + coins
    if(newCoinAmount > 100){
        newCoinAmount = 100;
        bot.channels.cache.get(mainTextChannel).send(`<@${user.id}> está lotado de hackooncoins! Gaste algumas para continuar ganhando mais`);
    }

    await pg_client.query(`UPDATE Users SET dis_coins = ${newCoinAmount}, dis_username = '${user.username}' WHERE dis_id = '${user.id}'`);
}

async function removeCoins(bot, user, db_client, coins){
    if(db_client.rows.length < 1){
        return console.log("Não da pra tirar moeda")
    }
    let newCoinAmount = db_client.rows[0].dis_coins - coins;
    if(newCoinAmount < 0){
        newCoinAmount = 0;
        bot.channels.cache.get(mainTextChannel).send(`<@${user.id}> está zerado de hackooncoins! Ganhe mais interagindo no servidor`);
    }
    
    await pg_client.query(`UPDATE Users SET dis_coins = ${newCoinAmount}, dis_username = '${user.username}' WHERE dis_id = '${user.id}'`);
}

async function addBirth(msg, day, month){
    const dateWithYear = `${day}-${month}-2020`;
    return pg_client.query(`UPDATE Users SET dis_birth = TO_DATE('${dateWithYear}', 'DD/MM/YYYY') WHERE dis_id = '${msg.author.id}'`);
}

async function getUser(memb){
    return pg_client.query(`SELECT * FROM Users where dis_id = '${memb.id}'`);
}

async function getUsers(){
    return pg_client.query(`SELECT * FROM Users`);
}

async function changeColor(id, color){
    return pg_client.query(`UPDATE Users SET dis_colors = '${color}' WHERE dis_id = '${id}'`);
}

async function levelRank(){
    return pg_client.query('SELECT dis_username, dis_lv, dis_stars FROM Users ORDER BY dis_stars DESC, dis_lv DESC, dis_xp DESC LIMIT 5')
}

async function endConnect(){
    await pg_client.end();
}

module.exports = {
    connectTo,
    giveXp,
    giveCoins,
    removeCoins,
    addBirth,
    getUser,
    getUsers,
    changeColor,
    levelRank,
    endConnect
};