import { Client, User } from "discord.js";
import { interactionEvent, messageEvent } from "./interfaces";

export default {
    
    async getUserByMention(text: string, client: Client): Promise<User> {

        return new Promise(async (resolve, reject) => {

            if (!text) return reject('Not a mention');;

            if (text.startsWith('<@') && text.endsWith('>')) {
                text = text.slice(2, -1);

                if (text.startsWith('!')) {
                    text = text.slice(1);
                }

                const user = client.users.cache.get(text);

                if (user)
                    return resolve(user);
                else
                    return reject('Not a valid user');
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