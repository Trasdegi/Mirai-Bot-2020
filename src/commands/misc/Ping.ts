import { ArgumentCollectorResult, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import MiraiBotCommand from "../../component/MiraiBotCommand";

module.exports = class PingCommand extends MiraiBotCommand {
  constructor(client) {
    super(client, {
      name: 'ping',
      group: 'misc',
      memberName: 'ping',
      aliases: ['p'],
      description: 'Pong !',
      throttling: {
        usages: 2,
        duration: 10,
      },
    });

    this.examples = [
      `${client.commandPrefix}${this.name}`
    ];
  }

  run(message: CommandoMessage, args: object | string | string[], fromPattern: boolean, result?: ArgumentCollectorResult): Promise<Message | Message[] | null> | null {
    return message.embed(new MessageEmbed().setColor(this.botColor)
      .addField("Pong !", `:ping_pong: ${Math.round(this.client.ws.ping)}ms`)
    );
  }
}