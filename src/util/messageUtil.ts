import { Client, CommandInteraction, Interaction, Message, User, Util } from "discord.js";
import { commandInterface, interactionEvent, messageEvent } from "./interfaces";

export default {
    
    async getUserByMention(text: String, client: Client): Promise<User> {

        return new Promise(async (resolve, reject) => {

            if (text.startsWith('<@') && text.endsWith('>')) {
                text = text.slice(2, -1);
        
                if (text.startsWith('!')) {
                    text = text.slice(1);
                }

                try{
                    const user = await client.users.fetch(Util.binaryToID(BigInt(String(text)).toString(2)));
                    resolve(user);
                }catch(e) {
                    reject('Not a valid user');
                }
            }

            reject('Not a mention');
            
        });

    },
    async getImageInMessage(e: messageEvent | interactionEvent): Promise<Buffer> {
        const isMessageEvent = (p: any): p is messageEvent => p.hasOwnProperty('message');
        return new Promise(async (resolve, reject) => {
            if(isMessageEvent(e)){
                console.log("is message")
            }else {
                console.log("is interaction")
            }

        })
    }
}