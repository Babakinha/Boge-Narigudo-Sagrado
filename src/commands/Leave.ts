//Imports
import { messageEvent, interactionEvent, commandInterface, commandCategory } from "../util/interfaces";
import { AudioPlayer, AudioPlayerStatus, AudioResource, createAudioPlayer, createAudioResource, DiscordGatewayAdapterCreator, getVoiceConnection, joinVoiceChannel, VoiceConnectionStatus } from '@discordjs/voice';

//Command
const leave: commandInterface = {
    names: ["leave", "left", "close", "exit", "unjoin", "sair"],
    category: commandCategory.Audio,
    description: "Sai do canal de voz (se o bor estiver em um).",


    run: {
        async message(e: messageEvent){
            let connection = getVoiceConnection(e.message.guild!.id);
            if(connection) {
                connection.destroy();
                e.message.reply(":man_running::skin-tone-5: Saindo...");
            }else {
                e.message.reply("Não consegui achar o canal para sair D:");
            }

        },
        async interaction(e: interactionEvent){
            return e.interaction.reply("Desculpa, Esse comando ainda não existe em interação :(");
        }
    }
};

module.exports = leave;