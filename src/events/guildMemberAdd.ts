import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { MiraiBot } from "../../mirai_bot";

const MIRAI_TEAM_GENERAL_CHANNEL_ID = '168673025460273152';

module.exports = (client: MiraiBot, member: GuildMember) => {

  const channel: TextChannel = <TextChannel>member.guild.channels.cache.get(MIRAI_TEAM_GENERAL_CHANNEL_ID);

  if (!channel) return;

  channel.send({
    embed: new MessageEmbed().setColor(client.botColor)
      .setAuthor(member.displayName, member.user.avatarURL())
      .setTitle("Bienvenue à l'Académie du Pic de l'Espoir !")
      .setURL('https://equipemirai.com')
      .setImage(member.user.avatarURL())
      .setFooter(`Date d'admission : ${member.joinedAt.toDateString()}`, member.user.avatarURL())
  }).catch(console.error);

};