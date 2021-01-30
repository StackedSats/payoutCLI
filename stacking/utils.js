import client from "./generateAccount.js";
import config from "../config.js";
import { secondsUntilNextCycle, cycleDuration } from "./displayStaking.js";

export async function isUserEligible() {
  const hasMinStxAmount = await client.hasMinimumStx();
  return hasMinStxAmount;
}

export function numberOfCycles() {
  let numberOfCycles = 3;
  const unlockingAt = new Date(new Date().getTime() + secondsUntilNextCycle);
  unlockingAt.setSeconds(
    unlockingAt.getSeconds() + cycleDuration * numberOfCycles
  );
}

export async function stackingEligibility() {
  // user supplied parameters
  let btcAddress = config.keyInfo.btcAddress;
  let numberOfCycles = 3;

  const stackingEligibility = await client.canStack({
    poxAddress: btcAddress,
    cycles: numberOfCycles,
  });

  console.log(stackingEligibility);
  return stackingEligibility;

  // this assumes user is stacking is entire balance
}

export async function getStatus() {
  const status = await client.getStatus();
  console.log(status);
  return status;
}

// isUserEligible();
// // numberOfCycles();
// stackingEligibility();
// getStatus();
