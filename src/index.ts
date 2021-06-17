
//Imports
import * as Fs from 'fs';
import * as Discord from 'discord.js';
import * as dotenv from "dotenv";
import { Prefix } from './defaultConfig.json';

//Load environment variables
try {
    dotenv.config({ path: __dirname+'/.env' });
} catch (error) {
    console.log(".env file not found, (*ﾉ▽ﾉ) GOING IN BLIND");
} 

const Token = process.env.TOKEN;
const dev = process.env.NODE_ENV === "dev";
//Discord Variables

export interface messageEvent {
    message: Discord.Message,
    client: Discord.Client,
    args: string[],
    dev: boolean

}
export interface interactionEvent {
    interaction: Discord.CommandInteraction,
    client: Discord.Client,
    dev: boolean
    
}
export interface commandInterface {
    names: string[],
    run: {
        message: (event: messageEvent) => any,
        interaction: (event: interactionEvent) => any
    }
};

var ClientOptions : Discord.ClientOptions = {
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
};

const Client = new Discord.Client(ClientOptions);
const Commands: Discord.Collection<commandInterface["names"], commandInterface["run"]> = new Discord.Collection();

//Load Commands
Fs.readdir(__dirname+'/commands/', (err, allFiles) => {
    if (err) console.log(err);
    let files = allFiles.filter(f => f.split('.').pop() === (dev ? 'ts' : 'js'));
    if (files.length <= 0) console.log('No commands found!');
    else for(let file of files) {
        const props = require(`./commands/${file}`) as commandInterface;
        Commands.set(props.names, props.run);
        require('./commands/Doggo')
    }
});

//Events
Client.once('ready', async () => {
    console.log("Bot is on!");
    Client.user!.setActivity('A mãe do samir na cama', { type: 'PLAYING'});

});

Client.on('interaction', async (interaction) => {
    if(!interaction.isCommand()) return;
    try {
        const commandFile = Commands.find((r, n) => {if(!n) return false;return n.includes(interaction.commandName)});
        if(!commandFile) throw TypeError;
        else commandFile.interaction({
            interaction: interaction,
            client: Client,
            dev: dev
        });
    } catch (error) {
        if(error.name == "TypeError"){
            interaction.reply('N achei esse comando (￣▽￣*)ゞ');
        }else {
            interaction.reply('SOMETHING IS WRONG, I CAN FEEL IT...\nCongrats!!!\nYou broke my bot ( ╥ω╥ )\nPlease contact me and maybe i can fix it!\n\n - <@!487644363124637718>');
            console.log(`Hey ${interaction.member?.user.username} Found a "${error.message}" error, while using the ${interaction.commandName} Command.`);
        }
    }
});

Client.on('message', async (message) => {
    if (!message.content.toLowerCase().startsWith(Prefix) || message.author.bot) return;

    const args: string[] = message.content.slice(Prefix.length).trim().split(/ +/);
    const command = args.shift()!.toLowerCase();
    
    try {
        const commandFile = Commands.find((r, n) => {if(!n) return false;return n.includes(command)});
        if(!commandFile) throw TypeError;
        else commandFile.message({
            message: message,
            args: args,
            client: Client,
            dev: dev
        });
    } catch (error) {
        if(error.name == "TypeError"){
            message.reply('N achei esse comando (￣▽￣*)ゞ');
        }else {
            message.reply('SOMETHING IS WRONG, I CAN FEEL IT...\nCongrats!!!\nYou broke my bot ( ╥ω╥ )\nPlease contact me and maybe i can fix it!\n\n - <@!487644363124637718>');
            console.log(`Hey ${message.author.username} Found a "${error.message}" error, while using the ${command} command with this args {${args}}.`);
        }
    }
});

//Login
Client.login(Token);