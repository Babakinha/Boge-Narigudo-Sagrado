//Imports
import { messageEvent, interactionEvent, commandInterface } from "../util/interfaces";
import imageUtils from '../util/imageUtil'
import { MessageAttachment } from "discord.js";
import missileGif from "../edits/missileGif";

//Command
const flipa: commandInterface = {
    names: ["missile", "missel", "explode", "explodir"],

    run: {
        async message(e: messageEvent){
            let url = e.args[0];

            if(!url) return e.message.reply("Por favor mande uma url ou mencione alguém\nEx: DOGE.missile <https://imgur.com/qjUFwno.png>");

            try {
                url = await imageUtils.getImageUrl(url, e.client);


                let videoBuffer = await missileGif(url);
                let attatchment = new MessageAttachment(videoBuffer, 'kaboom.mp4')

                return e.message.reply({content:"Toma", files:[attatchment]});
            }catch(error) {
                return e.message.reply("Desculpa, Algo deu errado aqui, tente usar outra imagem?");
            }

        },
        async interaction(e: interactionEvent){
            let url = e.interaction.options.get("menção")?.user?.displayAvatarURL()?.replace(/.webp/, ".png?size=4096") || 
            e.interaction.options.get("imagem")?.value;

            if(!url) return e.interaction.reply("Por favor mande uma url ou mencione alguém\nEx: DOGE.missile <https://imgur.com/qjUFwno.png>");

            try {
                url = await imageUtils.getImageUrl(String(url), e.client);

                let videoBuffer = await missileGif(url);
                let attatchment = new MessageAttachment(videoBuffer, 'kaboom.mp4')

                return e.interaction.reply({content:"Toma", files:[attatchment]});
            }catch(error) {
                return e.interaction.reply("Desculpa, Algo deu errado aqui, tente usar outra imagem?");
            }
        }
    }
};

module.exports = flipa;