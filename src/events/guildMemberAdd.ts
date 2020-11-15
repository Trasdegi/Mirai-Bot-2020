import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { MiraiBot } from "../../mirai_bot";

const MIRAI_TEAM_GENERAL_CHANNEL_ID = '168673025460273152';

const greetings = async (client: MiraiBot, member) => {
  const channel: TextChannel = <TextChannel>(await client.channels.fetch(MIRAI_TEAM_GENERAL_CHANNEL_ID));
  if (!channel) {
    console.log("channel = " + channel);
    return;
  }

  await channel.send(new MessageEmbed().setColor(client.botColor)
    .setAuthor(member.displayName, member.user.avatarURL())
    .setTitle("Bienvenue à l'Académie du Pic de l'Espoir !")
    .setURL('https://equipemirai.com')
    .setImage(member.user.avatarURL())
    .setFooter(`Date d'admission : ${member.joinedAt.toDateString()}`, member.user.avatarURL())
  );
};

module.exports = (client: MiraiBot, member: GuildMember) => {

  if (process.env.NODE_ENV === 'production') {
    greetings(client, member).catch(console.error);
  }

};