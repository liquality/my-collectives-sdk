import * as ethers5 from "ethers5";

export const Pool__factory = {
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_tokenContract",
          type: "address",
        },
        {
          internalType: "address",
          name: "_initiator",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "EnforcedPause",
      type: "error",
    },
    {
      inputs: [],
      name: "ExpectedPause",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_recipient",
          type: "address",
        },
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "Pool__FailedToWithdrawFunds",
      type: "error",
    },
    {
      inputs: [],
      name: "Pool__NoRewardToDistribute",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "participant",
          type: "address",
        },
      ],
      name: "Pool__ZeroParticipation",
      type: "error",
    },
    {
      inputs: [],
      name: "ReentrancyGuardReentrantCall",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "participant",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenID",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "quantity",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "amountPaid",
          type: "uint256",
        },
      ],
      name: "NewMint",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "participant",
          type: "address",
        },
      ],
      name: "NewParticipant",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Paused",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "participant",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "RewardDistributed",
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
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "RewardReceived",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "participant",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "RewardWithdrawn",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Unpaused",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "WithrawnToCollective",
      type: "event",
    },
    {
      inputs: [],
      name: "collective",
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
      inputs: [],
      name: "distributeReward",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getParticipants",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getParticipantsCount",
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
      inputs: [],
      name: "getPoolInfo",
      outputs: [
        {
          internalType: "address",
          name: "_tokenContract",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_reward",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_rewardDistributed",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_totalContributions",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "_isRewardReceived",
          type: "bool",
        },
        {
          internalType: "bool",
          name: "_isDistributed",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "isDistributed",
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
      name: "isPoolActive",
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
      name: "isRewardReceived",
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
          name: "",
          type: "address",
        },
      ],
      name: "participantData",
      outputs: [
        {
          internalType: "address",
          name: "id",
          type: "address",
        },
        {
          internalType: "uint64",
          name: "contribution",
          type: "uint64",
        },
        {
          internalType: "uint256",
          name: "rewardedAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "rewardAvailable",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "participants",
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
      inputs: [],
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
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
      name: "poolInitiator",
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
      inputs: [],
      name: "poolReward",
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
          internalType: "address",
          name: "_participant",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_tokenID",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_quantity",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_amountPaid",
          type: "uint256",
        },
      ],
      name: "recordMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "rewardDistributed",
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
      inputs: [],
      name: "tokenContract",
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
      inputs: [],
      name: "totalContributions",
      outputs: [
        {
          internalType: "uint128",
          name: "",
          type: "uint128",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_tokenContract",
          type: "address",
        },
      ],
      name: "withdrawERC20",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawNative",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_participant",
          type: "address",
        },
      ],
      name: "withdrawReward",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ] as const,
};

export type Config = {
  RPC_URL: string;
  PIMLICO_API_KEY?: string;
  BICONOMY_PAYMASTER?: string;
  BICONOMY_BUNDLER_API_KEY?: string;
  AA_PROVIDER: AAProviders;
};

export function setConfig(config: Config) {
  // Enforce config
  if (config.RPC_URL == null || config.AA_PROVIDER == null) {
    throw new Error("RPC_URL, or AA_PROVIDER is not defined in config");
  } else if (config.AA_PROVIDER == AAProviders.PIMLICO) {
    if (!config.PIMLICO_API_KEY) {
      throw new Error("PIMLICO_API_KEY is not defined in config");
    }
    AppConfig.PIMLICO_API_KEY = config.PIMLICO_API_KEY;
  } else if (config.AA_PROVIDER == AAProviders.BICONOMY) {
    if (!config.BICONOMY_PAYMASTER || !config.BICONOMY_BUNDLER_API_KEY) {
      throw new Error(
        "BICONOMY_PAYMASTER or BICONOMY_BUNDLER_API_KEY is not defined in config"
      );
    }
    AppConfig.BICONOMY_PAYMASTER = config.BICONOMY_PAYMASTER;
    AppConfig.BICONOMY_BUNDLER_API_KEY = config.BICONOMY_BUNDLER_API_KEY;
  }

  AppConfig.RPC_URL = config.RPC_URL;
  AppConfig.PROVIDER = AppConfig.getProvider();
  AppConfig.AA_PROVIDER = config.AA_PROVIDER;
}

export enum AAProviders {
  PIMLICO = "Pimlico",
  BICONOMY = "Binonomy",
  LOCAL = "Local",
}

// Configuration
export class AppConfig {
  public static RPC_URL: string;
  public static PIMLICO_API_KEY: string;
  public static PROVIDER: ethers5.providers.JsonRpcProvider;
  public static BICONOMY_PAYMASTER: string;
  public static BICONOMY_BUNDLER_API_KEY: string;
  public static AA_PROVIDER: AAProviders;

  public static getProvider(): ethers5.providers.JsonRpcProvider {
    return new ethers5.providers.JsonRpcProvider(this.RPC_URL);
  }
}

// Create the pool module of the sdk
export class Pool {
  //getPoolReward from pool contract
  public static async getPoolReward(pool: string) {
    const poolContract = new ethers5.Contract(
      pool,
      Pool__factory.abi,
      AppConfig.PROVIDER
    );
    const reward = ethers5.utils.formatEther(await poolContract.poolReward());
    return reward;
  }

  // getTotalContributions from pool contract
  public static async getTotalContributions(pool: string) {
    const poolContract = new ethers5.Contract(
      pool,
      Pool__factory.abi,
      AppConfig.PROVIDER
    );
    const totalContributions = Number(await poolContract.totalContributions());
    return totalContributions;
  }

  // getParticipantsCount from pool contract
  public static async getParticipantsCount(pool: string) {
    const poolContract = new ethers5.Contract(
      pool,
      Pool__factory.abi,
      AppConfig.PROVIDER
    );
    const participantsCount = await poolContract.getParticipantsCount();
    return participantsCount;
  }

  // getPoolInfo from pool contract
  public static async getPoolInfo(pool: string) {
    const poolContract = new ethers5.Contract(
      pool,
      Pool__factory.abi,
      AppConfig.PROVIDER
    );
    const poolInfo = await poolContract.getPoolInfo();
    return {
      tokenContract: poolInfo[0],
      poolReward: poolInfo[1],
      rewardDistributed: poolInfo[2],
      totalContributions: poolInfo[3],
      isRewardReceived: poolInfo[4],
      isDistributed: poolInfo[5],
    };
  }

  // Check if pool isActive from pool contract
  public static async isActive(pool: string) {
    const poolContract = new ethers5.Contract(
      pool,
      Pool__factory.abi,
      AppConfig.PROVIDER
    );
    const isActive = await poolContract.isPoolActive();
    return isActive;
  }

  // check if pool reward isDistributed from pool contract
  public static async isRewardDistributed(pool: string) {
    const poolContract = new ethers5.Contract(
      pool,
      Pool__factory.abi,
      AppConfig.PROVIDER
    );
    const isRewardDistributed = await poolContract.isDistributed();
    return isRewardDistributed;
  }

  // check if pool reward has been received
  public static async isRewardReceived(pool: string) {
    const poolContract = new ethers5.Contract(
      pool,
      Pool__factory.abi,
      AppConfig.PROVIDER
    );
    const isRewardReceived = await poolContract.isRewardReceived();
    return isRewardReceived;
  }

  // getPoolParticipants from pool contract, and fetch the participantData for each participant
  public static async getPoolParticipants(pool: string) {
    const poolContract = new ethers5.Contract(
      pool,
      Pool__factory.abi,
      AppConfig.PROVIDER
    );
    const participants = await poolContract.getParticipants();
    const participantData: { participant: any; participation: any }[] = [];
    for (const participant of participants) {
      const participation = await this.getParticipation(pool, participant);
      participantData.push({ participant, participation });
    }
    return participantData;
  }

  // getParticipation
  public static async getParticipation(pool: string, member: string) {
    const poolContract = new ethers5.Contract(
      pool,
      Pool__factory.abi,
      AppConfig.PROVIDER
    );
    const participation = await poolContract.participantData(member);
    return {
      participant: participation[0],
      contribution: participation[1],
      reward: participation[2],
      rewardAvailable: participation[3],
    };
  }
}
