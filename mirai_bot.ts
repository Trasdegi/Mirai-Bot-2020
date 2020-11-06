require('dotenv').config();
import { CommandoClient } from 'discord.js-commando';
import { join } from 'path';
import { readdirSync } from "fs";
import {
  ColorResolvable,
  MessageEmbed,
  TextChannel
} from "discord.js";
import { metric } from '@pm2/io';

// UTC + 2 or UTC + 1
const UTC_LOCAL_TIMESHIFT = 1;

const MIRAI_TEAM_GUILD_ID = '168673025460273152';
const MIRAI_TEAM_GENERAL_CHANNEL_ID = '168673025460273152';

new (class MiraiBot extends CommandoClient {
  public botColor: ColorResolvable;

  constructor(token) {

    // Construct the Commando Client
    super({
      commandPrefix: '_',
      commandEditableDuration: 70,
      owner: '140033402681163776',
    });

    const realtimeUsers = metric({name: 'MiraiBot Users'});
    realtimeUsers.set(this.users);

    this.setupDatabase()
      .then(() => this.setEvents())
      .then(() => this.setupIntervals())
      .then(() => {

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
        ]).registerDefaultCommands({
        help: false, prefix: false, eval: false, ping: false, unknownCommand: false
      }).registerCommandsIn(join(__dirname, 'src/commands'));

      return this.login(token);
    }).catch(error => {
      console.error(error);
      process.exit(1);
    });

    return this;

  }

  async setupDatabase(): Promise<this> {
    return this;
  }

  async setEvents(): Promise<this> {

    this.once('ready', () => {
      console.log(`Mirai Bot logged in as ${this.user.tag}. (${this.user.id})`);
      this.users.fetch("140033402681163776").then(Kazuhiro => Kazuhiro.send('El. Psy... Kongroo.')).catch(console.error);
      this.user.setActivity('servir le futur.').catch(console.error);
    });

    for (const event of readdirSync('./src/events').filter(file => file.endsWith('.js'))) {
      const eventFunction = require(`./src/events/${event}`);
      this.on(event.slice(0, event.length - 3), (...args) => eventFunction(this, ...args));
    }

    return this;
  }

  async setupIntervals() {
    let find_interval = setInterval(function () {
      let date = new Date();
      let UTCseconds = date.getUTCSeconds();
      let seconds = date.getSeconds();

      if (UTCseconds === 0 || seconds === 0) {
        console.log("Minute interval found");
        set_minute_interval();
      }

    }, 1000);

    let minute_interval;

    let set_minute_interval = () => {
      clearInterval(find_interval);
      //check_birthday();
      minute_interval = setInterval(function () {

        let date = new Date();
        let UTCminute = date.getUTCMinutes();
        let minute = date.getMinutes();

        if (UTCminute === 0 || minute === 0) {
          console.log("Hour interval found");
          set_monokuma_announcement();
          //set_hour_interval();
        }

      }, 60000);
    };

    let set_hour_interval = () => {

      setInterval(() => {


      }, 60000 * 60);

    };

    let monokuma_interval;

    let set_monokuma_announcement = () => {

      let morning_done = false;
      let evening_done = false;
      let day_interval_done = false;

      clearInterval(minute_interval);

      monokuma_interval = setInterval(() => {

        if (evening_done && morning_done && day_interval_done) {
          clearInterval(monokuma_interval);
        }

        let date = new Date();
        let UTChour = (date.getUTCHours() + UTC_LOCAL_TIMESHIFT) % 24;

        if (UTChour === 7) {
          console.log("Morning interval found");
          set_morning_day_interval().catch(console.error);
          morning_done = true;
        }

        if (UTChour === 22) {
          console.log("Evening interval found");
          set_evening_interval().catch(console.error);
          evening_done = true;
        }

        if (UTChour === 0) {
          console.log("Day interval found");
          //set_day_interval();
          day_interval_done = true;
        }

      }, 60000 * 60);
    };

    const monokumaImgs = [
      "https://vignette.wikia.nocookie.net/bloodbrothersgame/images/5/53/Monokuma.jpg/revision/latest/scale-to-width-down/640?cb=20131210191609",
      "https://vignette.wikia.nocookie.net/danganronpa/images/1/12/Monokuma_announcement.png/revision/latest?cb=20161220033639",
      "https://vignette.wikia.nocookie.net/danganronpa/images/1/16/Monokuma_announcement_DR2.png/revision/latest?cb=20161112051042",
      "http://2.bp.blogspot.com/-E5L7PG07qbk/U7zPtDHk_9I/AAAAAAAAAt4/UzoKWesIqWE/s1600/Danganronpa-Episode-07-Monokuma.jpg",
      "https://i.pinimg.com/236x/cc/c5/b1/ccc5b19b6d41e45d108e57433b5c4469.jpg",
      "https://lh3.googleusercontent.com/-Gohd89AiIjM/WgO_OZ5VfwI/AAAAAAAAAEw/Ro9esll7SoEMXhjgjU53oyKjv5MWgT1oQCJoC/w800-h800/Monokuma%2B5.jpg",
      "http://i.imgur.com/T5s569W.gif",
      "https://i.imgur.com/K14wGy5.jpg?1",
      "https://i.imgur.com/aH1xD9S.gif"
    ];

    const quotes = [
      "Commencez par faire ce qui est nécessaire ; puis faites ce qui est possible ; et soudain vous faites l'impossible."
    ];

    const get_random_in_array = (array) => {
      if (array.length === 1) return (array[0]);
      return (array[Math.floor(Math.random() * array.length)]);
    }

    const set_morning_day_interval = async () => {
      const generalChannelMiraiTeam = <TextChannel>(await this.channels.fetch("168673025460273152"));
      const creationDate = (await this.guilds.fetch(MIRAI_TEAM_GENERAL_CHANNEL_ID)).createdAt;

      let morning_message = new MessageEmbed()
        .setAuthor("Monokuma", "https://vignette.wikia.nocookie.net/danganronpa/images/c/c6/Strikes_Back.jpg/revision/latest?cb=20161029022327")
        .setColor(this.botColor)
        .addField(
          "Bonjour, tout le monde !",
          "Il est maintenant 7h du matin\n" +
          "et la période de nuit est officiellement terminée !\n" +
          "Il est l'heure de se lever !\n" +
          "\n" +
          "Préparez-vous à accueillir un autre jour meeeeerveilleux !"
        ).setFooter(get_random_in_array(quotes)).setImage(get_random_in_array(monokumaImgs));

      if (creationDate) {
        let days = (new Date().valueOf() - creationDate.valueOf()) / 1000 / 60 / 60 / 24;

        morning_message.setFooter(`Ainsi débute le jour ${days.toFixed(0)} à l'Académie du Pic de l'Espoir.`);
      }

      await generalChannelMiraiTeam.send(morning_message);

      setInterval(() => {

        morning_message = new MessageEmbed()
          .setAuthor("Monokuma", "https://vignette.wikia.nocookie.net/danganronpa/images/c/c6/Strikes_Back.jpg/revision/latest?cb=20161029022327")
          .setColor(this.botColor)
          .addField(
            "Bonjour, tout le monde !",
            "Il est maintenant 7h du matin\n" +
            "et la période de nuit est officiellement terminée !\n" +
            "Il est l'heure de se lever !\n" +
            "\n" +
            "Préparez-vous à accueillir un autre jour meeeeerveilleux !"
          ).setImage(get_random_in_array(monokumaImgs));

        if (creationDate) {
          let days = (new Date().valueOf() - creationDate.valueOf()) / 1000 / 60 / 60 / 24;

          morning_message.setFooter(`Ainsi débute le jour ${days.toFixed(0)} à l'Académie du Pic de l'Espoir.`);
        }

        generalChannelMiraiTeam.send(morning_message).catch(console.error);

      }, 60000 * 60 * 24);
    };

    let set_evening_interval = async () => {
      const generalChannelMiraiTeam = <TextChannel>(await this.channels.fetch("168673025460273152"));

      const evening_message = new MessageEmbed()
        .setAuthor("Monokuma", "https://vignette.wikia.nocookie.net/danganronpa/images/c/c6/Strikes_Back.jpg/revision/latest?cb=20161029022327")
        .setColor(this.botColor)
        .addField(
          "Mm, ahem, ceci est une annonce de l'école.",
          "Il est maintenant 22 h.\n" +
          "\n" +
          "Autrement dit, c'est officiellement la période de nuit.\n" +
          "Les salons discord vont bientôt être fermés, et y discuter à \n" +
          "partir de maintenant est strictement interdit.\n" +
          "Maintenant, faites de beaux rêves ! Le marchand de sable va bientôt passer..."
        ).setImage(get_random_in_array(monokumaImgs));

      await generalChannelMiraiTeam.send(evening_message);

      //analyseLogChan(evening_message, generalChannelMiraiTeam).catch(console.error);

      setInterval(() => {

        const evening_message = new MessageEmbed()
          .setAuthor("Monokuma", "https://vignette.wikia.nocookie.net/danganronpa/images/c/c6/Strikes_Back.jpg/revision/latest?cb=20161029022327")
          .setColor(this.botColor)
          .addField(
            "Mm, ahem, ceci est une annonce de l'école.",
            "Il est maintenant 22 h.\n" +
            "\n" +
            "Autrement dit, c'est officiellement la période de nuit.\n" +
            "Les salons discord vont bientôt être fermés, et y discuter à \n" +
            "partir de maintenant est strictement interdit.\n" +
            "Maintenant, faites de beaux rêves ! Le marchand de sable va bientôt passer..."
          ).setImage(get_random_in_array(monokumaImgs));

        generalChannelMiraiTeam.send(evening_message).catch(console.error);

        //analyseLogChan(evening_message, generalChannelMiraiTeam).catch(console.error);

      }, 60000 * 60 * 24);

    };

    /*let set_day_interval = () => {
      check_birthday();
      setInterval(function () {
        check_birthday();
      }, 60000 * 60 * 24);
    };*/

  }

  /*on(event: string, listener: Function): this {
    return super.on('error', (error) => console.error(error));
  }*/

})(process.env.bot_token)

interface MiraiBot extends CommandoClient {
  botColor: ColorResolvable;
}

export { MiraiBot };