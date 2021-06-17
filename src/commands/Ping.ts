import { messageEvent, interactionEvent } from "../index";

const kaomojis = ['(つ✧ω✧)つ', '(づ￣ ³￣)づ', '(づ ◕‿◕ )づ', '(づ◡﹏◡)づ', ' 	(つ . •́ _ʖ •̀ .)つ']

const ping = {
    names: ["ping", "pingu", "pong"],

    run: {
        message(e: messageEvent){
            e.message.reply('__〆(￣ー￣ )\nFazendo umas matimatica...')
                .then(result => {
                    const ping = result.createdTimestamp - e.message.createdTimestamp;
                    const kaomoji = kaomojis[Math.floor(Math.random() * kaomojis.length)]
                    result.edit(`${kaomoji} Pong!\nBot's ping: ${ping},\nAPI's ping: ${e.client.ws.ping}`);
                });
        },
        interaction(e: interactionEvent){
            const kaomoji = kaomojis[Math.floor(Math.random() * kaomojis.length)]
            e.interaction.reply(`${kaomoji} Pong!,\nAPI's ping: ${e.client.ws.ping}`)
        }
    }
};
export const names = ping.names;
export const run = ping.run;