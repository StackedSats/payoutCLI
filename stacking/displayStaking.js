import client from "./generateAccount.js";

export async function stackingEnabledNextCycle() {
  const stackingEnabledNextCycle = await client.isStackingEnabledNextCycle();
  return stackingEnabledNextCycle;
}

export async function cycleDuration() {
  const cycleDuration = await client.getCycleDuration();
  return cycleDuration;
}

export async function secondsUntilNextCycle() {
  const secondsUntilNextCycle = await client.getSecondsUntilNextCycle();
  return secondsUntilNextCycle;
}

export async function targetBlockTime() {
  const targetBlocktime = await client.getTargetBlockTime();
  return targetBlocktime;
}
