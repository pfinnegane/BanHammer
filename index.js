const { prefix, token, helpEmbed, ModLogs } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Banhammer is ready. Logged in as ${client.user.tag}`);
});


/** ON MESSAGE RECIEVED
 * 
 */
client.on('message', msg => {

    /**
     * TODO - fix the argument initialization.
     */
    if(!msg.guild) return;
    if(!msg.content.startsWith(prefix)) return;

    const command = msg.content.split(" ").slice()[1];
    const args = msg.content.split(`banhammer ${command}`).slice()[1];

    const availableCommands = ['help', 'kick', 'ban', 'approach'];
    
    if(!availableCommands.includes(command)) return;
    if(!msg.member.hasPermission('KICK_MEMBERS')) return;

    /** ADMINISTRATIVE COMMANDS
     * Moderation
     * 
     * help / no-args => display help rich embed
     * ban
     * kick
    */
    if(command === 'approach'){
        const banhammerEmbed = {
            color: 0x0099ff,
            title : "This is your last warning.",
            fields: [{
                name: "The Banhammer Approaches",
                value: "https://www.youtube.com/watch?v=1-EiYgCubmM"
            }],
            image: {
                url : "https://media1.tenor.com/images/ae83976e867ebc2722054a632ff045ad/tenor.gif?itemid=11035060"
            },
            footer: {
                text: "Do not bring me here again."
            },
        };
        return msg.channel.send({embed: banhammerEmbed});
    }
    if(command === 'help'){
        const helpEmbed = 
        {
            color: 0x0099ff,
            title : "Administrative functions",
            fields : [{
                name : "Moderation",
                value : "kick, ban, warn, purge",
            },
            {
                name : "Channel",
                value : "lock, unlock, prune",
            }],
        };

        msg.channel.send({embed : helpEmbed});
    }

    if (command === 'ban') {
        const userToBan = msg.mentions.users.first();
        console.log(args);
        
        if(userToBan) {
            if(userToBan) return msg.reply("you can't ban yourself.");

            const member = msg.guild.member(userToBan);

            if(member) {
                msg.guild.member(userToBan).kick(reason).then(() => {
                    msg.guild.channels.get(ModLogs).send(`${msg.author.username} has banned ${userToBan.username} for ${reason}`);
                    return msg.guild.member(userToBan).ban(reason);
                });
            } else {
                msg.reply(`the user ${userToBan} is not in the guild.`);
                console.error(err);
            }
        } else {
            msg.reply("you didn't mention a user.");
        }
        if (msg.member.user == userToBan) {
            return msg.reply("you can't ban yourself.");
        } else {
            
        }
        
    }

    if(command === 'kick'){
        const userToKick = msg.mentions.users.first();
        const reason = args[2];
        if(userToKick){
            if(userToKick == msg.member.user) return msg.reply("you can't kick yourself.");

            const member = msg.guild.member(userToKick);

            if(member) {
                msg.guild.member(userToKick).kick(reason).then(() => {
                    msg.guild.channels.get(ModLogs).send(`${msg.author.username} has kicked ${userToBan.username} for ${reason}`);
                }).catch( err => {
                    msg.reply("Could not kick.");
                    console.error(err);
                });
            } else {
                msg.reply(`the user ${userToKick} is not in the guild.`);
                console.error(err);
            }
        } else {
            msg.reply("you didn't mention a user.");
        }
    }
    /** ADMINISTRATIVE COMMANDS
     * Channel Management
     * lock, unlock, clean
     * 
     * TODO - lock: lock channel <duration> <channel>
     * TODO - unlock: unlock channel <channel>
     * TODO - clean: clean messages <amount> || <duration>
    */
     if(command === 'lock' || command === 'unlock'){
        msg.reply(`the lock command is not yet available.`);
        
     }
     function lock() {
        const channel = msg.channel;

        if(args.length == 0) {
            channel.lockPermissions({});
        }
        if(args.length == 1) {
            const channel = msg.channel;
            const duration = args[1];
            channel.lockPermissions({});
            setTimeout((channel) => {

            }, duration)
        }
     }
     
})

client.login(token);