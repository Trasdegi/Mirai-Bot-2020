import { CommandoClient } from 'discord.js-commando';
import { join } from 'path';
import { readdirSync } from "fs";

new (class MiraiBot extends CommandoClient {
  constructor(token) {

    // Construct the Commando Client
    super({
      commandPrefix: '_',
      commandEditableDuration: 70,
      owner: '140033402681163776',
    });

    this.setEvents();

    // Setup Commando Registry
    this.registry
      .registerDefaultTypes()
      .registerDefaultGroups()
      .registerGroups([
        ['admin', 'Administration'],
        ['mod', 'Moderation'],
        ['fun', 'Fun'],
        ['misc', 'Miscellanious'],
        ['util', 'Utility']
      ])
      .registerCommandsIn(join(__dirname, 'src/commands'));

    // Connect the bot
    this.login(token).catch(console.error);

    return this;

  }

  setEvents(): this {

    this.once('ready', () => {
      console.log(`Mirai Bot logged in as ${this.user.tag}. (${this.user.id})`);
      this.user.setActivity('servir le futur.').catch(console.error);
    });

    for (const event of readdirSync('./src/events').filter(file => file.endsWith('.js'))) {
      this.on(event.slice(0, event.length - 3), require(`./src/events/${event}`));
    }

    return this;
  }

  /*on(event: string, listener: Function): this {
    return super.on('error', (error) => console.error(error));
  }*/

})(process.env.bot_token)
