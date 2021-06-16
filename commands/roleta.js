var request = require('request');
var { RichEmbed } = require('discord.js')

function getRandomMember(collection) {
    let keys = Array.from(collection.keys());
    const member = collection.get(keys[Math.floor(Math.random() * keys.length)]);
    return member;
}

function getProfilePic(user, callback) {
    const url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=256`

    var options = {
        method: 'GET',
        url: url,
        encoding: null // keeps the body as buffer
    };

    let isGif = false;


    return new Promise(function (resolve, reject) {

        request(options, function (err, response, body) {
            if(!err && response.statusCode == 200){
                var magicNumberInBody = body.toString('hex',0,4);
                if(magicNumberInBody == '47494638') resolve(url);else resolve(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`);
            }else {
                resolve(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`);
            }
        });
    }) 
}

const roleta = {
    name: 'roleta',
    description: 'Pega uma foto de alguém aleatório do server',

    async execute(message, args) {
        const guildCache = message.guild;
        const membro = getRandomMember(guildCache.members.cache);
        const user = message.client.users.cache.get(membro.id)


        const avatar = await getProfilePic(user)
        const embed = {
            color: 0x40E0D0,
            author: {
                name: user.username
            },
            image: {
                url: avatar
            }
        }
        message.channel.send({ embed: embed });
    },
    async interaction(client, interaction) {
        const guildCache = client.guilds.cache.get(interaction.guild_id);
        const membro = getRandomMember(guildCache.members.cache);
        const user = client.users.cache.get(membro.id)

        const avatar = await getProfilePic(user)
        console.log(avatar)


        const embed = {
            color: 0x40E0D0,
            author: {
                name: user.username
            },
            image: {
                url: avatar
            }
        }

        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                    type: 4,
                    data: {
                            embeds: [embed]
                    }
            }
        })
    }

};

module.exports = roleta;