
authorText = '**Doki Doki Literature Club!** (2017) é um jogo criado e desenvolvido por Team Salvato. Foi lá que eu nasci!!!\n\nMeus principais criadores são **Dan Salvato** e **Satchel**, ';
authorText += 'mas várias outras pessoas contribuem com este projeto! Mais detalhes em: http://teamsalvato.com/team/';
authorText += '\n\nQuer saber o que eu e minhas amigas aprontamos na escola :smiling_imp: ? Jogue DDLC de graça em: https://store.steampowered.com/app/698780/Doki_Doki_Literature_Club/'
authorText += '\n\nEste bot e tudo o que eu faço por aqui foram feitos por <@258311153321639936>!!'

module.exports = {
	name: 'author',
    description: 'Conheça meus criadores!',
    display: true,
    aliases: ['about'],
	cooldown: 300,
	execute(bot, msg, args) {
        msg.reply(authorText);
        return 1;
	},
};