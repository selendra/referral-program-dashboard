import abi from '../contract/abi.json';

import { useWeb3 } from './useWeb3';


export function useContract() {
  const contractAddress = '0xc7fe9232c55fab39fd7c89aa459aa03c55ee283c';

  const web3 = useWeb3();
  let contract = new web3.eth.Contract(abi, contractAddress);
  return contract;
}
