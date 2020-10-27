module.exports = {
	name: 'roll',
    description: 'Rolo um dado de quantos lados você quiser!',
    args: true,
    usage: '<_número_>',
    display: true,
    cooldown: 2,
	execute(bot, msg, args) {
        if(!isNaN(args[0])){
            msg.reply(Math.floor((Math.random() * args[0])) + 1);
            return 1;
        }else{
            msg.reply("Opa! Vê esse número de novo aê!");
            return 0;
        }
	},
};