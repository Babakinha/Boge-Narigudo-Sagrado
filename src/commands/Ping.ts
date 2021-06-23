//Imports
import { messageEvent, interactionEvent, commandInterface } from "../util/interfaces";

const kaomojis = ['(つ✧ω✧)つ', '(づ￣ ³￣)づ', '(づ ◕‿◕ )づ', '(づ◡﹏◡)づ', ' 	(つ . •́ _ʖ •̀ .)つ'] // is there a kaomoji package?

//Command
const ping: commandInterface = {
    names: ["ping", "pingu", "pong"],

    run: {
        async message(e: messageEvent){
            e.message.reply('__〆(￣ー￣ )\nFazendo umas matimatica...')
                .then(result => {
                    const ping = result.createdTimestamp - e.message.createdTimestamp;
                    const kaomoji = kaomojis[Math.floor(Math.random() * kaomojis.length)]

                    return result.edit(`${kaomoji} Pong!\nBot's ping: ${ping},\nAPI's ping: ${e.client.ws.ping}`);
                });
        },
        async interaction(e: interactionEvent){
            const kaomoji = kaomojis[Math.floor(Math.random() * kaomojis.length)]

            return e.interaction.reply(`${kaomoji} Pong!,\nAPI's ping: ${e.client.ws.ping}`)
        }
    }
};

module.exports = ping