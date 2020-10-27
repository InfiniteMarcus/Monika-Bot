const {prefix, secret_prefix, directories, textChannel} = require('./config.json');

const messageList = [
    'Write your messages here!',
    'Like this!',
    'And like this!'
]

module.exports = {
	name: 'aleatory',
	description: 'Aleatory message!',
	execute(bot) {
		setInterval(function(){
            let index = Math.floor((Math.random() * 12));

            if(index === 1){
                index = Math.floor((Math.random() * messageList.length));
                let sendChannel = bot.channels.cache.find(channel => channel.id === textChannel);
                
                if(sendChannel)
                    sendChannel.send(messageList[index]);
            }
        }, 3600000);
	},
};