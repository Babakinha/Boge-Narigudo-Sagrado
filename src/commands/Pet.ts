//Imports
import { messageEvent, interactionEvent, commandInterface } from "../util/interfaces";
import { MessageEmbed, MessageAttachment } from 'discord.js'
import messageUtil from '../util/messageUtil'
const petPetGif = require('pet-pet-gif');

//Embed
let embed = new MessageEmbed()
                .setColor(0x40E0D0)
                .setTitle("Pet Pet!")
                .setImage("attachment://pet.gif");

//Command

const doggo: commandInterface = {
    names: ["petpet", "pet", "petgif", "petpetgif"],

    run: {
        async message(e: messageEvent){
            //Check args
            let url = e.args[0];
            if(!url) return e.message.reply("Por favor mande uma url ou mencione alguém\n Ex: DOGE.pet <https://imgur.com/qjUFwno.png>");
            
            try {
                //Check for mention ).displayAvatarURL().replace(/.webp/, ".png?size=4096");
                await messageUtil.getUserByMention(url, e.client).then((user) => url = user.displayAvatarURL().replace(/.webp/, ".png?size=4096"), () => {});
                
                //Make and Send gif
                let animatedGif = await petPetGif(url);
                const attachment = new MessageAttachment(animatedGif, 'pet.gif');
                return e.message.reply({embeds: [embed], files: [attachment]});
    
            }catch(error) {
                return e.message.reply("Desculpa, Algo deu errado aqui, tente usar outra imagem?");
            }


        },
        async interaction(e: interactionEvent){
            //Check args
            const url = e.interaction.options.get("menção")?.user?.displayAvatarURL()?.replace(/.webp/, ".png?size=4096") || 
                        e.interaction.options.get("imagem")?.value;
            

            if(!url) return e.interaction.reply("Por favor mande uma url ou mencione alguém\n Ex: DOGE.pet https://imgur.com/qjUFwno.png");
            //Make and Send gif
            try {
                let animatedGif = await petPetGif(url);
                const attachment = new MessageAttachment(animatedGif, 'pet.gif');
                
                return e.interaction.reply({embeds: [embed], files: [attachment]});
    
            }catch(error) {
                return e.interaction.reply("Desculpa, Algo deu errado aqui, tente usar outra imagem?")
            }
        }
    }
};

module.exports = doggo;