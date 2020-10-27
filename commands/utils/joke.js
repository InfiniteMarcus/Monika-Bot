const monikaJokeList = [
	'Toc toc...',
	'Put other jokes here'
]

module.exports = {
	name: 'joke',
	description: 'Te conto uma piada!',
	display: true,
	cooldown: 150,
	execute(bot, msg, args) {
		msg.channel.send("Toc toc...");
		return 1;
	},
};