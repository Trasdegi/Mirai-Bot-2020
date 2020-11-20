import { playVoice } from "./src/component/VoiceComponent";

require('dotenv').config();
import { CommandoClient } from 'discord.js-commando';
import { join } from 'path';
import { readdirSync } from "fs";
import {
  ColorResolvable,
  MessageEmbed,
  TextChannel, VoiceChannel, VoiceConnection
} from "discord.js";
import { metric } from '@pm2/io';
import asyncWait from "./src/function/asyncWait";
import getRandomInArray from "./src/function/getRandomInArray";
import doMultipleTimes from "./src/function/doMultipleTimes";

// UTC + 2 or UTC + 1
const UTC_LOCAL_TIMESHIFT = 1;

const MIRAI_TEAM_GUILD_ID = '168673025460273152';
const MIRAI_TEAM_GENERAL_CHANNEL_ID = '168673025460273152';

class MiraiBot extends CommandoClient {
  public botColor: ColorResolvable;

  constructor(token) {

    // Construct the Commando Client
    super({
      commandPrefix: '_',
      commandEditableDuration: 70,
      owner: '140033402681163776',
    });

    this.botColor = [0, 210, 255];

    const bootstrap = async () => {
      await this.setupDatabase();
      await this.setEvents();

      if (process.env.NODE_ENV === 'production') {
        await this.setupIntervals();
      }

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
        help: false, prefix: false, eval: true, ping: false, unknownCommand: false
      }).registerCommandsIn(join(__dirname, 'src/commands'));

      await this.login(token);

    }

    bootstrap().catch(error => {
      console.error(error);
      process.exit(1);
    })

    return this;

  }

  async setupDatabase(): Promise<this> {
    return this;
  }

  async setEvents(): Promise<this> {

    this.once('ready', () => {
      console.log(`Mirai Bot logged in as ${this.user.tag}. (${this.user.id})`);
      this.users.fetch("140033402681163776").then(Kazuhiro => Kazuhiro.send('El. Psy... Kongroo.')).catch(console.error);

      if (process.env.NODE_ENV === 'development') {
        this.testFunction().catch(console.error);
      }

      this.user.setActivity('servir le futur.').catch(console.error);
    });

    for (const event of readdirSync('./src/events').filter(file => file.endsWith('.js') || file.endsWith('.ts'))) {
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

    const set_morning_day_interval = async () => {
      const generalChannelMiraiTeam = <TextChannel>(await this.channels.fetch("168673025460273152"));
      const creationDate = (await this.guilds.fetch(MIRAI_TEAM_GENERAL_CHANNEL_ID)).createdAt;
      const triggerMorningAnnouncement = async () => {
        let morning_message = new MessageEmbed()
          .setAuthor("Monokuma", "https://vignette.wikia.nocookie.net/danganronpa/images/c/c6/Strikes_Back.jpg/revision/latest?cb=20161029022327")
          .setColor(this.botColor)
          .setDescription('Je vous attends dans <#777579520499777546> dans 1 minute pour mon allocution ! :monokuma_laugh:')
          .addField(
            "Bonjour, tout le monde !",
            "Il est maintenant 7h du matin\n" +
            "et la période de nuit est officiellement terminée !\n" +
            "Il est l'heure de se lever !\n" +
            "\n" +
            "Préparez-vous à accueillir un autre jour meeeeerveilleux !"
          ).setDescription(`« *${getRandomInArray(quotes)}* »`).setImage(getRandomInArray(monokumaImgs));

        if (creationDate) {
          let days = (new Date().valueOf() - creationDate.valueOf()) / 1000 / 60 / 60 / 24;

          morning_message.setFooter(`Ainsi débute le jour ${days.toFixed(0)} à l'Académie du Pic de l'Espoir.`);
        }

        await generalChannelMiraiTeam.send(morning_message);
        await asyncWait(60000);

      };
      const triggerVoiceAnnouncement = async () => {
        await generalChannelMiraiTeam.send(new MessageEmbed().setColor(this.botColor)
          .setAuthor("Monokuma", "https://vignette.wikia.nocookie.net/danganronpa/images/c/c6/Strikes_Back.jpg/revision/latest?cb=20161029022327")
          .setDescription("Mon allocution dans 30 secondes pour ceux qui l'auraient raté !")
        );
        await asyncWait(30000);
        await this.sendVoiceAnnouncement(false);
      };

      triggerMorningAnnouncement()
        .then(() => this.sendVoiceAnnouncement(false))
        .then(() => asyncWait(110000))
        .then(() => doMultipleTimes(
          triggerVoiceAnnouncement, 4, 110000
        )).catch(console.error);

      setInterval(() => {

        triggerMorningAnnouncement()
          .then(() => this.sendVoiceAnnouncement(false))
          .then(() => asyncWait(110000))
          .then(() => doMultipleTimes(
          triggerVoiceAnnouncement, 4, 110000
        )).catch(console.error);

      }, 60000 * 60 * 24);
    };

    const set_evening_interval = async () => {
      const generalChannelMiraiTeam = <TextChannel>(await this.channels.fetch("168673025460273152"));
      const triggerEveningAnnouncement = async () => {
        const evening_message = new MessageEmbed()
          .setAuthor("Monokuma", "https://vignette.wikia.nocookie.net/danganronpa/images/c/c6/Strikes_Back.jpg/revision/latest?cb=20161029022327")
          .setColor(this.botColor)
          .setDescription('Je vous attends dans <#777579520499777546> dans 1 minute pour mon allocution ! :monokuma_laugh:')
          .addField(
            "Mm, ahem, ceci est une annonce de l'école.",
            "Il est maintenant 22 h.\n" +
            "\n" +
            "Autrement dit, c'est officiellement la période de nuit.\n" +
            "Les salons discord vont bientôt être fermés, et y discuter à \n" +
            "partir de maintenant est strictement interdit.\n" +
            "Maintenant, faites de beaux rêves ! Le marchand de sable va bientôt passer..."
          ).setImage(getRandomInArray(monokumaImgs));

        await generalChannelMiraiTeam.send(evening_message);
        await asyncWait(60000);
      };
      const triggerVoiceAnnouncement = async () => {
        await generalChannelMiraiTeam.send(new MessageEmbed().setColor(this.botColor)
          .setAuthor("Monokuma", "https://vignette.wikia.nocookie.net/danganronpa/images/c/c6/Strikes_Back.jpg/revision/latest?cb=20161029022327")
          .setDescription("Mon allocution dans 30 secondes pour ceux qui l'auraient raté !")
        );
        await asyncWait(30000);
        await this.sendVoiceAnnouncement(true);
      };

      triggerEveningAnnouncement()
        .then(() => this.sendVoiceAnnouncement(false))
        .then(() => asyncWait(110000))
        .then(() => doMultipleTimes(
          triggerVoiceAnnouncement, 4, 110000
        )).catch(console.error);

      setInterval(() => {

        triggerEveningAnnouncement()
          .then(() => this.sendVoiceAnnouncement(false))
          .then(() => asyncWait(110000))
          .then(() => doMultipleTimes(
            triggerVoiceAnnouncement, 4, 110000
          )).catch(console.error);

      }, 60000 * 60 * 24);

    };

    /*let set_day_interval = () => {
      check_birthday();
      setInterval(function () {
        check_birthday();
      }, 60000 * 60 * 24);
    };*/

  }

  async sendVoiceAnnouncement(evening = false) {
    const vocalRoom = <VoiceChannel>await this.channels.fetch('777579520499777546');
    const announcementPath = `./src/asset/voice/monokuma/${evening ? 'evening' : 'morning'}_announcement`;
    const monokumaLaughterPath = './src/asset/voice/monokuma/laughter';
    let voiceConnection = await vocalRoom.join();

    for (const monokumaVoiceFile of readdirSync(announcementPath)) {
      console.log(monokumaVoiceFile);
      await playVoice(voiceConnection, vocalRoom, `${announcementPath}/${monokumaVoiceFile}`);
      await asyncWait(200);
    }

    await asyncWait(1000);


    await playVoice(
      voiceConnection, vocalRoom,
      `${monokumaLaughterPath}/${getRandomInArray(readdirSync(monokumaLaughterPath))}`
    );

    return await new Promise<boolean>((resolve, reject) => {
      voiceConnection.on('disconnect', () => {
        setTimeout(() => {resolve(true)}, 3000);
      });
      voiceConnection.disconnect();
    });
  }

  async testFunction() {

  }

}

new MiraiBot(process.env.bot_token);

export { MiraiBot };