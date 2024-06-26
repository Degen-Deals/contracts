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

export interface IDegenDealsERC6551RegistryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "account"
      | "createAccount"
      | "createDealAccount"
      | "dealAccountImplementations"
      | "dealAccounts"
      | "degenDeals"
      | "deriveCreateDealAccount"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "ERC6551AccountCreated"): EventFragment;

  encodeFunctionData(
    functionFragment: "account",
    values: [AddressLike, BytesLike, BigNumberish, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createAccount",
    values: [AddressLike, BytesLike, BigNumberish, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createDealAccount",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "dealAccountImplementations",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "dealAccounts",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "degenDeals",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deriveCreateDealAccount",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "account", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createDealAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dealAccountImplementations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dealAccounts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "degenDeals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deriveCreateDealAccount",
    data: BytesLike
  ): Result;
}

export namespace ERC6551AccountCreatedEvent {
  export type InputTuple = [
    account: AddressLike,
    implementation: AddressLike,
    salt: BytesLike,
    chainId: BigNumberish,
    tokenContract: AddressLike,
    tokenId: BigNumberish
  ];
  export type OutputTuple = [
    account: string,
    implementation: string,
    salt: string,
    chainId: bigint,
    tokenContract: string,
    tokenId: bigint
  ];
  export interface OutputObject {
    account: string;
    implementation: string;
    salt: string;
    chainId: bigint;
    tokenContract: string;
    tokenId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IDegenDealsERC6551Registry extends BaseContract {
  connect(runner?: ContractRunner | null): IDegenDealsERC6551Registry;
  waitForDeployment(): Promise<this>;

  interface: IDegenDealsERC6551RegistryInterface;

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

  account: TypedContractMethod<
    [
      implementation: AddressLike,
      salt: BytesLike,
      chainId: BigNumberish,
      tokenContract: AddressLike,
      tokenId: BigNumberish
    ],
    [string],
    "view"
  >;

  createAccount: TypedContractMethod<
    [
      implementation: AddressLike,
      salt: BytesLike,
      chainId: BigNumberish,
      tokenContract: AddressLike,
      tokenId: BigNumberish
    ],
    [string],
    "nonpayable"
  >;

  createDealAccount: TypedContractMethod<
    [dealId: BigNumberish, implementation: AddressLike],
    [string],
    "nonpayable"
  >;

  dealAccountImplementations: TypedContractMethod<
    [dealId: BigNumberish],
    [string],
    "view"
  >;

  dealAccounts: TypedContractMethod<[dealId: BigNumberish], [string], "view">;

  degenDeals: TypedContractMethod<[], [string], "view">;

  deriveCreateDealAccount: TypedContractMethod<
    [dealId: BigNumberish, splitDealId: BigNumberish],
    [string],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "account"
  ): TypedContractMethod<
    [
      implementation: AddressLike,
      salt: BytesLike,
      chainId: BigNumberish,
      tokenContract: AddressLike,
      tokenId: BigNumberish
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "createAccount"
  ): TypedContractMethod<
    [
      implementation: AddressLike,
      salt: BytesLike,
      chainId: BigNumberish,
      tokenContract: AddressLike,
      tokenId: BigNumberish
    ],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "createDealAccount"
  ): TypedContractMethod<
    [dealId: BigNumberish, implementation: AddressLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "dealAccountImplementations"
  ): TypedContractMethod<[dealId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "dealAccounts"
  ): TypedContractMethod<[dealId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "degenDeals"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "deriveCreateDealAccount"
  ): TypedContractMethod<
    [dealId: BigNumberish, splitDealId: BigNumberish],
    [string],
    "nonpayable"
  >;

  getEvent(
    key: "ERC6551AccountCreated"
  ): TypedContractEvent<
    ERC6551AccountCreatedEvent.InputTuple,
    ERC6551AccountCreatedEvent.OutputTuple,
    ERC6551AccountCreatedEvent.OutputObject
  >;

  filters: {
    "ERC6551AccountCreated(address,address,bytes32,uint256,address,uint256)": TypedContractEvent<
      ERC6551AccountCreatedEvent.InputTuple,
      ERC6551AccountCreatedEvent.OutputTuple,
      ERC6551AccountCreatedEvent.OutputObject
    >;
    ERC6551AccountCreated: TypedContractEvent<
      ERC6551AccountCreatedEvent.InputTuple,
      ERC6551AccountCreatedEvent.OutputTuple,
      ERC6551AccountCreatedEvent.OutputObject
    >;
  };
}
