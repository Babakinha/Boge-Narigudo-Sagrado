import { Converter } from "ffmpeg-stream";
import internal from "stream";

export default async function flipGif(url: string, speed: number = 2): Promise<internal.Readable> {
    return new Promise(async (resolve, reject) => {
        try {

            if(isNaN(speed)) speed = 2;
            let FlippedImage = new Converter();
            FlippedImage.createInputFromFile(url, {});
            let FlippedImage_stream = FlippedImage.createOutputStream({ vf: "hflip", f: "image2"});

            let toVideo = new Converter();
            toVideo.createInputFromFile(url, {});
            let toVideo_input = toVideo.createInputStream({});
            FlippedImage_stream.pipe(toVideo_input);
            let toVideo_stream = toVideo.createBufferedOutputStream({
                f: 'mov',
                filter_complex: '[0:v] [1:v] concat=n=2:v=1:a=0 [outv]',
                map: '[outv]'
            });
        
            let toGif = new Converter();
            let toGif_input = toGif.createInputStream({})
            toVideo_stream.pipe(toGif_input);
            let toGif_stream = toGif.createOutputStream({
                f: 'gif',
                vf: `setpts=N/TB/${speed},scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
                r: `${speed}`
            })

            await FlippedImage.run();
            await toVideo.run();
            await toGif.run();

            resolve(toGif_stream);

        }catch(e) {
            reject(e);
        }
    });

}