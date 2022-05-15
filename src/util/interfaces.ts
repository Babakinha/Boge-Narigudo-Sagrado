import Discord from 'discord.js'

export interface messageEvent {
    message: Discord.Message,
    client: Discord.Client,
    args: string[]

}
export interface interactionEvent {
    interaction: Discord.CommandInteraction,
    client: Discord.Client
    
}
export interface commandInterface {
    names: string[],
    run: {
        message: (event: messageEvent) => any,
        interaction: (event: interactionEvent) => any
    }
};