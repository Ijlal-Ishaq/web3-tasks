import {
  PRIVATE_KEY,
  WALLET_ADDRESS_1,
  WALLET_ADDRESS_2,
  RPC_URL,
} from "./keys.js";
import Web3 from "web3";
import Provider from "@truffle/hdwallet-provider";
import { exit } from "process";

const provider = new Provider(PRIVATE_KEY, RPC_URL);
const web3 = new Web3(provider);

console.log("transfering...");

web3.eth
  .sendTransaction({
    to: WALLET_ADDRESS_2,
    from: WALLET_ADDRESS_1,
    value: web3.utils.toWei("1", "ether"),
  })
  .on("transactionHash", (hash) => {
    console.log("transaction hash: " + hash);
  })
  .on("confirmation", (confirmationNo) => {
    if (confirmationNo == 1) {
      console.log("transfer successfully", confirmationNo);
      exit(0);
    }
  })
  .on("error", (error) => {
    console.log(error);
  });
