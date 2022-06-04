import internal from "stream";
import imageUtil from "../util/imageUtil";
import fetch from 'node-fetch'

import {doggo, lib, U8array, BufferStruct, BufferStructType} from '../util/artistDoggo';

export default async function bobfireImage(img: Buffer): Promise<(BufferStructType)> {
    return new Promise(async (resolve, reject) => {
        try {
            let arr = new U8array(img);
            let to_buff = new BufferStruct({data: arr, len: arr.length});

            let res = await lib.bobfire(doggo.ref(), to_buff);
            return resolve(res);
        }catch(e) {
            console.log(e)
            reject(e);
        }
    });

}