const {prefix, secret_prefix, directories, textChannel} = require('./config.json');
const Discord = require('discord.js');

const months = {
    'Jan' : '01',
    'Feb' : '02',
    'Mar' : '03',
    'Apr' : '04',
    'May' : '05',
    'Jun' : '06',
    'Jul' : '07',
    'Aug' : '08',
    'Sep' : '09',
    'Oct' : '10',
    'Nov' : '11',
    'Dec' : '12'
}

const birthCooldown = new Discord.Collection();

setInterval(function(){
	birthCooldown.forEach(id => {
		birthCooldown.delete(id);
	});
}, 86400000);

module.exports = {
	name: 'birthdays',
	description: 'Verify Birthdays!',
	async execute(bot, db) {
		setInterval(function(){
            let today = new Date();
            const fToday = today.toISOString().slice(0,10).split('-');
            
            db.getUsers()
            .then(members =>{
                members.rows.forEach(row => {
                    if(row.dis_birth){
                        console.log(row.dis_username);
                        const fBirth = row.dis_birth.toString().split(/ +/);
                        console.log("fbirth: " + fBirth[2] + " " + months[fBirth[1]]);
                        console.log("fToday: " + fToday[2] + " " + fToday[1]);
                        if(fBirth[2] == fToday[2] && months[fBirth[1]] == fToday[1] && !birthCooldown.get(row.dis_id)){
                            let db_client = members;
                            db_client.rows[0] = row;
                            db.giveCoins(bot, bot.users.cache.get(row.dis_id), db_client, 10);
                            birthCooldown.set(row.dis_id, 1);
                            bot.channels.cache.get(textChannel).send(`Parabéns <@${row.dis_id}> :birthday: :partying_face: !!! É seu aniversário!!! De presente, estou te dando 10 hackooncoins! Aproveite!!`);
                        }else
                            console.log("Não é aniversário dele")
                    }
                })
            })
        }, 21600000);
	},
};