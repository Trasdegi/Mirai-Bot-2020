import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { MiraiBot } from "../../mirai_bot";

const MIRAI_TEAM_GENERAL_CHANNEL_ID = '168673025460273152';

module.exports = (client: MiraiBot, member: GuildMember) => {

  const greetings = async () => {
    const channel: TextChannel = <TextChannel>(await client.channels.fetch("168673025460273152"));
    if (!channel) return;

    await channel.send({
      embed: new MessageEmbed().setColor(client.botColor)
        .setAuthor(member.displayName, member.user.avatarURL())
        .setTitle("Bienvenue à l'Académie du Pic de l'Espoir !")
        .setURL('https://equipemirai.com')
        .setImage(member.user.avatarURL())
        .setFooter(`Date d'admission : ${member.joinedAt.toDateString()}`, member.user.avatarURL())
    });
  };

  greetings().catch(console.error);

};