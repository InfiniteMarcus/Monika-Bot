module.exports = {
	name: 'leave',
	description: 'Saio do canal de voz em que você está!',
    args: false,
    guildOnly: true,
    display: true,
	cooldown: 90,
	level: 2,
	execute(bot, msg, args) {
        const channel = msg.member.voice.channel;
        if (!channel){
            msg.reply("Você não está em um canal de voz!");
            return 0;
        }else{
			channel.leave();
			msg.reply(" bye bye! :heart:");
			return 1;
		}
	},
};