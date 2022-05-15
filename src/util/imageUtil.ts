import { Converter } from "ffmpeg-stream";
import { Client } from "discord.js";
import internal from "stream";

import messageUtil from "./messageUtil";
import { request } from "http";
import fetch from 'node-fetch'

export default {
    async isValidImage(url: string):Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            let data = await fetch(url)
            if(data.status == 200 && (((data.headers.get('content-type')) as string).match(/(image)+\//g))?.length != 0) {
                    resolve(true);
            }else console.log(data.status == 200 && (((data.headers.get('content-type')) as string).match(/(image)+\//g))?.length != 0) 
            resolve(false)
        })
    
    },
    async getImageUrl(text: string, client: Client | undefined): Promise<string> {
        return new Promise(async (resolve, reject) => {
            if(client) {
                await messageUtil.getUserByMention(text, client).then((user) => {
                    resolve(user.displayAvatarURL());
                }, () => {});
            }
            if(await this.isValidImage(text)) resolve(text);
            reject('Not Valid image');
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