import asyncWait from "./asyncWait";

const doMultipleTimes = async (asyncFunc: Function, nb: number, interval: number) => {
  let i = 0;
  await asyncFunc();
  do {
    if (interval) {
      await asyncWait(interval);
    }
    await asyncFunc();
  } while (i < nb);
};

export default doMultipleTimes;
