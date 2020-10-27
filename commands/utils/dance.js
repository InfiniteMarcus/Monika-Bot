
module.exports = {
	name: 'dance',
	description: 'Bora requebrar!',
	display: true,
	level: 1,
	cooldown: 150,
	execute(bot, msg, args) {
		msg.channel.send('https://i.pinimg.com/originals/6f/45/63/6f4563c093a53f53b00799114e1c7a8f.gif');
		return 1;
	},
};