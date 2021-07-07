import abi from '../contract/abi.json';

import { Web3Instance } from './useWeb3';


export function Contract() {
  const contractAddress = '0xc7fe9232c55fab39fd7c89aa459aa03c55ee283c';

  const web3 = Web3Instance();
  let contract = new web3.eth.Contract(abi, contractAddress);
  return contract;
}
