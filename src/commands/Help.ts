//Imports
import { messageEvent, interactionEvent, commandInterface, commandCategory } from "../util/interfaces";

let cachedMessage = "";

//Command
const leave: commandInterface = {
    names: ["help", "ajuda"],
    category: commandCategory.Beta,
    description: "Mostra esse mensagem :O",

    run: {
        async message(e: messageEvent){

            if(cachedMessage == "") {
                let audioCommands = "";
                let videoCommands = "";
                let imageCommands = "";
                let utilCommands = "";
                let betaCommands = "";
                e.commandHandler.Commands.forEach((command, names) => {
                    if (!names) return;
                    let msg = ` - \`${names[0]}\`: ${command.description? command.description : ""}\n`
                    switch(command.category) {
                        case commandCategory.Audio: { audioCommands += msg; break; };
                        case commandCategory.Video: { videoCommands += msg; break; };
                        case commandCategory.Imagem: { imageCommands += msg; break; };
                        case commandCategory.Utilidades: { utilCommands += msg; break; };
                        case commandCategory.Beta: { betaCommands += msg; break; };
                    }
                });

                cachedMessage = `**• Audio**\n${audioCommands}\n` +
                    `**• Video**\n${videoCommands}\n` +
                    `**• Imagens**\n${imageCommands}\n` +
                    `**• Utilidades**\n${utilCommands}\n` +
                    `**• Beta**\n${betaCommands}\n`
            }

            e.message.reply(cachedMessage);
        },
        async interaction(e: interactionEvent){
            return e.interaction.reply("Desculpa, Esse comando ainda não existe em interação :(");
        }
    }
};

module.exports = leave;