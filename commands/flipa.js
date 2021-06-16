var ffmpeg = require('ffmpeg-stream');
const Discord = require('discord.js')
const { createReadStream, createWriteStream } = require("fs")

async function createVideo(url) {
    const newName = Math.random().toString(36).substr(2, 5);
    try {
        const flipper = new ffmpeg.Converter();
        flipper.createInputFromFile(url)

        let stream = flipper.createOutputStream({
            f: "image2",
            vf: "hflip",
        })
        return {stream: stream, runner: flipper}
    }catch(e){
        console.log(e.code);
        console.log(e.msg);
    }
}
const flipa = {
    name: 'flipa',
    description: 'Flipa uma imagem',

    async execute(message, args) {
        const url = args[0]
        if(!url) return message.reply("Por favor mande uma url\n Ex: DOGE.flipa https://imgur.com/qjUFwno.png");
        
        try {
            const start = Date.now()
            let {stream, runner} = await createVideo(url);
    
            
            attachment = new Discord.MessageAttachment(stream, 'NeverGonnaGiveYouUp.png');
            await runner.run() // Run baybe RUN!!!!
            const stop = Date.now()

            let embed = {
                color: 0x40E0D0,
                title: "Flipado!",
                image: {
                    url: "attachment://NeverGonnaGiveYouUp.png"
                },
                footer: {
                    text: `Levou ${(stop - start)/1000} segundos para renderizar`,
                    icon_url: url
                }
            }

            return message.channel.send({ embed: embed, files: [attachment] });

        }catch(e) {
            return message.reply("Desculpa, Algo deu errado aqui, tente usar outra imagem?")
        }

    },
    interaction(client, interaction) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                        type: 4,
                        data: {
                                content: "Em construção"
                        }
                }
        })
    }

};

module.exports = flipa;