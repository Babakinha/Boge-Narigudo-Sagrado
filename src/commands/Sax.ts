//Imports
import { messageEvent, interactionEvent, commandInterface, commandCategory } from "../util/interfaces";
import { AudioPlayer, AudioPlayerStatus, AudioResource, createAudioPlayer, createAudioResource, DiscordGatewayAdapterCreator, getVoiceConnection, joinVoiceChannel, VoiceConnectionStatus } from '@discordjs/voice';
import { createReadStream } from "fs";

//Audio
const player = createAudioPlayer();

const normal_sax =  __dirname + "/../assets/sax/Epic_sax_guy.opus";
const lucky_sax =  __dirname + "/../assets/sax/Sexy_sax.opus";
const song = createAudioResource(normal_sax);

player.play(song);
player.on(AudioPlayerStatus.Idle, () => {
    let song = createAudioResource(Math.random() >= 0.1? normal_sax : lucky_sax);
    player.play(song);
});

//Command
const sax: commandInterface = {
    names: ["saxophone", "sax", "saxofone", "venom", "venomexteme"],
    category: commandCategory.Audio,
    description: "Toca uma musica de saxofone (_intro venomextreme_).",



    run: {
        async message(e: messageEvent){
            let channel = e.message.member?.voice.channel;
            if(!channel) return e.message.reply("Desculpa, eu não consigo achar o canal que voce esta :(");
            channel = channel!;

            //Leave
            // If we are already in another channel dont leave
            let shouldLeave = false;
            channel.members.each((member, key) => {
                if(member.id == e.client.user?.id) {
                    shouldLeave = true;
                }
            });
            if(shouldLeave) {
                getVoiceConnection(channel.guild.id)?.destroy();
                return e.message.reply("Saindo do " + channel.name);
            }

            //Join
            let voiceConnection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
            });
            let repl = await e.message.reply("Entrei no " + channel.name);

            //VoiceConnection Events
            voiceConnection.on("error", (err) => {
                console.log(err);
                repl.edit("Something went wrong D:");
            });

            voiceConnection.on(VoiceConnectionStatus.Ready, () => {
                repl.edit("Mandando **AQUELE** 🎷")
            });

            //Plzsub
            voiceConnection.subscribe(player);
        },
        async interaction(e: interactionEvent){
            return e.interaction.reply("Desculpa, Esse comando ainda não existe em interação :(");
        }
    }
};

module.exports = sax;