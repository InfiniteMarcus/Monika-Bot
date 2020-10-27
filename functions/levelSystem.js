const {prefix, secret_prefix, directories, textChannel, afkChannel} = require('./config.json');

const cooldownAmount = 350000;

function verifyCooldown (msg, xpCooldowns) {
    const timestamps = xpCooldowns.get(msg.author.id);

    if(timestamps){
        const expirationTime = timestamps + cooldownAmount;
        const now = Date.now();

        if (now < expirationTime) {
            //const timeLeft = (expirationTime - now) / 1000;
            //console.log(`Por favor espere mais ${timeLeft.toFixed(1)}`);
            return 1;
        }
    }
    return 0;
}

function addCooldown (msg, xpCooldowns){
    if (!xpCooldowns.has(msg.author.id)) {
        const now = Date.now();
        xpCooldowns.set(msg.author.id, now);
        setTimeout(() => xpCooldowns.delete(msg.author.id), cooldownAmount);
    }
}

function voiceVerify(bot, db){
    setInterval(function(){
        if(bot.voice.connections.size){
            console.log("Estou conectada a " + bot.voice.connections.size);
            bot.voice.connections.each(element => {
                if(element.channel.id !== afkChannel && element.channel.members.size > 2){
                    element.channel.members.each(memb => {
                        if(!memb.user.bot){
                            if(!memb.voice.selfMute){
                                db.getUser(memb.user).then( res => {
                                    db.giveXp(bot, memb.user, res, 1);
                                });
                            }
                        }
                    })
                }
            });
        }
    }, 600000);
}

module.exports = {
    verifyCooldown,
    addCooldown,
    voiceVerify
};
