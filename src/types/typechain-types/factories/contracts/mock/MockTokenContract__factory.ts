/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  MockTokenContract,
  MockTokenContractInterface,
} from "../../../contracts/mock/MockTokenContract";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "recipient",
        type: "address",
      },
    ],
    name: "forwardval",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405260006006553480156200001657600080fd5b506040518060400160405280601181526020017f4d6f636b546f6b656e436f6e74726163740000000000000000000000000000008152506040518060400160405280600381526020017f4d54430000000000000000000000000000000000000000000000000000000000815250816000908162000094919062000329565b508060019081620000a6919062000329565b50505062000410565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200013157607f821691505b602082108103620001475762000146620000e9565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620001b17fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000172565b620001bd868362000172565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b60006200020a62000204620001fe84620001d5565b620001df565b620001d5565b9050919050565b6000819050919050565b6200022683620001e9565b6200023e620002358262000211565b8484546200017f565b825550505050565b600090565b6200025562000246565b620002628184846200021b565b505050565b5b818110156200028a576200027e6000826200024b565b60018101905062000268565b5050565b601f821115620002d957620002a3816200014d565b620002ae8462000162565b81016020851015620002be578190505b620002d6620002cd8562000162565b83018262000267565b50505b505050565b600082821c905092915050565b6000620002fe60001984600802620002de565b1980831691505092915050565b6000620003198383620002eb565b9150826002028217905092915050565b6200033482620000af565b67ffffffffffffffff81111562000350576200034f620000ba565b5b6200035c825462000118565b620003698282856200028e565b600060209050601f831160018114620003a157600084156200038c578287015190505b6200039885826200030b565b86555062000408565b601f198416620003b1866200014d565b60005b82811015620003db57848901518255600182019150602085019450602081019050620003b4565b86831015620003fb5784890151620003f7601f891682620002eb565b8355505b6001600288020188555050505b505050505050565b6122ac80620004206000396000f3fe6080604052600436106100e85760003560e01c80636a6278421161008a578063b88d4fde11610059578063b88d4fde146102f7578063c87b56dd14610320578063e6b71b731461035d578063e985e9c514610386576100e8565b80636a6278421461024a57806370a082311461026657806395d89b41146102a3578063a22cb465146102ce576100e8565b8063095ea7b3116100c6578063095ea7b31461019257806323b872dd146101bb57806342842e0e146101e45780636352211e1461020d576100e8565b806301ffc9a7146100ed57806306fdde031461012a578063081812fc14610155575b600080fd5b3480156100f957600080fd5b50610114600480360381019061010f9190611947565b6103c3565b604051610121919061198f565b60405180910390f35b34801561013657600080fd5b5061013f6104a5565b60405161014c9190611a3a565b60405180910390f35b34801561016157600080fd5b5061017c60048036038101906101779190611a92565b610537565b6040516101899190611b00565b60405180910390f35b34801561019e57600080fd5b506101b960048036038101906101b49190611b47565b610553565b005b3480156101c757600080fd5b506101e260048036038101906101dd9190611b87565b610569565b005b3480156101f057600080fd5b5061020b60048036038101906102069190611b87565b61066b565b005b34801561021957600080fd5b50610234600480360381019061022f9190611a92565b61068b565b6040516102419190611b00565b60405180910390f35b610264600480360381019061025f9190611bda565b61069d565b005b34801561027257600080fd5b5061028d60048036038101906102889190611bda565b610785565b60405161029a9190611c16565b60405180910390f35b3480156102af57600080fd5b506102b861083f565b6040516102c59190611a3a565b60405180910390f35b3480156102da57600080fd5b506102f560048036038101906102f09190611c5d565b6108d1565b005b34801561030357600080fd5b5061031e60048036038101906103199190611dd2565b6108e7565b005b34801561032c57600080fd5b5061034760048036038101906103429190611a92565b610904565b6040516103549190611a3a565b60405180910390f35b34801561036957600080fd5b50610384600480360381019061037f9190611e93565b61096d565b005b34801561039257600080fd5b506103ad60048036038101906103a89190611ec0565b610a1d565b6040516103ba919061198f565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061048e57507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061049e575061049d82610ab1565b5b9050919050565b6060600080546104b490611f2f565b80601f01602080910402602001604051908101604052809291908181526020018280546104e090611f2f565b801561052d5780601f106105025761010080835404028352916020019161052d565b820191906000526020600020905b81548152906001019060200180831161051057829003601f168201915b5050505050905090565b600061054282610b1b565b5061054c82610ba3565b9050919050565b6105658282610560610be0565b610be8565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036105db5760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016105d29190611b00565b60405180910390fd5b60006105ef83836105ea610be0565b610bfa565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610665578382826040517f64283d7b00000000000000000000000000000000000000000000000000000000815260040161065c93929190611f60565b60405180910390fd5b50505050565b610686838383604051806020016040528060008152506108e7565b505050565b600061069682610b1b565b9050919050565b6106db6040518060400160405280601f81526020017f2063616d6520746f204d6f636b546f6b656e436f6e74726163742e6d696e7400815250610e14565b6000341161071e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161071590611fe3565b60405180910390fd5b6001600660008282546107319190612032565b9250508190555061074481600654610ead565b6107826040518060400160405280600781526020017f206d696e74656400000000000000000000000000000000000000000000000000815250610e14565b50565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036107f85760006040517f89c62b640000000000000000000000000000000000000000000000000000000081526004016107ef9190611b00565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606001805461084e90611f2f565b80601f016020809104026020016040519081016040528092919081815260200182805461087a90611f2f565b80156108c75780601f1061089c576101008083540402835291602001916108c7565b820191906000526020600020905b8154815290600101906020018083116108aa57829003601f168201915b5050505050905090565b6108e36108dc610be0565b8383610fa6565b5050565b6108f2848484610569565b6108fe84848484611115565b50505050565b606061090f82610b1b565b50600061091a6112cc565b9050600081511161093a5760405180602001604052806000815250610965565b80610944846112e3565b6040516020016109559291906120a2565b6040516020818303038152906040525b915050919050565b60008173ffffffffffffffffffffffffffffffffffffffff1647604051610993906120f7565b60006040518083038185875af1925050503d80600081146109d0576040519150601f19603f3d011682016040523d82523d6000602084013e6109d5565b606091505b5050905080610a19576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a1090611fe3565b60405180910390fd5b5050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600080610b27836113b1565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610b9a57826040517f7e273289000000000000000000000000000000000000000000000000000000008152600401610b919190611c16565b60405180910390fd5b80915050919050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600033905090565b610bf583838360016113ee565b505050565b600080610c06846113b1565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614610c4857610c478184866115b3565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610cd957610c8a6000856000806113ee565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614610d5c576001600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b846002600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b610eaa81604051602401610e289190611a3a565b6040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611677565b50565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610f1f5760006040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401610f169190611b00565b60405180910390fd5b6000610f2d83836000610bfa565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610fa15760006040517f73c6ac6e000000000000000000000000000000000000000000000000000000008152600401610f989190611b00565b60405180910390fd5b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361101757816040517f5b08ba1800000000000000000000000000000000000000000000000000000000815260040161100e9190611b00565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051611108919061198f565b60405180910390a3505050565b60008373ffffffffffffffffffffffffffffffffffffffff163b11156112c6578273ffffffffffffffffffffffffffffffffffffffff1663150b7a02611159610be0565b8685856040518563ffffffff1660e01b815260040161117b9493929190612161565b6020604051808303816000875af19250505080156111b757506040513d601f19601f820116820180604052508101906111b491906121c2565b60015b61123b573d80600081146111e7576040519150601f19603f3d011682016040523d82523d6000602084013e6111ec565b606091505b50600081510361123357836040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040161122a9190611b00565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146112c457836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016112bb9190611b00565b60405180910390fd5b505b50505050565b606060405180602001604052806000815250905090565b6060600060016112f284611691565b01905060008167ffffffffffffffff81111561131157611310611ca7565b5b6040519080825280601f01601f1916602001820160405280156113435781602001600182028036833780820191505090505b509050600082602001820190505b6001156113a6578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a858161139a576113996121ef565b5b04945060008503611351575b819350505050919050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b80806114275750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b1561155b57600061143784610b1b565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141580156114a257508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b80156114b557506114b38184610a1d565b155b156114f757826040517fa9fbf51f0000000000000000000000000000000000000000000000000000000081526004016114ee9190611b00565b60405180910390fd5b811561155957838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b836004600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b6115be8383836117e4565b61167257600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361163357806040517f7e27328900000000000000000000000000000000000000000000000000000000815260040161162a9190611c16565b60405180910390fd5b81816040517f177e802f00000000000000000000000000000000000000000000000000000000815260040161166992919061221e565b60405180910390fd5b505050565b61168e816116866118a56118c6565b63ffffffff16565b50565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083106116ef577a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083816116e5576116e46121ef565b5b0492506040810190505b6d04ee2d6d415b85acef8100000000831061172c576d04ee2d6d415b85acef81000000008381611722576117216121ef565b5b0492506020810190505b662386f26fc10000831061175b57662386f26fc100008381611751576117506121ef565b5b0492506010810190505b6305f5e1008310611784576305f5e100838161177a576117796121ef565b5b0492506008810190505b61271083106117a957612710838161179f5761179e6121ef565b5b0492506004810190505b606483106117cc57606483816117c2576117c16121ef565b5b0492506002810190505b600a83106117db576001810190505b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561189c57508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061185d575061185c8484610a1d565b5b8061189b57508273ffffffffffffffffffffffffffffffffffffffff1661188383610ba3565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b6118d1819050919050565b6118d9612247565b565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611924816118ef565b811461192f57600080fd5b50565b6000813590506119418161191b565b92915050565b60006020828403121561195d5761195c6118e5565b5b600061196b84828501611932565b91505092915050565b60008115159050919050565b61198981611974565b82525050565b60006020820190506119a46000830184611980565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156119e45780820151818401526020810190506119c9565b60008484015250505050565b6000601f19601f8301169050919050565b6000611a0c826119aa565b611a1681856119b5565b9350611a268185602086016119c6565b611a2f816119f0565b840191505092915050565b60006020820190508181036000830152611a548184611a01565b905092915050565b6000819050919050565b611a6f81611a5c565b8114611a7a57600080fd5b50565b600081359050611a8c81611a66565b92915050565b600060208284031215611aa857611aa76118e5565b5b6000611ab684828501611a7d565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611aea82611abf565b9050919050565b611afa81611adf565b82525050565b6000602082019050611b156000830184611af1565b92915050565b611b2481611adf565b8114611b2f57600080fd5b50565b600081359050611b4181611b1b565b92915050565b60008060408385031215611b5e57611b5d6118e5565b5b6000611b6c85828601611b32565b9250506020611b7d85828601611a7d565b9150509250929050565b600080600060608486031215611ba057611b9f6118e5565b5b6000611bae86828701611b32565b9350506020611bbf86828701611b32565b9250506040611bd086828701611a7d565b9150509250925092565b600060208284031215611bf057611bef6118e5565b5b6000611bfe84828501611b32565b91505092915050565b611c1081611a5c565b82525050565b6000602082019050611c2b6000830184611c07565b92915050565b611c3a81611974565b8114611c4557600080fd5b50565b600081359050611c5781611c31565b92915050565b60008060408385031215611c7457611c736118e5565b5b6000611c8285828601611b32565b9250506020611c9385828601611c48565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611cdf826119f0565b810181811067ffffffffffffffff82111715611cfe57611cfd611ca7565b5b80604052505050565b6000611d116118db565b9050611d1d8282611cd6565b919050565b600067ffffffffffffffff821115611d3d57611d3c611ca7565b5b611d46826119f0565b9050602081019050919050565b82818337600083830152505050565b6000611d75611d7084611d22565b611d07565b905082815260208101848484011115611d9157611d90611ca2565b5b611d9c848285611d53565b509392505050565b600082601f830112611db957611db8611c9d565b5b8135611dc9848260208601611d62565b91505092915050565b60008060008060808587031215611dec57611deb6118e5565b5b6000611dfa87828801611b32565b9450506020611e0b87828801611b32565b9350506040611e1c87828801611a7d565b925050606085013567ffffffffffffffff811115611e3d57611e3c6118ea565b5b611e4987828801611da4565b91505092959194509250565b6000611e6082611abf565b9050919050565b611e7081611e55565b8114611e7b57600080fd5b50565b600081359050611e8d81611e67565b92915050565b600060208284031215611ea957611ea86118e5565b5b6000611eb784828501611e7e565b91505092915050565b60008060408385031215611ed757611ed66118e5565b5b6000611ee585828601611b32565b9250506020611ef685828601611b32565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611f4757607f821691505b602082108103611f5a57611f59611f00565b5b50919050565b6000606082019050611f756000830186611af1565b611f826020830185611c07565b611f8f6040830184611af1565b949350505050565b7f6661696c656420746f2073656e64000000000000000000000000000000000000600082015250565b6000611fcd600e836119b5565b9150611fd882611f97565b602082019050919050565b60006020820190508181036000830152611ffc81611fc0565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061203d82611a5c565b915061204883611a5c565b92508282019050808211156120605761205f612003565b5b92915050565b600081905092915050565b600061207c826119aa565b6120868185612066565b93506120968185602086016119c6565b80840191505092915050565b60006120ae8285612071565b91506120ba8284612071565b91508190509392505050565b600081905092915050565b50565b60006120e16000836120c6565b91506120ec826120d1565b600082019050919050565b6000612102826120d4565b9150819050919050565b600081519050919050565b600082825260208201905092915050565b60006121338261210c565b61213d8185612117565b935061214d8185602086016119c6565b612156816119f0565b840191505092915050565b60006080820190506121766000830187611af1565b6121836020830186611af1565b6121906040830185611c07565b81810360608301526121a28184612128565b905095945050505050565b6000815190506121bc8161191b565b92915050565b6000602082840312156121d8576121d76118e5565b5b60006121e6848285016121ad565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006040820190506122336000830185611af1565b6122406020830184611c07565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052605160045260246000fdfea2646970667358221220da1ca507dc5d50df2e9c9b7ddad65e669a6124e2eb245866a68ba759d908544764736f6c63430008140033";

type MockTokenContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockTokenContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockTokenContract__factory extends ContractFactory {
  constructor(...args: MockTokenContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      MockTokenContract & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MockTokenContract__factory {
    return super.connect(runner) as MockTokenContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockTokenContractInterface {
    return new Interface(_abi) as MockTokenContractInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MockTokenContract {
    return new Contract(address, _abi, runner) as unknown as MockTokenContract;
  }
}