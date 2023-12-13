// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

// Addresses
export const COLLECTIVE_FACTORY_ADDRESS =
  '0x3Df940DfC08b9F797C2EB99164320A5CF9Be6C78'
export const ENTRYPOINT_ADDRESS = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789'

// Transactions
export const MAX_FEE_PER_GAS = 100000000000
export const MAX_PRIORITY_FEE_PER_GAS = 100000000000
export const USER_OPERATIONS_DEFAULT_SIGNATURE = "0xd81911975579ed8b5de60261de171e32c380980a1758fedd3a182590d161cc9b598e4b2adaf7d03dce34ed889bc7321ae153accc9691ee3db9ed0dbe9abe5dd91b"

// ABI's
export const ERC20_ABI = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',
  'function approve(address _spender, uint256 _value) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
]

export const USER_OPERATIONS_ABI = {
  components: [
    {name: "sender", type: "address"},
    {
      name: "nonce",
      type: "uint256"
    },
    {
      name: "initCode",
      type: "bytes"
    },
    {
      name: "callData",
      type: "bytes"
    },
    {
      
      name: "callGasLimit",
      type: "uint256"
    },
    {
      
      name: "verificationGasLimit",
      type: "uint256"
    },
    {
      
      name: "preVerificationGas",
      type: "uint256"
    },
    {
      
      name: "maxFeePerGas",
      type: "uint256"
    },
    {
      
      name: "maxPriorityFeePerGas",
      type: "uint256"
    },
    {
      
      name: "paymasterAndData",
      type: "bytes"
    },
    {
      
      name: "signature",
      type: "bytes"
    }
  ],
  name: "userOp",
  type: "tuple"
}

export const ENTRYPOINT_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_unstakeDelaySec",
        "type": "uint32"
      }
    ],
    "name": "addStake",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "depositTo",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getDepositInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint112",
            "name": "deposit",
            "type": "uint112"
          },
          {
            "internalType": "bool",
            "name": "staked",
            "type": "bool"
          },
          {
            "internalType": "uint112",
            "name": "stake",
            "type": "uint112"
          },
          {
            "internalType": "uint32",
            "name": "unstakeDelaySec",
            "type": "uint32"
          },
          {
            "internalType": "uint48",
            "name": "withdrawTime",
            "type": "uint48"
          }
        ],
        "internalType": "struct IEntryPoint.DepositInfo",
        "name": "info",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint192",
        "name": "key",
        "type": "uint192"
      }
    ],
    "name": "getNonce",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "initCode",
        "type": "bytes"
      }
    ],
    "name": "getSenderAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unlockStake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "withdrawAddress",
        "type": "address"
      }
    ],
    "name": "withdrawStake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "withdrawAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "withdrawAmount",
        "type": "uint256"
      }
    ],
    "name": "withdrawTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
