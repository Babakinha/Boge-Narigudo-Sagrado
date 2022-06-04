//Imports
import { messageEvent, interactionEvent, commandInterface, commandCategory } from "../util/interfaces";
import imageUtils from '../util/imageUtil'
import { MessageAttachment } from "discord.js";
import bobfireImage from "../edits/bobfireImage";
import { lib } from "../util/artistDoggo";

//Command
const flipa: commandInterface = {
    names: ["bob"],
    category: commandCategory.Beta,
    description: "I Hope you die in a fire",



    run: {
        async message(e: messageEvent){
            const speed = Number(e.args[1]);

            try {
                let url = await imageUtils.getImageUrl(e);
                if(!url) return e.message.reply("Por favor mande uma url ou mencione alguém\nEx: DOGE.bob <https://imgur.com/qjUFwno.png> 4");

                let img = await imageUtils.url2buff(url);

                let rusty_buffer = await bobfireImage(img);
                let real_buffer = Buffer.from(rusty_buffer.data.buffer.buffer.slice(0, rusty_buffer.len as number));
                let attatchment = new MessageAttachment(real_buffer, 'bobfire.png');

                e.message.reply({content:"Toma", files:[attatchment]});
                lib.free_buf(rusty_buffer);
                return;
            }catch(error) {
                return e.message.reply("Desculpa, Algo deu errado aqui, tente usar outra imagem?");
            }finally {}

        },
        async interaction(e: interactionEvent) {
            return e.interaction.reply("Desculpa, Esse comando ainda não existe em interação :(");

        }
    }
};

module.exports = flipa;