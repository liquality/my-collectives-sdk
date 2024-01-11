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
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export interface CollectiveFactoryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "cWalletImplementation"
      | "collectiveImplementation"
      | "createCollective"
      | "createWallet"
      | "getCWallet"
      | "getCollective"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "cWalletImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "collectiveImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createCollective",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createWallet",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getCWallet",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getCollective",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "cWalletImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "collectiveImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createCollective",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getCWallet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCollective",
    data: BytesLike
  ): Result;
}

export interface CollectiveFactory extends BaseContract {
  connect(runner?: ContractRunner | null): CollectiveFactory;
  waitForDeployment(): Promise<this>;

  interface: CollectiveFactoryInterface;

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

  cWalletImplementation: TypedContractMethod<[], [string], "view">;

  collectiveImplementation: TypedContractMethod<[], [string], "view">;

  createCollective: TypedContractMethod<
    [_initiator: AddressLike, _operator: AddressLike, _salt: BigNumberish],
    [void],
    "nonpayable"
  >;

  createWallet: TypedContractMethod<
    [_initiator: AddressLike, _operator: AddressLike, _salt: BigNumberish],
    [string],
    "nonpayable"
  >;

  getCWallet: TypedContractMethod<
    [_collective: AddressLike, _operator: AddressLike, _salt: BigNumberish],
    [string],
    "view"
  >;

  getCollective: TypedContractMethod<
    [_initiator: AddressLike, _operator: AddressLike, _salt: BigNumberish],
    [string],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "cWalletImplementation"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "collectiveImplementation"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "createCollective"
  ): TypedContractMethod<
    [_initiator: AddressLike, _operator: AddressLike, _salt: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "createWallet"
  ): TypedContractMethod<
    [_initiator: AddressLike, _operator: AddressLike, _salt: BigNumberish],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getCWallet"
  ): TypedContractMethod<
    [_collective: AddressLike, _operator: AddressLike, _salt: BigNumberish],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getCollective"
  ): TypedContractMethod<
    [_initiator: AddressLike, _operator: AddressLike, _salt: BigNumberish],
    [string],
    "view"
  >;

  filters: {};
}