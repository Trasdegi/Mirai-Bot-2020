import { CommandoClient } from 'discord.js-commando';
import { join } from 'path';

new (class MiraiBot extends CommandoClient {
  constructor(token) {

    // Construct the Commando Client
    super({
      commandPrefix: '_',
      commandEditableDuration: 70,
      owner: '140033402681163776',
    });

    // Setup Commando Registry
    this.registry
      .registerDefaultTypes()
      .registerGroups([
        ['admin', 'Administration'],
        ['mod', 'Moderation'],
        ['fun', 'Fun'],
        ['misc', 'Miscellanious'],
        ['util', 'Utility']
      ])
      .registerDefaultGroups()
      .registerCommandsIn(join(__dirname, 'commands'));

    // Connect the bot
    this.login(token).catch(console.error);

    return this;

  }

  once(event: string, listener: Function): this {
    return super.on('ready', () => {
      console.log(`Mirai Bot logged in as ${this.user.tag}. (${this.user.id})`);
      this.user.setActivity('servir le futur.');
    });
  }

  /*on(event: string, listener: Function): this {
    return super.on('error', (error) => console.error(error));
  }*/

  on(event: string, listener: Function): this {
    return super.on('commandRegister', (command) => {
      console.log(`La commande ${command.name} a été enregistrée.`);
    });
  }

})(process.env.bot_token)
