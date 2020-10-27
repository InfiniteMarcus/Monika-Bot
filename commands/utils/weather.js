const axios = require('axios');
const Discord = require('discord.js');
const accents = require('remove-accents');

function createWeatherEmbed(name, response){
	let apiData = response;
	let temp = Math.ceil(apiData.data.main.temp)
    let maxTemp = apiData.data.main.temp_max;
    let minTemp = apiData.data.main.temp_min;
    let humidity = apiData.data.main.humidity;
    let wind = apiData.data.wind.speed;
    let icon = apiData.data.weather[0].icon
    let pressure = apiData.data.main.pressure;
	let cloudness = apiData.data.weather[0].description;
	let lati = apiData.data.coord.lon;
	let longi = apiData.data.coord.lat;
				
	let embedResponse = new Discord.MessageEmbed()
	.setColor(0x1d51cc)
	.setAuthor("Monika")
	.setTitle(`A temperatura em ${name} é: ${temp}\u00B0`)
	.addField(`Máxima:`, `${maxTemp}\u00B0 C`, true)
	.addField(`Mínima:`, `${minTemp}\u00B0 C`, true)
	.addField(`Umidade:`, `${humidity} %`, true)
	.addField(`Velocidade do vento:`, `${wind} m/s`, true)
	.addField(`Pressão atmosférica:`, `${pressure} hpa`, true)
	.addField(`Céu:`, `${cloudness}`, true)
	.addField('Latitude:', `${lati}`, true)
	.addField('Longitude:', `${longi}`, true)
	.setThumbnail(`http://openweathermap.org/img/w/${icon}.png`)

	return(embedResponse);
}

module.exports = {
	name: 'weather',
	description: 'Veja como está o tempo no lugar escolhido!',
	args: true,
	usage: '<_nome do lugar_>',
	display: true,
	cooldown: 100,
	execute(bot, msg, args) {
		let name = "";
		for(let i = 0; i < args.length; i++){
			if(i < args.length - 1)
				name = name + args[i] + " ";
			else 
				name += args[i];
		}

		return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${accents.remove(name)}&units=metric&lang=pt&appid=MYAPIID`)
		.then(function (response) {
			msg.reply(createWeatherEmbed(name, response));
			return 1;
		})
		.catch(function (error) {
			msg.reply("Deu algum problema aqui! Tente escrever o nome do lugar de outra forma!");
			return 0;
		})
	},
};