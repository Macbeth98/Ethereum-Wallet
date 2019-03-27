import Web3 from "web3";

let endpoint;
if (process.env.NODE_ENV === "production") {
  endpoint = "https://mainnet.infura.io/v3/5e078cd5c68d438d946e587841d7866e";
} else {
  endpoint = "https://mainnet.infura.io/v3/5e078cd5c68d438d946e587841d7866e";
}

//https://mainnet.infura.io/v3/5e078cd5c68d438d946e587841d7866e
//https://rinkeby.infura.io/v3/5e078cd5c68d438d946e587841d7866e

var web3 = new Web3(new Web3.providers.HttpProvider(endpoint));

export default web3;
