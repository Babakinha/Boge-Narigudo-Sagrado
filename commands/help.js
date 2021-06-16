helpMessage = "Agente ainda esta trabalhando nisso (ノ\\*°▽°\\*)"
//                                                 (ノ*°▽°*)



const help = {
    name: 'help',
    description: 'Mostra uma mensagem de ajuda',

    execute(message, args) {
            message.channel.send(helpMessage)
    },
    interaction(client, interaction) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                        type: 4,
                        data: {
                                content: helpMessage
                        }
                }
        })
    }

};

module.exports = help;