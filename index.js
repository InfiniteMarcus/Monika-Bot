const fs = require('fs');
const db = require('./functions/database.js');
const Discord = require('discord.js');
const aleatory = require('./functions/aleatory.js');
const levelSystem = require('./functions/levelSystem.js');
const birthdays = require('./functions/birthdays.js');
const {prefix, secret_prefix, directories} = require('./config.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

for(const dir of directories){
    const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        bot.commands.set(command.name, command);
    }
}

bot.login(process.env.BOT_TOKEN);

aleatory.execute(bot);
levelSystem.voiceVerify(bot, db);
birthdays.execute(bot, db);

const usageCooldowns = new Discord.Collection();
const xpCooldowns = new Discord.Collection();

db.connectTo();

bot.on('ready', ()=>{

    bot.user.setPresence({ activity: { name: 'Doki Doki Literature Club', type: 'PLAYING' }, status: 'online' });

    console.log('Estou na sua realidade!');
});

bot.on('guildMemberAdd', function(member){
    let mainRole = member.guild.roles.cache.find(role => role.name === "Gafanhoto");
    member.roles.add(mainRole);
    member.guild.channels.cache.find(channel => channel.name === "boas-vindas").send("Olá " + "<@" + member.id + ">!!! Seja bem vindo(a)!!!\n\n Se tiver alguma dúvida, não tenha medo de perguntar! Só hackeamos os outros nas horas vagas..." );
});

bot.on('guildMemberRemove', member => {
    member.guild.channels.cache.find(channel => channel.name === "boas-vindas").send("<@" + member.id + ">, fez overclocking e queimou o PC. Até mais!!!");
})

bot.on('message', async msg => {

    if(msg.author.bot || msg.content.length < 4) return;

    await db.getUser(msg.author)
    .then( res => {
        temp = async () => {
            if(!levelSystem.verifyCooldown(msg, xpCooldowns)){
                db.giveXp(bot, msg.author, res, 1);
                levelSystem.addCooldown(msg, xpCooldowns);
            }
        }

        temp();

        if((!msg.content.startsWith(prefix)) && (!msg.content.startsWith(secret_prefix))) return;

        //Only set this if your bot needs to respond only in a specific channel
        //if(msg.channel.id !== "") return;

        if(msg.content.startsWith(secret_prefix))
            return msg.reply(" apenas eu!");

        const args = msg.content.slice(prefix.length+2).split(/ +/);
        const commandName = args.shift().toLowerCase();

        if(!commandName)
            return msg.reply("Eu estou sempre aqui por você, basta me chamar!!\nDigite 'monika -help' para ver o que eu posso fazer!");

        console.log("Commando: " + commandName);
        console.log("Args: " + args[0]);

        const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (command.args && !args.length && command.display) 
            return msg.reply(`Ta faltando coisa nesse comando! Uso esperado: ${prefix} -${commandName} ${command.usage}`);

        if(command.stars){
            if(res.rows.length < 1 || res.rows[0].dis_stars < command.stars){
                return msg.reply("Você não tem prestígio suficiente pra este comando!");
            }      
        }

        if(command.level){
            if(res.rows[0].dis_stars === 0){
                if(res.rows.length < 1 || res.rows[0].dis_lv < command.level){
                    return msg.reply("Você não tem nível suficiente pra este comando!");
                }     
            } 
        }

        if(command.coins){
            if(res.rows.length < 1 || res.rows[0].dis_coins < command.coins){
                return msg.reply("Você não tem moedas suficientes pra este comando!");
            }  
        }

        if (!usageCooldowns.has(command.name)) {
            usageCooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = usageCooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(msg.author.id)) {
            const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
    
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return msg.reply(`Por favor espere mais ${timeLeft.toFixed(1)} segundos para usar este comando`);
            }
        }
    
        try{
            const ans = command.execute(bot, msg, args);

			if(Promise.resolve(ans) == ans){
				ans.then(result => {
					if(result){
						timestamps.set(msg.author.id, now);
                        setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
                        if(command.coins){
                            db.removeCoins(bot, msg.author, res, command.coins);
                        }
					}
				})
            }else if(ans){
                timestamps.set(msg.author.id, now);
                setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
                if(command.coins){
                    db.removeCoins(bot, msg.author, res, command.coins);
                }
            }
    
        } catch (error){
            console.log(error);
        }

    })
    .catch(e => console.log(e))
})