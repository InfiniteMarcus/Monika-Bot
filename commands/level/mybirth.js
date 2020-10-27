const Discord = require('discord.js');
const db = require('../../functions/database.js');

module.exports = {
	name: 'mybirth',
    description: 'Me diga quando é seu aniversário!',
    display: true,
    args: true,
    guildOnly: true,
    usage: '<_DD_>/<_MM_>',
    cooldown: 90,
	execute(bot, msg, args) {
        return db.getUser(msg.author)
        .then(res => {
            if(res.rows[0].dis_birth){
                const dates = res.rows[0].dis_birth.toString().split(/ +/);
                msg.reply(`Você já cadastrou seu aniversário com a data: ${dates[2]}/${dates[1]}`);
                return 0;
            } else {
                const fBirth = args[0].split("/");
                return db.addBirth(msg, fBirth[0], fBirth[1])
                .then(res => {
                    msg.reply(`Obrigado! Quando seu aniversário chegar, vamos comemorar juntos!!! :partying_face:`);
                    return 1;
                })
                .catch(error => {
                    msg.reply(`Ocorreu algum problema! Tente de novo mais tarde!`);
                    return 0;
                })
            }
        })
	},
};