const { prefix } = require('../../config.json');

module.exports = {
	name: 'help',
	description: 'Te ajudo com os comandos do servidor!',
	aliases: ['commands'],
	usage: '<nome do comando>',
	display: true,
	cooldown: 5,
	execute(bot, msg, args) {
		const data = [];
		const { commands } = msg.client; 

		if (!args.length) {

			data.push('Um pouco do que eu posso fazer:');
			data.push(commands.filter(command => command.display === true).map(command => " -**" + command.name + "** -> " + command.description).join('\n'));
			data.push(`\nUse \"_${prefix} -help_ <nome do comando>\" para ter mais detalhes sobre um comando específico!\n\nArigato! :heart:`);

			msg.reply(data, { split: true });
			return 1;
		}

		let name = args[0].toLowerCase();
		name = name.replace(/^-/, '');
		console.log(name);
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command || !command.display) {
			msg.reply('não conheço esse comando...');
			return 0;
		}
		
		data.push(`**Nome:** -${command.name}`);

		if (command.aliases) data.push(`**Apelidos:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Descrição:** ${command.description}`);
		if (command.usage) data.push(`**Uso:** ${prefix} -${command.name} ${command.usage}`);
		if (command.level) data.push(`**Nível mínimo necessário:** ${command.level}`);
		if (command.stars) data.push(`**Prestígio mínimo necessário:** ${command.stars}`);
		if (command.coins) data.push(`**Moedas exigidas:** ${command.coins}`);
		if (command.cooldown) data.push(`**Tempo de espera:** ${command.cooldown} segundos`);

		msg.channel.send(data, { split: true });
		return 1;
	},
};






