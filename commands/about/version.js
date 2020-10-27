const monikaVersion = "1.00";

module.exports = {
	name: 'version',
	description: 'Veja a versão atual do meu software!',
	display: true,
	cooldown: 300,
	execute(bot, msg, args) {
		msg.reply("Minha versão atual é: " + monikaVersion);
		return 1;
	},
};