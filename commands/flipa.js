const Discord = require('discord.js')
const Jimp = require('jimp');

async function processImage(url) {
    img = await Jimp.read(url)
    await img.flip(true, false);
    return img.getBufferAsync("image/png");
}


const flipa = {
    name: 'flipa',
    description: 'Flipa uma imagem',

    async execute(message, args) {
        const url = args[0]
        if(!url) return message.reply("Por favor mande uma url\n Ex: DOGE.flipa https://imgur.com/qjUFwno.png");
        
        try {
            c//Processamento vai aqui
            const start = Date.now()

            
            buffer = await processImage(url);


            const stop = Date.now()
            //Termina aqui
            let attachment = new Discord.MessageAttachment(buffer, 'NeverGonnaGiveYouUp.png');

            let embed = new Discord.MessageEmbed()
                .setColor(0x40E0D0)
                .setTitle("Flipado!")
                .attachFiles([attachment])
                .setImage("attachment://NeverGonnaGiveYouUp.png")
                .setFooter(`Levou ${(stop - start)/1000} segundos para renderizar`, url);
            return message.channel.send(embed);

        }catch(e) {
            console.log(e)
            return message.reply("Desculpa, Algo deu errado aqui, tente usar outra imagem?")
        }

    },
    async interaction(client, interaction) {
        const url = interaction.data.options[0].value
        if(!url) return client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                    type: 4,
                    data: {
                            content: "Por favor mande uma url\n Ex: DOGE.flipa https://imgur.com/qjUFwno.png"
                    }
            }
        });
        
        try {
            //Processamento vai aqui
            const start = Date.now()


            buffer = await processImage(url);


            const stop = Date.now()
            //Termina aqui
            let attachment = new Discord.MessageAttachment(buffer, 'NeverGonnaGiveYouUp.png');

            let embed = new Discord.MessageEmbed()
                .setColor(0x40E0D0)
                .setTitle("Flipado!")
                .attachFiles([attachment])
                .setImage("attachment://NeverGonnaGiveYouUp.png")
                .setFooter(`Levou ${(stop - start)/1000} segundos para renderizar`, url);

            const channel = await client.channels.fetch(interaction.channel_id)
            const message = await channel.send(embed);
            
            
            return client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                        type: 4,
                        data: {
                            content: `This is the best i can do :) \n ${message.url}`
                        }
                }
            });

        }catch(e) {
            console.log(e)
            return client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                        type: 4,
                        data: {
                                content: "Desculpa, Algo deu errado aqui, tente usar outra imagem?"
                        }
                }
            })
        }
        
    }

};

module.exports = flipa;