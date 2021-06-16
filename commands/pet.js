const Discord = require('discord.js')
const petPetGif = require('pet-pet-gif')

const pet = {
    name: 'pet',
    description: 'Faz carinho :3',

    async execute(message, args) {
        let url = args[0]
        if(!url) return message.reply("Por favor mande uma url\n Ex: DOGE.pet https://imgur.com/qjUFwno.png");

        //Check if is mention
        if (url.startsWith('<@') && url.endsWith('>')) {
            url = url.slice(2, -1);
    
            if (url.startsWith('!')) {
                url = url.slice(1);
            }
    
            const user = await message.client.users.cache.get(url);
            url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
        }
        // End of check
        
        try {
            let animatedGif = await petPetGif(url)

            const attachment = new Discord.MessageAttachment(animatedGif, 'pet.gif');

            let embed = new Discord.MessageEmbed()
                .setColor(0x40E0D0)
                .setTitle("Pet Pet!")
                .attachFiles([attachment])
                .setImage("attachment://pet.gif");
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
                            content: "Por favor mande uma url\n Ex: DOGE.pet https://imgur.com/qjUFwno.png"
                    }
            }
        });
        
        //Check if is mention
        if (url.startsWith('<@') && url.endsWith('>')) {
            url = url.slice(2, -1);
    
            if (url.startsWith('!')) {
                url = mention.slice(1);
            }
    
            const user = await client.users.cache.get(url);
            url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
        }
        // End of check

        try {
            let animatedGif = await petPetGif(url)

            const attachment = new Discord.MessageAttachment(animatedGif, 'pet.gif');

            let embed = new Discord.MessageEmbed()
                .setColor(0x40E0D0)
                .setTitle("Pet Pet!")
                .attachFiles([attachment])
                .setImage("attachment://pet.gif");
            
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

module.exports = pet;