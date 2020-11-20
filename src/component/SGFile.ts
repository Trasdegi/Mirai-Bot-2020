import { readFileSync } from "fs";

export default class SGFile {
  private buffer: string;

  constructor(path) {
    this.buffer = readFileSync(path, {encoding: "utf8"});

    console.log(this.buffer);

    return this;
  }
}

new SGFile("")