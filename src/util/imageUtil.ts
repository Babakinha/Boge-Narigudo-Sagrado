import { messageEvent, interactionEvent } from './interfaces';
import internal from "stream";

import messageUtil from "./messageUtil";
import fetch from 'node-fetch'

export default {
    async isValidImage(url: string):Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await fetch(url)

                if(data.status == 200 && (((data.headers.get('content-type')) as string).match(/(image)+\//g))?.length != 0)
                    return resolve(true);
                else
                    return resolve(false);

            }catch(e) {
                return resolve(false);
            }
        })
    
    },
    async getImageUrl(e: messageEvent, argIndex: number = 0): Promise<string> {
        return new Promise(async (resolve, reject) => {
            if(e.args.length > 0 && e.args[argIndex].startsWith("<@")) {
                if(e.client) {
                    let imageUrl;
                    await messageUtil.getUserByMention(e.args[argIndex], e.client).then((user) => {
                        imageUrl = user.displayAvatarURL().replace(".webp", ".png?size=4096");
                    }, () => {});
                    if(imageUrl) return resolve(imageUrl);
                }else {
                    return reject('Expected client for an mention');
                }
            }

            if(e.message.attachments.size > 0) {
                return resolve(e.message.attachments.at(0)!.url);
            }

            if(e.args.length > 0 && await this.isValidImage(e.args[argIndex]))
                return resolve(e.args[argIndex]);
            return resolve('');
        })
    },
    async stream2buffer( stream:internal.Readable ):Promise<Buffer> {

        return new Promise<Buffer>( (resolve, reject) => {
            let _buf = Array<any>()
        
            stream.on( 'data', chunk => _buf.push(chunk) )
            stream.on( 'end', () => resolve(Buffer.concat(_buf)) )
            stream.on( 'error', err => reject( `error converting stream - ${err}`) )
    
        })
    } 
}