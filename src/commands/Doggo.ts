//Imports
import { messageEvent, interactionEvent, commandInterface, commandCategory } from "../util/interfaces";
import { MessageEmbed } from 'discord.js'
import nekoClient from 'nekos.life'

const neko = new nekoClient();
const kaomojis = ['(つ✧ω✧)つ', '(づ￣ ³￣)づ', '(づ ◕‿◕ )づ', '(づ◡﹏◡)づ', '(つ . •́ _ʖ •̀ .)つ'] // is there a kaomoji package?

//Embed
const embed = new MessageEmbed()
    .setTitle(`Doggo („ಡωಡ„)`)
    .setColor(0x40E0D0)
    .setURL("https://nekos.life")
    .setImage("https://cdn.discordapp.com/avatars/487644363124637718/a_415f94cbfab6c764d6ef5efe78a11a59.gif?size=4096")
    .setFooter({ text: "Cortesia de nekos.life", iconURL: "https://avatars.githubusercontent.com/u/34457007"});

//Command
const doggo: commandInterface = {
    names: ["doge", "dog", "doggo"],
    category: commandCategory.Imagem,
    description: "Manda um doginho aleatorio :3",

    run: {
        async message(e: messageEvent){
            embed.setTitle(`Doggo ${kaomojis[Math.floor(Math.random() * kaomojis.length)]}`);
            embed.setImage((await neko.sfw.woof()).url);

            return e.message.reply({embeds: [embed]});
        },
        async interaction(e: interactionEvent){
            embed.setTitle(`Doggo ${kaomojis[Math.floor(Math.random() * kaomojis.length)]}`);
            embed.setImage((await neko.sfw.woof()).url);

            return e.interaction.reply({embeds: [embed]});
        }
    }
};

module.exports = doggo;