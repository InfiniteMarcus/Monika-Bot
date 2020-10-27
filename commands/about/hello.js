module.exports = {
	name: 'hello',
	description: 'Diga oi para mim!',
	display: true,
	cooldown: 300,
	execute(bot, msg, args) {
		msg.channel.send("Konnichiwa, " + "<@" + msg.author.id + ">" + " :kissing_heart: :kissing_heart: :kissing_heart:!!!");
		return 1;
	},
};