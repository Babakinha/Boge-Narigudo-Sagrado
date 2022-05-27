//Imports
import { messageEvent, interactionEvent, commandInterface, commandCategory } from "../util/interfaces";
import { AudioPlayer, AudioPlayerStatus, AudioResource, createAudioPlayer, createAudioResource, DiscordGatewayAdapterCreator, joinVoiceChannel, VoiceConnectionStatus } from '@discordjs/voice';

//Command
const fnaf: commandInterface = {
    names: ["1987", "1983", "bite", "fnaf", "freddy", "feddy"],
    category: commandCategory.Hidden,

    run: {
        async message(e: messageEvent){
            e.message.delete();
            let channel = e.message.member?.voice.channel;
            if(!channel) return;
            channel = channel!;

            let voiceConnection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
            });

            const player = createAudioPlayer();
            voiceConnection.subscribe(player);

            let jumpscare = createAudioResource(__dirname + "/../assets/fnaf/fnaf1_jumpscare.opus");
            player.play(jumpscare);

            player.on(AudioPlayerStatus.Idle, () => {
                voiceConnection.destroy();
            });



        },
        async interaction(e: interactionEvent){
            return;
        }
    }
};

module.exports = fnaf;