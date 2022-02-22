import { WS_RPC } from "./keys.js";
import Web3 from "web3";

const web3 = new Web3(WS_RPC);

const res = await web3.eth.getTransactionReceipt(
  "0x7f4aea59d5a2014e048e0539c0b4ea7c2e4549a68c31eb90757189f9968b03ef"
);

const res1 = await web3.eth.getTransactionReceipt(
  "0xe6faec01ff351ca2548329a3e024d71398fa3c0d8a87a0be5a6f6cc7eaf3412a"
);

if (res.status) {
  console.log("transaction is confirmed");
  console.log(
    "Transaction fee : " +
      web3.utils.fromWei(web3.utils.toBN(res.effectiveGasPrice), "ether") *
        res.gasUsed +
      " ETH"
  );
} else {
  console.log("transaction is failed");
}
