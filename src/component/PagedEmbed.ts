import { Message, MessageEmbed, StringResolvable } from "discord.js";

export default class PagedEmbed extends MessageEmbed {
  private totalFields: number;
  private pages: Array<MessageEmbed>;
  private message: Message;

  constructor(message) {
    super();

    this.message = message;
    this.totalFields = 0;
    this.pages = [];
  }

  addField(name: StringResolvable, value: StringResolvable, inline?: boolean): this {
    if (this.totalFields < 25) {
      this.totalFields += 1;
      return super.addField(name, value, inline);
    }

    if (this.totalFields % 25 === 0) {

    }

  }
}