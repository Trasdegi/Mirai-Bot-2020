import { ArgumentCollectorResult, CommandoMessage } from 'discord.js-commando';
import { Message } from 'discord.js';
import MiraiBotCommand from "../../component/MiraiBotCommand";
import PagedEmbed from "../../component/PagedEmbed";
import { join } from 'path';

module.exports = class HelpCommand extends MiraiBotCommand {
  constructor(client) {
    super(client, {
      name: 'help',
      group: 'misc',
      memberName: 'help',
      aliases: ['h'],
      description: 'Affiche ce message très utile.',
      throttling: {
        usages: 1,
        duration: 15,
      },
    });

    this.examples = [
      `${client.commandPrefix}${this.name}`
    ];
  }

  run(
    message: CommandoMessage, args: object | string | string[],
    fromPattern: boolean, result?: ArgumentCollectorResult
  ): Promise<Message | Message[] | null> | null {
    let helpMsg = new PagedEmbed(message).setColor(this.botColor)
      .setAuthor('Commandes du Mirai Bot', this.client.user.avatarURL())
    .setThumbnail(this.client.user.avatarURL());

    for (const [cmdName, command] of this.client.registry.commands) {
      helpMsg.addField(`${this.client.commandPrefix}${cmdName}`, command.description, true);
    }

    return message.embed(helpMsg);
  }
}