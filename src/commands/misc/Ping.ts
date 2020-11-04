import { ArgumentCollectorResult, Command, CommandoMessage } from 'discord.js-commando';
import { Message } from 'discord.js';

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      group: 'misc',
      memberName: 'ping',
      aliases: ['p'],
      description: 'Pong !'
    });

    this.examples = [
      `${client.commandPrefix}${this.name}`
    ];
  }

  run(message: CommandoMessage, args: object | string | string[], fromPattern: boolean, result?: ArgumentCollectorResult): Promise<Message | Message[] | null> | null {
    console.log('test');
    return message.say('pong');
  }
}