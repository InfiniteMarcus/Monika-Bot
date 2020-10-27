
//I will make a better future.js in the future. And that's not a joke, I swear
let futureFeatures = "Put new features here!";

module.exports = {
	name: 'future',
	description: 'Veja o que poderei fazer logo logo!',
	display: true,
	cooldown: 300,
	execute(bot, msg, args) {
		msg.reply("O que você pode esperar: " + futureFeatures);
		return 1;
	},
};