export default class Scheduler {

  private intervalFinder: NodeJS.Timeout;
  private minuteInterval: NodeJS.Timeout;

  constructor(interval, options: {
    second: number, minute: number, hour: number,
    day: number, week: number, month: number,
    year: number
  }) {

    this.intervalFinder = setInterval(() => {

      let date = new Date();
      let UTCseconds = date.getUTCSeconds();
      let seconds = date.getSeconds();

      if (UTCseconds === 0 || seconds === 0) {
        console.log("Minute interval found");
        this.setMinuteInterval().catch(console.error);
      }

    }, 1000)

    return this;
  }

  async setMinuteInterval() {
    clearInterval(this.intervalFinder);

  }

  async findHourInterval() {

  }

}