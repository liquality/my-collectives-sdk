/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface PoolInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "collective"
      | "distributeReward"
      | "getParticipants"
      | "getParticipantsCount"
      | "getPoolInfo"
      | "isDistributed"
      | "isPoolActive"
      | "isRewardReceived"
      | "participantData"
      | "participants"
      | "pause"
      | "paused"
      | "poolInitiator"
      | "poolReward"
      | "recordMint"
      | "rewardDistributed"
      | "tokenContract"
      | "totalContributions"
      | "unpause"
      | "withdrawERC20"
      | "withdrawNative"
      | "withdrawReward"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "NewMint"
      | "NewParticipant"
      | "Paused"
      | "RewardDistributed"
      | "RewardReceived"
      | "RewardWithdrawn"
      | "Unpaused"
      | "WithrawnToCollective"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "collective",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "distributeReward",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getParticipants",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getParticipantsCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolInfo",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isDistributed",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isPoolActive",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isRewardReceived",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "participantData",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "participants",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "poolInitiator",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "poolReward",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "recordMint",
    values: [AddressLike, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "rewardDistributed",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokenContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalContributions",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawERC20",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawNative",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawReward",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "collective", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "distributeReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getParticipants",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getParticipantsCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPoolInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isDistributed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isPoolActive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isRewardReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "participantData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "participants",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "poolInitiator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "poolReward", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "recordMint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rewardDistributed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalContributions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawNative",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawReward",
    data: BytesLike
  ): Result;
}

export namespace NewMintEvent {
  export type InputTuple = [
    participant: AddressLike,
    tokenID: BigNumberish,
    quantity: BigNumberish,
    amountPaid: BigNumberish
  ];
  export type OutputTuple = [
    participant: string,
    tokenID: bigint,
    quantity: bigint,
    amountPaid: bigint
  ];
  export interface OutputObject {
    participant: string;
    tokenID: bigint;
    quantity: bigint;
    amountPaid: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NewParticipantEvent {
  export type InputTuple = [participant: AddressLike];
  export type OutputTuple = [participant: string];
  export interface OutputObject {
    participant: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RewardDistributedEvent {
  export type InputTuple = [participant: AddressLike, amount: BigNumberish];
  export type OutputTuple = [participant: string, amount: bigint];
  export interface OutputObject {
    participant: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RewardReceivedEvent {
  export type InputTuple = [from: AddressLike, amount: BigNumberish];
  export type OutputTuple = [from: string, amount: bigint];
  export interface OutputObject {
    from: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RewardWithdrawnEvent {
  export type InputTuple = [participant: AddressLike, amount: BigNumberish];
  export type OutputTuple = [participant: string, amount: bigint];
  export interface OutputObject {
    participant: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnpausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace WithrawnToCollectiveEvent {
  export type InputTuple = [
    to: AddressLike,
    token: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [to: string, token: string, amount: bigint];
  export interface OutputObject {
    to: string;
    token: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Pool extends BaseContract {
  connect(runner?: ContractRunner | null): Pool;
  waitForDeployment(): Promise<this>;

  interface: PoolInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  collective: TypedContractMethod<[], [string], "view">;

  distributeReward: TypedContractMethod<[], [void], "nonpayable">;

  getParticipants: TypedContractMethod<[], [string[]], "view">;

  getParticipantsCount: TypedContractMethod<[], [bigint], "view">;

  getPoolInfo: TypedContractMethod<
    [],
    [
      [string, bigint, bigint, bigint, boolean, boolean] & {
        _tokenContract: string;
        _reward: bigint;
        _rewardDistributed: bigint;
        _totalContributions: bigint;
        _isRewardReceived: boolean;
        _isDistributed: boolean;
      }
    ],
    "view"
  >;

  isDistributed: TypedContractMethod<[], [boolean], "view">;

  isPoolActive: TypedContractMethod<[], [boolean], "view">;

  isRewardReceived: TypedContractMethod<[], [boolean], "view">;

  participantData: TypedContractMethod<
    [arg0: AddressLike],
    [
      [string, bigint, bigint, bigint] & {
        id: string;
        contribution: bigint;
        rewardedAmount: bigint;
        rewardAvailable: bigint;
      }
    ],
    "view"
  >;

  participants: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  pause: TypedContractMethod<[], [void], "nonpayable">;

  paused: TypedContractMethod<[], [boolean], "view">;

  poolInitiator: TypedContractMethod<[], [string], "view">;

  poolReward: TypedContractMethod<[], [bigint], "view">;

  recordMint: TypedContractMethod<
    [
      _participant: AddressLike,
      _tokenID: BigNumberish,
      _quantity: BigNumberish,
      _amountPaid: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  rewardDistributed: TypedContractMethod<[], [bigint], "view">;

  tokenContract: TypedContractMethod<[], [string], "view">;

  totalContributions: TypedContractMethod<[], [bigint], "view">;

  unpause: TypedContractMethod<[], [void], "nonpayable">;

  withdrawERC20: TypedContractMethod<
    [_tokenContract: AddressLike],
    [void],
    "nonpayable"
  >;

  withdrawNative: TypedContractMethod<[], [void], "nonpayable">;

  withdrawReward: TypedContractMethod<
    [_participant: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "collective"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "distributeReward"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getParticipants"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "getParticipantsCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getPoolInfo"
  ): TypedContractMethod<
    [],
    [
      [string, bigint, bigint, bigint, boolean, boolean] & {
        _tokenContract: string;
        _reward: bigint;
        _rewardDistributed: bigint;
        _totalContributions: bigint;
        _isRewardReceived: boolean;
        _isDistributed: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "isDistributed"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "isPoolActive"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "isRewardReceived"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "participantData"
  ): TypedContractMethod<
    [arg0: AddressLike],
    [
      [string, bigint, bigint, bigint] & {
        id: string;
        contribution: bigint;
        rewardedAmount: bigint;
        rewardAvailable: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "participants"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "pause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "paused"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "poolInitiator"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "poolReward"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "recordMint"
  ): TypedContractMethod<
    [
      _participant: AddressLike,
      _tokenID: BigNumberish,
      _quantity: BigNumberish,
      _amountPaid: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "rewardDistributed"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "tokenContract"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "totalContributions"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "unpause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawERC20"
  ): TypedContractMethod<[_tokenContract: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawNative"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawReward"
  ): TypedContractMethod<[_participant: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "NewMint"
  ): TypedContractEvent<
    NewMintEvent.InputTuple,
    NewMintEvent.OutputTuple,
    NewMintEvent.OutputObject
  >;
  getEvent(
    key: "NewParticipant"
  ): TypedContractEvent<
    NewParticipantEvent.InputTuple,
    NewParticipantEvent.OutputTuple,
    NewParticipantEvent.OutputObject
  >;
  getEvent(
    key: "Paused"
  ): TypedContractEvent<
    PausedEvent.InputTuple,
    PausedEvent.OutputTuple,
    PausedEvent.OutputObject
  >;
  getEvent(
    key: "RewardDistributed"
  ): TypedContractEvent<
    RewardDistributedEvent.InputTuple,
    RewardDistributedEvent.OutputTuple,
    RewardDistributedEvent.OutputObject
  >;
  getEvent(
    key: "RewardReceived"
  ): TypedContractEvent<
    RewardReceivedEvent.InputTuple,
    RewardReceivedEvent.OutputTuple,
    RewardReceivedEvent.OutputObject
  >;
  getEvent(
    key: "RewardWithdrawn"
  ): TypedContractEvent<
    RewardWithdrawnEvent.InputTuple,
    RewardWithdrawnEvent.OutputTuple,
    RewardWithdrawnEvent.OutputObject
  >;
  getEvent(
    key: "Unpaused"
  ): TypedContractEvent<
    UnpausedEvent.InputTuple,
    UnpausedEvent.OutputTuple,
    UnpausedEvent.OutputObject
  >;
  getEvent(
    key: "WithrawnToCollective"
  ): TypedContractEvent<
    WithrawnToCollectiveEvent.InputTuple,
    WithrawnToCollectiveEvent.OutputTuple,
    WithrawnToCollectiveEvent.OutputObject
  >;

  filters: {
    "NewMint(address,uint256,uint256,uint256)": TypedContractEvent<
      NewMintEvent.InputTuple,
      NewMintEvent.OutputTuple,
      NewMintEvent.OutputObject
    >;
    NewMint: TypedContractEvent<
      NewMintEvent.InputTuple,
      NewMintEvent.OutputTuple,
      NewMintEvent.OutputObject
    >;

    "NewParticipant(address)": TypedContractEvent<
      NewParticipantEvent.InputTuple,
      NewParticipantEvent.OutputTuple,
      NewParticipantEvent.OutputObject
    >;
    NewParticipant: TypedContractEvent<
      NewParticipantEvent.InputTuple,
      NewParticipantEvent.OutputTuple,
      NewParticipantEvent.OutputObject
    >;

    "Paused(address)": TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;
    Paused: TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;

    "RewardDistributed(address,uint256)": TypedContractEvent<
      RewardDistributedEvent.InputTuple,
      RewardDistributedEvent.OutputTuple,
      RewardDistributedEvent.OutputObject
    >;
    RewardDistributed: TypedContractEvent<
      RewardDistributedEvent.InputTuple,
      RewardDistributedEvent.OutputTuple,
      RewardDistributedEvent.OutputObject
    >;

    "RewardReceived(address,uint256)": TypedContractEvent<
      RewardReceivedEvent.InputTuple,
      RewardReceivedEvent.OutputTuple,
      RewardReceivedEvent.OutputObject
    >;
    RewardReceived: TypedContractEvent<
      RewardReceivedEvent.InputTuple,
      RewardReceivedEvent.OutputTuple,
      RewardReceivedEvent.OutputObject
    >;

    "RewardWithdrawn(address,uint256)": TypedContractEvent<
      RewardWithdrawnEvent.InputTuple,
      RewardWithdrawnEvent.OutputTuple,
      RewardWithdrawnEvent.OutputObject
    >;
    RewardWithdrawn: TypedContractEvent<
      RewardWithdrawnEvent.InputTuple,
      RewardWithdrawnEvent.OutputTuple,
      RewardWithdrawnEvent.OutputObject
    >;

    "Unpaused(address)": TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
    Unpaused: TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;

    "WithrawnToCollective(address,address,uint256)": TypedContractEvent<
      WithrawnToCollectiveEvent.InputTuple,
      WithrawnToCollectiveEvent.OutputTuple,
      WithrawnToCollectiveEvent.OutputObject
    >;
    WithrawnToCollective: TypedContractEvent<
      WithrawnToCollectiveEvent.InputTuple,
      WithrawnToCollectiveEvent.OutputTuple,
      WithrawnToCollectiveEvent.OutputObject
    >;
  };
}
