import mongoose from "mongoose";
import { btcClaim } from "./models/index.js";
import { script } from "./script.js";
import dotenv from "dotenv";
dotenv.config();
import readline from "readline";
import commit from "./commit";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.mongodbURL, {
    useNewUrlParser: true,
    autoReconnect: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to Database");
    rl.question(
      "Enter 1 for list or 2 for payout and 3 for confirming stacking ? ",
      async function (name) {
        switch (parseInt(name)) {
          case 1:
            const list = await btcClaim.find({}).populate().lean();
            list.forEach((value) => {
              console.log(value.username);
              console.table(value.btcAddress);
            });

            break;
          case 2:
            rl.question("Enter username", function (username) {
              rl.question("enter reward", function (reward) {
                rl.question(
                  "enter payoutaddress",
                  async function (payoutBTCAddress) {
                    await script({ username, reward, payoutBTCAddress });
                  }
                );
              });
            });
            break;

          case 3:
            rl.question("Enter reward cycle id", async (id) => {
              const tx = await commit(id);
              console.log(tx);
            });
          default:
            rl.close();
            process.exit(0);
        }
        //   process.exit(0);
      }
    );

    rl.on("close", function () {
      console.log("\nBYE BYE !!!");
      process.exit(0);
    });
  })
  .catch(() => {
    console.log("Failed to connect to the database");
  });
