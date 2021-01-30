/* eslint-disable no-unused-vars */
import { TransactionsApi, Configuration } from "@stacks/blockchain-api-client";
import client from "./generateAccount.js";
import BN from "bn.js";
import config from "../config.js";

const btcAddress = config.keyInfo.btcAddress;
const privateKey = config.keyInfo.privateKey;

const apiConfig = new Configuration({
  fetchApi: fetch,
  basePath: "https://stacks-node-api.blockstack.org", // defaults to http://localhost:3999
});

const tx = new TransactionsApi(apiConfig);

let txid = "";

async function getCoreInfo() {
  const coreInfo = await client.getCoreInfo();
  return coreInfo.burn_block_height;
}

export async function lockStxToStack() {
  const amountMicroStx = new BN(100000000000);

  const burnBlockHeight = (await getCoreInfo()) + 3;
  console.log(amountMicroStx, btcAddress, privateKey, burnBlockHeight);
  client
    .stack({
      amountMicroStx,
      poxAddress: btcAddress,
      cycles: 3,
      privateKey,
      burnBlockHeight,
    })
    .then((response) => {
      // eslint-disable-next-line no-prototype-builtins
      if (response.hasOwnProperty("error")) {
        console.log(response.error);
        throw new Error("Stacking transaction failed");
      } else {
        console.log(`txid: ${response}`);
        return response;
      }
    });
}

export async function waitTransaction(txId) {
  const waitForTransactionSuccess = (txId) =>
    new Promise((resolve, reject) => {
      const pollingInterval = 3000;
      const intervalID = setInterval(async () => {
        const resp = await tx.getTransactionById({ txId });
        if (resp.tx_status === "success") {
          clearInterval(intervalID);
          // update UI to display stacking status
          return resolve(resp);
        }
      }, pollingInterval);
    });

  // note: txId should be defined previously
  const resp = await waitForTransactionSuccess(txId);
  console.log(resp);
}

lockStxToStack();
