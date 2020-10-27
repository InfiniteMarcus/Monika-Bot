const tcpp = require('tcp-ping');
const Discord = require('discord.js');
const util = require('util');

const tcpProbe = util.promisify(tcpp.probe);
const tcpPing = util.promisify(tcpp.ping);

function createPingEmbed(data){
		let embedResponse = new Discord.MessageEmbed()
		.setColor(0x7ba7ed)
		.setAuthor("Monika")
		.setTitle(`Ping TCP em ${data.address} na porta ${data.port}`)
		.addField(`Média:`, `${ Math.ceil(data.avg)}ms`, true)
		.addField(`Máximo:`, `${ Math.ceil(data.max)}ms`, true)
		.addField(`Mínimo:`, `${ Math.ceil(data.min)}ms`, true)
		.addField(`Tentativas:`, `${data.attempts}`, true)

		return (embedResponse);
}

async function probe(ip, port){
    return await tcpProbe(ip, port);
}

async function ping(ip, p){
	return await tcpPing({ address: ip, port: p });
}

module.exports = {
	name: 'ping',
	description: 'Veja o tempo de resposta entre eu e você, ou eu e outro site! :heart:!',
	display: true,
	level: 2,
	usage: 'monika -ping (ms até a Monika) ou monika -ping <_ip_> <_porta_> (ms até o ip em certa porta)',
	cooldown: 150,
	execute(bot, msg, args) {
		if(!args[0]){
			const ping = Date.now() - msg.createdTimestamp + " ms";
			msg.reply("Tempo de resposta: `" + `${Date.now() - msg.createdTimestamp}` + " ms`");
			return 1;
		}else{
			let myPort = 80;
			if(args[1])
				myPort = args[1];

			return probe(args[0], Number(myPort))
			.then( result => {
				if(result){
					return ping(args[0], Number(myPort))
					.then( res => {
						if(res){
							msg.reply(createPingEmbed(res));
							return 1;
						}else{
							msg.reply("Deu errinho aqui! Tente novamente mais tarde!");
							return 0;
						}
					})
					.catch( error => {
						msg.reply("Deu errinho aqui! Tente novamente mais tarde!");
						return 0;
					});
				}else{
					msg.reply("Deu errinho aqui! Tente novamente mais tarde!");
					return 0;
				}
			})
			.catch( error => {
				msg.reply("Deu errinho aqui! Tente novamente mais tarde!");
				return 0;
			});
		}
	}
	
};




















