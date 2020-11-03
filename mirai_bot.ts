const Discord = require('discord.js');

class MiraiBot extends Discord.Client {
  constructor(token) {
    super();

    this.login(token).then(() => {
      console.log('Bot ready')
    }).catch(console.error);
  }

}

new MiraiBot(process.env.bot_token)