import { Converter } from "ffmpeg-stream";
import internal from "stream";

export default async function missileGif(url: string, key = "0x00e511", similarity = 0.3, blend = 0.2): Promise<internal.Readable> {
    return new Promise(async (resolve, reject) => {
        try {

            //Resize image to 492x360
            let resizeImage = new Converter()
            resizeImage.createInputFromFile(url, {});
            let resizeImage_stream = resizeImage.createOutputStream({
                movflags: 'frag_keyframe+empty_moov',
                vf: "scale=492:360",
                f: 'mp4'
            })

            //Get resized image and green screen video and overlay them
            let missileGif = new Converter()
            let img_input = missileGif.createInputStream({});
            resizeImage_stream.pipe(img_input);
            missileGif.createInputFromFile(__dirname + "/../assets/missile.mp4", {});
            let missileGif_stream = missileGif.createOutputStream({
                movflags: 'frag_keyframe+empty_moov',
                filter_complex: `[1:v]colorkey=${key}:${similarity}:${blend}[ckout];[0:v][ckout]overlay[out]`,
                map: '[out]',
                f: 'mp4'
            })

            await resizeImage.run();
            await missileGif.run();
            return resolve(missileGif_stream);

        }catch(e) {
            console.log(e)
            return reject(e);
        }
    });

}