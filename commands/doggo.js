const kaomojis = ['(つ✧ω✧)つ', '(づ￣ ³￣)づ', '(づ ◕‿◕ )づ', '(づ◡﹏◡)づ', '(つ . •́ _ʖ •̀ .)つ']

const client = require('nekos.life');
const neko = new client();


const doggo = {
    name: 'doggo',
    description: 'Responde com uma foto de dog aleatória (Cortesia de nekos.life)',
    embed: {
            color: 0x40E0D0,
            title: `Doggo („ಡωಡ„)`,
            url: "https://nekos.life",
            image: {
                url: "https://cdn.discordapp.com/avatars/487644363124637718/a_415f94cbfab6c764d6ef5efe78a11a59.gif?size=4096" //default image if anything goes wrong
            },
            footer: {
                text: `Cortesia de nekos.life`
            }
    },

    async execute(message, args) {
        this.embed.title = `Doggo ${kaomojis[Math.floor(Math.random() * kaomojis.length)]}`
        this.embed.image.url = (await neko.sfw.woof()).url
        return message.channel.send({ embed: this.embed });
    },
    async interaction(client, interaction) {
        this.embed.title = `Doggo ${kaomojis[Math.floor(Math.random() * kaomojis.length)]}`
        this.embed.image.url = (await neko.sfw.woof()).url
        client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                        type: 4,
                        data: {
                            embeds: [this.embed]
                        }
                }
        })
    }

};

module.exports = doggo;