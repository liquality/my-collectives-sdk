/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  I0xSplit,
  I0xSplitInterface,
} from "../../../contracts/external/I0xSplit";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getETHBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "withdrawETH",
        type: "uint256",
      },
      {
        internalType: "contract ERC20[]",
        name: "tokens",
        type: "address[]",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class I0xSplit__factory {
  static readonly abi = _abi;
  static createInterface(): I0xSplitInterface {
    return new Interface(_abi) as I0xSplitInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): I0xSplit {
    return new Contract(address, _abi, runner) as unknown as I0xSplit;
  }
}
