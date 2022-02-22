import { CONTRACT_ADDRESS, WS_RPC } from "./keys.js";
import Web3 from "web3";

const web3 = new Web3(WS_RPC);

const res = await web3.eth.getTransaction(
  "0x7f4aea59d5a2014e048e0539c0b4ea7c2e4549a68c31eb90757189f9968b03ef"
);

const data = web3.eth.abi.decodeParameters(
  [
    { name: "_to", type: "address" },
    { name: "_amount", type: "uint256" },
  ],
  res.input.slice(10, res.input.length)
);

console.log(`To : ${data._to}\nAmount : ${data._amount}`);
