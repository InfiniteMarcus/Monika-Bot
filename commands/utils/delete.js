function deletePerson(msg, person){
    msg.channel.send("Apagando <@" + person.id + "> agora");

    let memberRoles = person.roles.cache.clone();
    person.roles.remove(memberRoles);

    person.voice.kick();

    setTimeout(async function(){
        await person.roles.add(memberRoles);
    }, 30000);
}

module.exports = {
	name: 'delete',
    description: 'Deleto alguém pra você!',
    args: true,
    usage: '<_menção_>',
    guildOnly: true,
    aliases: ['del'],
    display: true,
    cooldown: 150,
    level: 4,
    coins: 5,
	execute(bot, msg, args) {
		
        const taggedMember = msg.mentions.members.first();
        const taggedUser = msg.mentions.users.first();
    
        if(taggedMember === undefined){
            msg.reply("deu errinho! Veja se menção está correta");
            return 0;
        }
        else if(taggedMember.displayName === "Monika"){
            msg.reply("epa! Essa sou eu!");
            msg.channel.send("Hora de você ver o que é bom pra tosse");
            deletePerson(msg, msg.member);
            return 0;
        } 
        else if(taggedUser.bot){
            msg.reply("deixa meus amigos em paz!");
            return 0;
        } 
        else {
            deletePerson(msg, taggedMember);
            return 1;
        }
	},
};