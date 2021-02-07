import { getNonce } from "@stacks/transactions";
import { StacksTestnet, StacksMainnet } from "@stacks/network";
import { StackingClient } from "@stacks/stacking";
import BN from "bn.js";
import config from "./config";

const network = new StacksTestnet();

const address = config.keyInfo.address;
const privateKey = config.keyInfo.privateKey;
const poxAddress = config.keyInfo.btcAddress;

const delegatorClient = new StackingClient(address, network);

async function commitStacking(rewardCycle) {
  const delegetateCommitResponse = await delegatorClient.stackAggregationCommit(
    {
      poxAddress, // this must be the delegator bitcoin address
      rewardCycle,
      privateKey: delegatorPrivateKey,
    }
  );

  return delegetateCommitResponse;
}

export default commitStacking;
