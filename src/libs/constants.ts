// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

// Addresses
export const COLLECTIVE_FACTORY_ADDRESS =
'0x3746Deb67b73852ef10AE30f22D630f05E67A99D'//'0xdff38bFcE5A82DF8ac62232d11B02eC2725B7154'//
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

export const ENTRYPOINT_ABI = 
[
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "preOpGas",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "paid",
        "type": "uint256"
      },
      {
        "internalType": "uint48",
        "name": "validAfter",
        "type": "uint48"
      },
      {
        "internalType": "uint48",
        "name": "validUntil",
        "type": "uint48"
      },
      {
        "internalType": "bool",
        "name": "targetSuccess",
        "type": "bool"
      },
      {
        "internalType": "bytes",
        "name": "targetResult",
        "type": "bytes"
      }
    ],
    "name": "ExecutionResult",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "opIndex",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "reason",
        "type": "string"
      }
    ],
    "name": "FailedOp",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "SenderAddressResult",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "aggregator",
        "type": "address"
      }
    ],
    "name": "SignatureValidationFailed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "preOpGas",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "prefund",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "sigFailed",
            "type": "bool"
          },
          {
            "internalType": "uint48",
            "name": "validAfter",
            "type": "uint48"
          },
          {
            "internalType": "uint48",
            "name": "validUntil",
            "type": "uint48"
          },
          {
            "internalType": "bytes",
            "name": "paymasterContext",
            "type": "bytes"
          }
        ],
        "internalType": "struct IEntryPoint.ReturnInfo",
        "name": "returnInfo",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "stake",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "unstakeDelaySec",
            "type": "uint256"
          }
        ],
        "internalType": "struct IStakeManager.StakeInfo",
        "name": "senderInfo",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "stake",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "unstakeDelaySec",
            "type": "uint256"
          }
        ],
        "internalType": "struct IStakeManager.StakeInfo",
        "name": "factoryInfo",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "stake",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "unstakeDelaySec",
            "type": "uint256"
          }
        ],
        "internalType": "struct IStakeManager.StakeInfo",
        "name": "paymasterInfo",
        "type": "tuple"
      }
    ],
    "name": "ValidationResult",
    "type": "error"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "preOpGas",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "prefund",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "sigFailed",
            "type": "bool"
          },
          {
            "internalType": "uint48",
            "name": "validAfter",
            "type": "uint48"
          },
          {
            "internalType": "uint48",
            "name": "validUntil",
            "type": "uint48"
          },
          {
            "internalType": "bytes",
            "name": "paymasterContext",
            "type": "bytes"
          }
        ],
        "internalType": "struct IEntryPoint.ReturnInfo",
        "name": "returnInfo",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "stake",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "unstakeDelaySec",
            "type": "uint256"
          }
        ],
        "internalType": "struct IStakeManager.StakeInfo",
        "name": "senderInfo",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "stake",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "unstakeDelaySec",
            "type": "uint256"
          }
        ],
        "internalType": "struct IStakeManager.StakeInfo",
        "name": "factoryInfo",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "stake",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "unstakeDelaySec",
            "type": "uint256"
          }
        ],
        "internalType": "struct IStakeManager.StakeInfo",
        "name": "paymasterInfo",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "aggregator",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "stake",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "unstakeDelaySec",
                "type": "uint256"
              }
            ],
            "internalType": "struct IStakeManager.StakeInfo",
            "name": "stakeInfo",
            "type": "tuple"
          }
        ],
        "internalType": "struct IEntryPoint.AggregatorStakeInfo",
        "name": "aggregatorInfo",
        "type": "tuple"
      }
    ],
    "name": "ValidationResultWithAggregation",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "userOpHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "factory",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "paymaster",
        "type": "address"
      }
    ],
    "name": "AccountDeployed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "BeforeExecution",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalDeposit",
        "type": "uint256"
      }
    ],
    "name": "Deposited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "aggregator",
        "type": "address"
      }
    ],
    "name": "SignatureAggregatorChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalStaked",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "unstakeDelaySec",
        "type": "uint256"
      }
    ],
    "name": "StakeLocked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "withdrawTime",
        "type": "uint256"
      }
    ],
    "name": "StakeUnlocked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "withdrawAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "StakeWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "userOpHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "paymaster",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "actualGasCost",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "actualGasUsed",
        "type": "uint256"
      }
    ],
    "name": "UserOperationEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "userOpHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "revertReason",
        "type": "bytes"
      }
    ],
    "name": "UserOperationRevertReason",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "withdrawAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdrawn",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "SIG_VALIDATION_FAILED",
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
        "internalType": "bytes",
        "name": "initCode",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "paymasterAndData",
        "type": "bytes"
      }
    ],
    "name": "_validateSenderAndPaymaster",
    "outputs": [],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "unstakeDelaySec",
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
        "name": "",
        "type": "address"
      }
    ],
    "name": "deposits",
    "outputs": [
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
        "internalType": "struct IStakeManager.DepositInfo",
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
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "initCode",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          },
          {
            "internalType": "uint256",
            "name": "callGasLimit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "verificationGasLimit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "preVerificationGas",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxFeePerGas",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxPriorityFeePerGas",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "paymasterAndData",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct UserOperation",
        "name": "userOp",
        "type": "tuple"
      }
    ],
    "name": "getUserOpHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "initCode",
                "type": "bytes"
              },
              {
                "internalType": "bytes",
                "name": "callData",
                "type": "bytes"
              },
              {
                "internalType": "uint256",
                "name": "callGasLimit",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "verificationGasLimit",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "preVerificationGas",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "maxFeePerGas",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "maxPriorityFeePerGas",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "paymasterAndData",
                "type": "bytes"
              },
              {
                "internalType": "bytes",
                "name": "signature",
                "type": "bytes"
              }
            ],
            "internalType": "struct UserOperation[]",
            "name": "userOps",
            "type": "tuple[]"
          },
          {
            "internalType": "contract IAggregator",
            "name": "aggregator",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct IEntryPoint.UserOpsPerAggregator[]",
        "name": "opsPerAggregator",
        "type": "tuple[]"
      },
      {
        "internalType": "address payable",
        "name": "beneficiary",
        "type": "address"
      }
    ],
    "name": "handleAggregatedOps",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "initCode",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          },
          {
            "internalType": "uint256",
            "name": "callGasLimit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "verificationGasLimit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "preVerificationGas",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxFeePerGas",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxPriorityFeePerGas",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "paymasterAndData",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct UserOperation[]",
        "name": "ops",
        "type": "tuple[]"
      },
      {
        "internalType": "address payable",
        "name": "beneficiary",
        "type": "address"
      }
    ],
    "name": "handleOps",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint192",
        "name": "key",
        "type": "uint192"
      }
    ],
    "name": "incrementNonce",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "callData",
        "type": "bytes"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "callGasLimit",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "verificationGasLimit",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "preVerificationGas",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "paymaster",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "maxFeePerGas",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "maxPriorityFeePerGas",
                "type": "uint256"
              }
            ],
            "internalType": "struct EntryPoint.MemoryUserOp",
            "name": "mUserOp",
            "type": "tuple"
          },
          {
            "internalType": "bytes32",
            "name": "userOpHash",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "prefund",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "contextOffset",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "preOpGas",
            "type": "uint256"
          }
        ],
        "internalType": "struct EntryPoint.UserOpInfo",
        "name": "opInfo",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      }
    ],
    "name": "innerHandleOp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "actualGasCost",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint192",
        "name": "",
        "type": "uint192"
      }
    ],
    "name": "nonceSequenceNumber",
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
        "components": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "initCode",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          },
          {
            "internalType": "uint256",
            "name": "callGasLimit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "verificationGasLimit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "preVerificationGas",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxFeePerGas",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxPriorityFeePerGas",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "paymasterAndData",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct UserOperation",
        "name": "op",
        "type": "tuple"
      },
      {
        "internalType": "address",
        "name": "target",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "targetCallData",
        "type": "bytes"
      }
    ],
    "name": "simulateHandleOp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "initCode",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          },
          {
            "internalType": "uint256",
            "name": "callGasLimit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "verificationGasLimit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "preVerificationGas",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxFeePerGas",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxPriorityFeePerGas",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "paymasterAndData",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct UserOperation",
        "name": "userOp",
        "type": "tuple"
      }
    ],
    "name": "simulateValidation",
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
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]