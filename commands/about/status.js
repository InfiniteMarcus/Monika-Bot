const statusList = [
    'Put some bot status here!',
    'And here!'
]

let status = statusList[Math.floor((Math.random() * statusList.length))];

setInterval(function(){
    index = Math.floor((Math.random() * statusList.length));
    status = statusList[index];
}, 900000);

module.exports = {
	name: 'status',
    description: 'O que será que estou fazendo agora?',
    display: true,
	cooldown: 300,
	execute(bot, msg, args) {
        msg.reply(status);
        return 1;
	},
};