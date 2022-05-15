
//Imports
import * as Discord from 'discord.js';
import * as dotenv from "dotenv";
import { Prefixes } from './config/defaultConfig.json';

import commandHandler from './util/commandHandler';

//Load environment variables
try {
    dotenv.config({ path: __dirname+'/.env' });
} catch (error) {
    console.log(".env file not found, (*ﾉ▽ﾉ) GOING IN BLIND");
} 

const Token = process.env.TOKEN;
//Discord Variables

var ClientOptions : Discord.ClientOptions = {
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
};

const Client = new Discord.Client(ClientOptions);

//Load Commands
const Commands = new commandHandler()
Commands.loadCommands(__dirname + '/commands/');

//Events
Client.once('ready', async () => {
    console.log("Bot is on!");
    Client.user!.setActivity('Being a good boi', { type: 'PLAYING'});

});

Client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) return;
    try {
        Commands.getCommand(interaction.commandName).interaction({
            interaction: interaction,
            client: Client
        });
    }catch(e) {
        let errorMessage = (e as Error).message
        if(errorMessage === "CommandNotFound"){
            interaction.reply('N achei esse comando (￣▽￣*)ゞ');
        }else {
            interaction.reply('SOMETHING IS WRONG, I CAN FEEL IT...\nCongrats!!!\nYou broke my bot ( ╥ω╥ )\nPlease contact me and maybe i can fix it!\n\n - <@!487644363124637718>');
            console.log(`Hey ${interaction.member?.user.username} Found a "${errorMessage}" error, while using the ${interaction.commandName} Command.`);
            console.log(e);
        }
    }
});

Client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    let prefix: string = "";

    for(const i in Prefixes) {
        if(message.content.toLowerCase().startsWith(Prefixes[i])){
            prefix = Prefixes[i];
            break;
        }
    };

    if(!prefix) return;

    const args: string[] = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()!.toLowerCase();
    
    try {
        Commands.getCommand(command).message({
            message: message,
            args: args,
            client: Client           
        });
    } catch (e) {
        let errorMessage = (e as Error).message
        if(errorMessage === "CommandNotFound"){
            message.reply('N achei esse comando (￣▽￣*)ゞ');
        }else {
            message.reply('SOMETHING IS WRONG, I CAN FEEL IT...\nCongrats!!!\nYou broke my bot ( ╥ω╥ )\nPlease contact me and maybe i can fix it!\n\n - <@!487644363124637718>');
            console.log(`Hey ${message.author.username} Found a "${errorMessage}" error, while using the ${command} command with this args {${args}}.`);
            console.log(e);
        }
    }
});

//Login
Client.login(Token);