import { Command } from "discord.js-commando";
import { ColorResolvable } from "discord.js";
import { readdirSync, statSync } from "fs";
import { join } from "path";

export default class MiraiBotCommand extends Command {
  public botColor: ColorResolvable;

  constructor(client, info) {
    super(client, info);

    this.botColor = [0, 210, 255];

    return this;
  }

  readdirRecurseSync(directory: string): Array<string> {
    let files = [];
    const readDir = (directory: string) => {
      readdirSync(directory).forEach(File => {
        const absolute = join(directory, File);
        if (statSync(absolute).isDirectory()) return readDir(absolute);
        else return files.push(absolute);
      });
    }
    readDir(directory);
    return files;
  }
}