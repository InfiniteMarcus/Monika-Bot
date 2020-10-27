const tipList = [
	'Put some tips here!'
];

let todayTip = tipList[Math.floor((Math.random() * tipList.length))];

setInterval(function(){
    index = Math.floor((Math.random() * tipList.length));
    todayTip = tipList[index];
}, 86400000);

module.exports = {
	name: 'tip',
	description: 'Veja qual é minha dica do dia!',
	display: true,
	cooldown: 150,
	execute(bot, msg, args) {
		msg.reply("Dica do dia: " + todayTip);
		return 1;
	},
};