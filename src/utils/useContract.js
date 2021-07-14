import abi from '../contract/abi.json';

import { Web3Instance } from './useWeb3';


export function Contract() {
  const contractAddress = '0x30bab6b88db781129c6a4e9b7926738e3314cf1c';

  const web3 = Web3Instance();
  let contract = new web3.eth.Contract(abi, contractAddress);
  return contract;
}
