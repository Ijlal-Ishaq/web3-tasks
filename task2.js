import {
  PRIVATE_KEY,
  PRIVATE_KEY_1,
  RPC_URL,
  CONTRACT_ADDRESS,
  WALLET_ADDRESS_1,
  WALLET_ADDRESS_2,
} from "./keys.js";
import Web3 from "web3";
import Provider from "@truffle/hdwallet-provider";
import { ABI } from "./ABI.js";
import { exit } from "process";
import BigNumber from "bignumber.js";

const provider = new Provider(PRIVATE_KEY, RPC_URL);
// const provider = new Provider(PRIVATE_KEY_1, RPC_URL);
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(JSON.parse(ABI), CONTRACT_ADDRESS);

// await transfer();
// await balanceOf();
// await approve();
// await allowance();
// await transferFrom();

async function transfer() {
  contract.methods
    .transfer(WALLET_ADDRESS_2, web3.utils.toWei(web3.utils.toBN(1), "ether"))
    .send({ from: WALLET_ADDRESS_1 })
    .on("transactionHash", (hash) => {
      console.log("transaction hash: " + hash);
    })
    .on("confirmation", async function (confirmationNumber) {
      if (confirmationNumber === 3) {
        console.log("Successfully transfered");
        exit(0);
      }
    });
}

async function balanceOf() {
  console.log(
    web3.utils.fromWei(
      await contract.methods.balanceOf(WALLET_ADDRESS_1).call()
    ) + " Eth"
  );
}

async function approve() {
  contract.methods
    .approve(WALLET_ADDRESS_2, web3.utils.toWei(web3.utils.toBN(1), "ether"))
    .send({ from: WALLET_ADDRESS_1 })
    .on("transactionHash", (hash) => {
      console.log("transaction hash: " + hash);
    })
    .on("confirmation", async function (confirmationNumber) {
      if (confirmationNumber === 3) {
        console.log("Successfully approve");
        exit(0);
      }
    })
    .on("error", (err) => {
      console.log(err);
    });
}

async function allowance() {
  console.log(
    await contract.methods.allowance(WALLET_ADDRESS_1, WALLET_ADDRESS_2).call()
  );
}

async function transferFrom() {
  contract.methods
    .transferFrom(
      WALLET_ADDRESS_1,
      WALLET_ADDRESS_2,
      web3.utils.toWei(web3.utils.toBN(1), "ether")
    )
    .send({ from: WALLET_ADDRESS_2 })
    .on("transactionHash", (hash) => {
      console.log("transaction hash: " + hash);
    })
    .on("confirmation", async function (confirmationNumber) {
      if (confirmationNumber === 3) {
        console.log("Successfully transfered");
        exit(0);
      }
    })
    .on("error", (err) => {
      console.log(err);
    });
}
