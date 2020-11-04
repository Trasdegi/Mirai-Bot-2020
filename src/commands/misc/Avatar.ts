import {
  ArgumentCollectorResult,
  Command,
  CommandoClient,
  CommandoMessage
} from 'discord.js-commando';
import { MessageEmbed } from "discord.js";

module.exports = class AvatarCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'avatar',
      group: 'misc',
      memberName: 'avatar',
      description: 'Affiche votre avatar en grand.'
    });

    this.examples = [
      `${client.commandPrefix}${this.name}`,
      `${client.commandPrefix}${this.name} Kazuhiro`,
    ];
  }

  run(message: CommandoMessage, args: object | string | string[], fromPattern: boolean, result?: ArgumentCollectorResult): Promise<any> | any {
    return message.embed(new MessageEmbed()
      .setAuthor(message.member ? message.member.displayName : message.author.username, message.author.avatarURL())
      .setTitle("Lien de l'image")
      .setURL(message.author.avatarURL())
      .setImage(message.author.avatarURL())
      .setColor(message.member ? message.member.displayColor : 0)
      .setFooter(message.author.presence.activities.map(activity => activity.name), message.author.avatarURL())
    );
  }
}