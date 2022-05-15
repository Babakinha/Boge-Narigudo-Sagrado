//Imports
import { messageEvent, interactionEvent, commandInterface } from "../util/interfaces";
import imageUtils from '../util/imageUtil'
import { MessageAttachment } from "discord.js";
import flipGif from "../edits/flipGif";

//Command
const flipa: commandInterface = {
    names: ["flipa", "flip", "gira"],

    run: {
        async message(e: messageEvent){
            let url = e.args[0];
            const speed = Number(e.args[1]);

            if(!url) return e.message.reply("Por favor mande uma url ou mencione alguém\nEx: DOGE.flip <https://imgur.com/qjUFwno.png> 4");

            try {
                url = await imageUtils.getImageUrl(url, e.client);


                let gifBuffer = await flipGif(url, speed);
                let attatchment = new MessageAttachment(gifBuffer, 'girando.gif')

                return e.message.reply({content:"Toma", files:[attatchment]});
            }catch(error) {
                return e.message.reply("Desculpa, Algo deu errado aqui, tente usar outra imagem?");
            }

        },
        async interaction(e: interactionEvent){
            let url = e.interaction.options.get("menção")?.user?.displayAvatarURL()?.replace(/.webp/, ".png?size=4096") || 
            e.interaction.options.get("imagem")?.value;

            const speed = Number(e.interaction.options.get("speed")?.value);

            if(!url) return e.interaction.reply("Por favor mande uma url ou mencione alguém\nEx: DOGE.flip <https://imgur.com/qjUFwno.png> 4");

            try {
                url = await imageUtils.getImageUrl(String(url), e.client);

                let gifBuffer = await flipGif(url, speed);
                let attatchment = new MessageAttachment(gifBuffer, 'girando.gif')

                return e.interaction.reply({content:"Toma", files:[attatchment]});
            }catch(error) {
                return e.interaction.reply("Desculpa, Algo deu errado aqui, tente usar outra imagem?");
            }
        }
    }
};

module.exports = flipa;