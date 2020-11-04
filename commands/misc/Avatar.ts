import { ArgumentCollectorResult, Command, CommandoMessage } from 'discord.js-commando';

module.exports = class AvatarCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'avatar',
      group: 'misc',
      memberName: 'avatar',
      description: 'Affiche votre avatar en grand.'
    });
  }

  run(message: CommandoMessage, args: object | string | string[], fromPattern: boolean, result?: ArgumentCollectorResult): Promise<any> | any {
    return message.say('Test');
  }
}