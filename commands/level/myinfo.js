const Discord = require('discord.js');
const db = require('../../functions/database.js');

const embedColors = [
    '0xefff0a', //amarelo
    '0x359e08', //verde
    '0x0affbe', //ciano
    '0x0a89ff', //azul claro
    '0x0a0aff', //azul escuro
    '0x8d0aff', //roxo claro
    '0xda0aff', //roxo para rosa
    '0xff0ad2', //rosa
    '0xc910c0', //rosa mais escuro
    '0x9c1f68'  //vinho
]

async function getMyInfo(bot, msg, args){
    await db.getUser(msg.author)
    .then(res => {
        let embed = new Discord.MessageEmbed()
        .setAuthor("Monika")

        if(res.rows.length < 1){
            embed.addField("Nome:", msg.author.username)
            .setColor(embedColors[0])
            .addField("Level:", "0")
            .addField("XP:", "0/100")
            .addField("HackoonCoins:", "0");
        }else{
            embed.addField("Nome:", res.rows[0].dis_username)
            .addField("Level:", res.rows[0].dis_lv)
            .addField("XP:", res.rows[0].dis_xp + "/100")
            .addField("HackoonCoins:", res.rows[0].dis_coins);

            if(res.rows[0].dis_colors)
                embed.setColor(res.rows[0].dis_colors);
            else
                embed.setColor(res.rows[0].dis_lv < 0? embedColors[0] : embedColors[res.rows[0].dis_lv - 1]);
            
            if(res.rows[0].dis_stars)
                embed.addField("Prestígio:", ":star:".repeat(res.rows[0].dis_stars));
            
        }
        msg.channel.send(embed);
    })
}

module.exports = {
	name: 'myinfo',
    description: 'Veja seus dados no servidor!',
    aliases: ['info'],
    display: true,
    cooldown: 30,
	execute(bot, msg, args) {
        getMyInfo(bot, msg, args)
        return 1;
	},
};