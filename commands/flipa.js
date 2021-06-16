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
        if(!url) message.reply("Por favor mande uma url\n Ex: DOGE.flipa https://imgur.com/qjUFwno.png");

        let {stream, runner} = await createVideo(url);

        let embed = new Discord.MessageEmbed()
            .setImage("attachment://name.png");

        attachment = new Discord.MessageAttachment(stream, 'name.png');
        runner.run() // Run baybe RUN!!!!
        message.channel.send({ embed: embed, files: [attachment] });

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