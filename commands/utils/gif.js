function getIndex(){
    return Math.floor((Math.random() *  gifArray.length));
}

const gifArray = [
    'Put some good gifs here!'
]

module.exports = {
	name: 'gif',
    description: 'Te dou um gif aleatório!',
    display: true,
	cooldown: 60,
	execute(bot, msg, args) {
        msg.channel.send(gifArray[getIndex()]);
        return 1;
	},
};