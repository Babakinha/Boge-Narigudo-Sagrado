const kaomojis = ['(つ✧ω✧)つ', '(づ￣ ³￣)づ', '(づ ◕‿◕ )づ', '(づ◡﹏◡)づ', ' 	(つ . •́ _ʖ •̀ .)つ']

const ping = {
    name: 'ping',
    description: 'Ping!',

    execute(message, args) {
            message.channel.send('__〆(￣ー￣ )\nFazendo umas matimatica...')
        .then(result => {
            const ping = result.createdTimestamp - message.createdTimestamp;

            result.edit(`${kaomojis[Math.floor(Math.random() * kaomojis.length)]} Pong!\nBot's ping: ${ping},\nAPI's ping: ${message.client.ws.ping}`);
        });
    },
    interaction(client, interaction) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                        type: 4,
                        data: {
                                content: `${kaomojis[Math.floor(Math.random() * kaomojis.length)]} Pong!\nAPI's ping: ${client.ws.ping}`
                        }
                }
        })
    }

};

module.exports = ping;