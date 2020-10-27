const ytdl = require('ytdl-core-discord');

//validar url?

async function play(msg, channel, url){
    const string = await ytdl(url, { filter: 'audioonly' });

    return await channel.join().then(connection => {
        const dispatcher = connection.play(string, { type: 'opus' });
        dispatcher.setVolume(0.5);
        return 1;
    }).catch(e => {
        console.error(e);
        msg.reply("Deu algum probleminha aqui! Tente de novo mais tarde");
        return 0;
    });
}

module.exports = {
	name: 'play',
    description: 'Toco um vídeo do Youtube pra você!',
    args: true,
    usage: '<_URL do vídeo_>',
    aliases: ['p'],
    guildOnly: true,
    display: true,
	cooldown: 90,
	execute(bot, msg, args) {
        if(msg.member.voice.channel){
            memberVoiceId = msg.member.voice.channel.id;
        }else{
            msg.reply("Você não está em um canal de voz!");
            return 0;
        }

        channel = bot.channels.cache.get(memberVoiceId);
    
        if (!channel){
            msg.reply("Deu algum probleminha aqui! Tente de novo mais tarde");
            return 0;
        }
    
        return play(msg, channel, args[0]);
	},
};