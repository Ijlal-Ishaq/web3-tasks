import { WALLET_ADDRESS_1, WS_RPC, CONTRACT_ADDRESS } from "./keys.js";
import Web3 from "web3";
import axios from "axios";

const web3 = new Web3(WS_RPC);

getAllTransactions(CONTRACT_ADDRESS);

async function getAllTransactions(accountAddress) {
  const res = await axios.get(
    `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${accountAddress}&startblock=0&endblock=99999999&sort=asc&apikey=F4SSISAJCDM9F5JG8FZN8NXCWBTNY6C73M`
  );
  console.log("Total Txs: " + res.data.result.length);
  res.data.result.forEach((element) => {
    console.log(element.hash);
  });
}
