import { BtcRewardGraphs } from "./models/claimRewardsGraph.js";
import { User } from "./models/user.js";
import { rewardHistory, btcClaim, btcRewardHistory } from "./models/index.js";
import dotenv from "dotenv";
import config from "./config.js";
dotenv.config();

const script = async ({ username, reward, payoutBTCAddress }) => {
  reward = parseInt(reward);
  const user = await User.findOne({ username });
  user.pendingBTCReward -= reward;
  user.totalBTCReward += reward;

  user.save();

  const claim = await BtcRewardGraphs.findOneAndUpdate(
    { username },
    {
      $push: { reward, date: Date.now() },
    },
    {
      new: true,
      upsert: true,
    }
  );
  console.log(JSON.stringify(claim));

  const rh = await rewardHistory.create({
    from: config.keyInfo.btcAddress,
    to: payoutBTCAddress,
    reward,
  });

  const btcClaimList = await btcClaim.findOne({ username });

  let list = [];
  let count = 0;

  for (let i of btcClaimList.btcAddress) {
    if (
      i.btcAddress === payoutBTCAddress &&
      i.value === reward &&
      count === 0
    ) {
      count++;
      continue;
    }
    list.push(i);
  }

  btcClaimList.btcAddress = list;
  await btcClaimList.save();

  await btcRewardHistory.findOneAndUpdate(
    { username },
    {
      $push: {
        txs: rh._id,
      },
    },
    { upsert: true }
  );
  console.log("Done!!");
  process.exit(0);
};

export { script };
