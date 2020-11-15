import { VoiceChannel, VoiceConnection } from "discord.js";

export async function playVoice(voiceConnection: VoiceConnection, voiceChannel: VoiceChannel, filePath: string): Promise<VoiceConnection> {
  const streamDispatcher = voiceConnection.play(filePath);
  let started = false;

  return await new Promise((resolve, reject) => {

    console.log(`Voice triggered in ${voiceChannel.name} for ${filePath}`);

    streamDispatcher.on('debug', (info) => {
      console.info(info);
    })

    streamDispatcher.on('error', (error) => {
      reject(error);
    })

    streamDispatcher.on('start', () => {
      console.log(`Voice started in ${voiceChannel.name} for ${filePath}`);
      started = true;
    })

    streamDispatcher.on('speaking', (isSpeaking) => {
      if (started && !isSpeaking) {
        console.log(`Voice ended in ${voiceChannel.name} for ${filePath}`);
        resolve(voiceConnection);
      }
    })

  });
}

export default class VoiceComponent {

}