const {prefix, secret_prefix, directories, textChannel} = require('./config.json');

module.exports = {
	name: 'everyone',
    description: 'Chamo todo mundo pra você!',
    guildOnly: true,
    display: true,
    cooldown: 150,
    level: 10,
    coins: 100,
	execute(bot, msg, args) {
        bot.channels.cache.get(textChannel).send(`<@${msg.author.id}> está chamando todo mundo! Venham rápido! ` +  "@everyone");
        return 1;
	},
};