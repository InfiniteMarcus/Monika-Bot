const Discord = require('discord.js');
const db = require('../../functions/database.js');

async function getRank(msg,){
    return await db.levelRank()
    .then(res => {
        if(res.rows.length < 1){
            msg.reply("Deu algum problema aqui! Tente de novo mais tarde");
            return 0;
        }

        let embed = new Discord.MessageEmbed()
        .setTitle('Ranking de interação do servidor')
        .setColor("0xc910c0");

        let i = 0;
        while(i < 5){
            embed.addFields(
                { name: 'Apelido:', value: `${res.rows[i].dis_username}`, inline: true },
                { name: 'Nível', value: `${res.rows[i].dis_lv}`, inline: true },
                { name: 'Prestígio', value: res.rows[i].dis_stars? ":star:".repeat(res.rows[i].dis_stars) : "0", inline: true },
            )

            i++;
        }

        embed.setFooter('Obrigado por participarem no servidor!');

        msg.channel.send(embed);
        return 1;
    }).catch(error =>{
        console.log(error)
        msg.reply("Deu algum problema aqui! Tente de novo mais tarde");
        return 0;
    })
}

module.exports = {
	name: 'rank',
    description: 'Veja o ranking de quem mais interage no servidor!',
    aliases: ['top'],
    display: true,
    guildOnly: true,
    cooldown: 120,
	execute(bot, msg, args) {
        return getRank(msg);
	},
};