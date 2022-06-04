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
            //Check for mention
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

            //Check for atachments
            if(e.message.attachments.size > 0 && e.message.attachments.at(0)?.contentType?.match(/(image)+\//g)?.length != 0) {
                return resolve(e.message.attachments.at(0)!.url);
            }

            // Check for url in args
            if(e.args.length > 0 && await this.isValidImage(e.args[argIndex]))
                return resolve(e.args[argIndex]);

            //Check for last image in channel
            const messages = await e.message.channel.messages.fetch()
            const lastAttachmentMessage = messages.sort(
                (a, b) => b.createdTimestamp - a.createdTimestamp)
                .filter((m) => m.attachments.size > 0)
                .first();

            if(lastAttachmentMessage &&
            lastAttachmentMessage.attachments.at(0) &&
            e.message.attachments.at(0)?.contentType?.match(/(image)+\//g)?.length != 0)
            {
                return resolve(lastAttachmentMessage.attachments.at(0)!.url);
            }

            return resolve('');
        })
    },

    async url2buff(url: string): Promise<Buffer> {
        return new Promise<Buffer> (async (resolve, reject) => {
            let data = await fetch(url)

            if(data.status == 200 && (((data.headers.get('content-type')) as string).match(/(image)+\//g))?.length != 0) {
                resolve(await this.stream2buffer(data.body as internal.Readable));
            }else {
                reject("Url is not an image");
            }
        });
    },

    async stream2buffer( stream:internal.Readable ) :Promise<Buffer> {

        return new Promise<Buffer>( (resolve, reject) => {
            let _buf = Array<any>()

            stream.on( 'data', chunk => _buf.push(chunk) )
            stream.on( 'end', () => resolve(Buffer.concat(_buf)) )
            stream.on( 'error', err => reject( `error converting stream - ${err}`) )

        })
    } ,
    async buffer2stream( buff:Buffer ): Promise<internal.Readable> {

        return new Promise<internal.Readable>( (resolve, reject) => {
            const readableInstanceStream = new internal.Readable({
                read() {
                  this.push(buff);
                  this.push(null);
                }
              });

              return resolve(readableInstanceStream);

        })
    }
}