module.exports = {
	name: 'twitter',
	description: 'Me siga no Twitter!',
	display: true,
	cooldown: 300,
	execute(bot, msg, args) {
		msg.reply("https://twitter.com/lilmonix3");
		return 1;
	},
};