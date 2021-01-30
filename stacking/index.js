import {
  stackingEnabledNextCycle,
  cycleDuration,
  secondsUntilNextCycle,
} from "./displayStaking.js";

import {
  isUserEligible,
  numberOfCycles,
  stackingEligibility,
} from "./utils.js";

import { lockStxToStack, waitTransaction } from "./lockStx.js";

async function stack() {
  const willStakingBeExecitedInNextCycle = await stackingEnabledNextCycle();
  console.log(
    "Will stacking be enabled in next cycle :" +
      willStakingBeExecitedInNextCycle
  );

  const cycleduration = await cycleDuration();
  console.log("How long is a stacking cycle :", cycleduration);

  const secondsUntilNextCycleIs = await secondsUntilNextCycle();
  console.log("Seconds Until Next Cycle", secondsUntilNextCycleIs);

  const areYouEligible = await isUserEligible();
  console.log("Minimum Stack Availaible: ", areYouEligible);

  const getNumberOfCycles = numberOfCycles();
  console.log("Number of cycles ", getNumberOfCycles);

  //   const getStackingEligibility = await stackingEligibility();
  //   console.log("Can user stack ", getStackingEligibility);

  const locking = await lockStxToStack();
  console.log("Index ", locking);
  const waitForSuccess = await waitTransaction(locking);
  console.log(waitForSuccess);
}

stack();
