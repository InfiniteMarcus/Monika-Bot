const db = require('../../functions/database.js');

async function setMyColor(bot, msg, args){
    return await db.getUser(msg.author)
    .then(res => {
        if(res.rows.length < 1){
            return errorMessage(msg);
        }else{
            return db.changeColor(msg.author.id, args[0])
            .then(res => {
                if(res){
                    msg.reply(`Sua cor foi trocada para ${args[0]}`);
                    return 1;
                }else{
                    return errorMessage(msg);
                }
            })
            .catch(error => {
                console.log(error);
                return errorMessage(msg);
            })
        }
    })
}

function errorMessage(msg){
    msg.reply("Deu probleminha aqui! Tente de novo mais tarde");
    return 0;
}

module.exports = {
	name: 'mycolor',
    description: 'Escolha sua cor no servidor!',
    usage: '<_cor em hexadecimal_>',
    aliases: ['color'],
    args: true,
    display: true,
    coins: 5,
    stars: 1,
    cooldown: 30,
	execute(bot, msg, args) {
        return setMyColor(bot, msg, args);
	},
};