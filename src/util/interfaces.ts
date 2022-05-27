import Discord from 'discord.js'
import commandHandler from './commandHandler'

export interface messageEvent {
    message: Discord.Message,
    client: Discord.Client,
    args: string[],
    commandHandler: commandHandler

}
export interface interactionEvent {
    interaction: Discord.CommandInteraction,
    client: Discord.Client
    commandHandler: commandHandler
    
}
export enum commandCategory {
    Audio,
    Video,
    Imagem,
    Utilidades,
    Beta,
    Hidden
}

export interface commandInterface {
    names: string[],
    description?: string,
    category: commandCategory,
    run: {
        message: (event: messageEvent) => any,
        interaction: (event: interactionEvent) => any
    }
};