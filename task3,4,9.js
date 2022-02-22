import { CONTRACT_ADDRESS, WS_RPC } from "./keys.js";
import Web3 from "web3";

const web3 = new Web3(WS_RPC);

SubscribeEvent(
  CONTRACT_ADDRESS,
  ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"],
  10200373
);

function SubscribeEvent(address, topic, startBlock) {
  const subscription = web3.eth.subscribe("logs", {
    fromBlock: startBlock,
    toBlock: "latest",
    address: address,
    topics: topic,
  });
  subscription.on("connected", function (subscriptionId) {
    console.log("subscriptionId: ", subscriptionId);
  });
  subscription.on("data", (event) => {
    const data = web3.eth.abi.decodeLog(
      [
        {
          indexed: true,
          internalType: "address",
          name: "_from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      event.data,
      event.topics.slice(1)
    );
    console.log(
      "Amount transfered : ",
      data._amount / 1e18 +
        "ETH \n From : " +
        data._from +
        "\n To : " +
        data._to +
        "\n"
    );
  });
}
