//Imports
import { messageEvent, interactionEvent, commandInterface, commandCategory } from "../util/interfaces";
import imageUtils from '../util/imageUtil'
import { MessageAttachment } from "discord.js";
import missileGif from "../edits/missileGif";

//Command
const flipa: commandInterface = {
    names: ["missile", "missel", "explode", "explodir"],
    category: commandCategory.Video,
    description: "Kaboom.",



    run: {
        async message(e: messageEvent){

            try {
                let url = await imageUtils.getImageUrl(e);
                if(!url) return e.message.reply("Por favor mande uma url ou mencione alguém\nEx: DOGE.missile <https://imgur.com/qjUFwno.png>");


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
                //TODO: url = await imageUtils.getImageUrl(e);

                let videoBuffer = await missileGif(url as string);
                let attatchment = new MessageAttachment(videoBuffer, 'kaboom.mp4')

                return e.interaction.reply({content:"Toma", files:[attatchment]});
            }catch(error) {
                return e.interaction.reply("Desculpa, Algo deu errado aqui, tente usar outra imagem?");
            }
        }
    }
};

module.exports = flipa;