//Imports
import { messageEvent, interactionEvent, commandInterface } from "../index";
import { MessageEmbed, MessageAttachment, Util } from 'discord.js'
const petPetGif = require('pet-pet-gif')

const kaomojis = ['(つ✧ω✧)つ', '(づ￣ ³￣)づ', '(づ ◕‿◕ )づ', '(づ◡﹏◡)づ', '(つ . •́ _ʖ •̀ .)つ'] // is there a kaomoji package?

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
            let url = e.args[0]
            if(!url) return e.message.reply("Por favor mande uma url ou mencione alguém\n Ex: DOGE.pet https://imgur.com/qjUFwno.png");

            //Check for mention
            if (url.startsWith('<@') && url.endsWith('>')) {
                url = url.slice(2, -1);
        
                if (url.startsWith('!')) {
                    url = url.slice(1);
                }

                const user = await e.client.users.fetch(Util.binaryToID(BigInt(String(url)).toString(2))); //I hate snowflakes
                url = user.displayAvatarURL().replace(/.webp/, ".png?size=4096");
            }

            //Make and Send gif
            try {
                let animatedGif = await petPetGif(url)
                const attachment = new MessageAttachment(animatedGif, 'pet.gif');
                return e.message.reply({embeds: [embed], files: [attachment]});
    
            }catch(error) {
                return e.message.reply("Desculpa, Algo deu errado aqui, tente usar outra imagem?")
            }


        },
        async interaction(e: interactionEvent){
            //Check args
            const url = e.interaction.options.get("menção")?.user?.displayAvatarURL()?.replace(/.webp/, ".png?size=4096") || 
                        e.interaction.options.get("imagem")?.value;
            

            if(!url) return e.interaction.reply("Por favor mande uma url ou mencione alguém\n Ex: DOGE.pet https://imgur.com/qjUFwno.png");
            //Make and Send gif
            try {
                let animatedGif = await petPetGif(url)
                const attachment = new MessageAttachment(animatedGif, 'pet.gif');
                
                return e.interaction.reply({embeds: [embed], files: [attachment]});
    
            }catch(error) {
                return e.interaction.reply("Desculpa, Algo deu errado aqui, tente usar outra imagem?")
            }
        }
    }
};

module.exports = doggo;