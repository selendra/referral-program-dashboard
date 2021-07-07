import Web3 from "web3";

export function Web3Instance() {
  const testnet = 'https://data-seed-prebsc-1-s1.binance.org:8545';

  let instance = new Web3(testnet);
  return instance;
};
