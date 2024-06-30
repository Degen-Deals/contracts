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
} from "../../common";

export interface IDegenDealsERC6551AccountInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "arbitrage"
      | "deal"
      | "dealId"
      | "degenDeals"
      | "fund"
      | "initialize"
      | "isValidSigner"
      | "pay"
      | "resolve"
      | "state"
      | "token"
      | "transferObligee"
      | "transferObligor"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "arbitrage",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "deal", values: [BytesLike]): string;
  encodeFunctionData(functionFragment: "dealId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "degenDeals",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "fund", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidSigner",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "pay", values: [BytesLike]): string;
  encodeFunctionData(functionFragment: "resolve", values: [BytesLike]): string;
  encodeFunctionData(functionFragment: "state", values?: undefined): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferObligee",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferObligor",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "arbitrage", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "dealId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "degenDeals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fund", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isValidSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pay", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "resolve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "state", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferObligee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferObligor",
    data: BytesLike
  ): Result;
}

export interface IDegenDealsERC6551Account extends BaseContract {
  connect(runner?: ContractRunner | null): IDegenDealsERC6551Account;
  waitForDeployment(): Promise<this>;

  interface: IDegenDealsERC6551AccountInterface;

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

  arbitrage: TypedContractMethod<[data: BytesLike], [void], "nonpayable">;

  deal: TypedContractMethod<
    [data: BytesLike],
    [[boolean, boolean]],
    "nonpayable"
  >;

  dealId: TypedContractMethod<[], [bigint], "view">;

  degenDeals: TypedContractMethod<[], [string], "view">;

  fund: TypedContractMethod<[data: BytesLike], [void], "nonpayable">;

  initialize: TypedContractMethod<
    [
      entryPoint_: AddressLike,
      erc6551Registry_: AddressLike,
      dealId: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  isValidSigner: TypedContractMethod<
    [signer: AddressLike, context: BytesLike],
    [string],
    "view"
  >;

  pay: TypedContractMethod<[data: BytesLike], [void], "nonpayable">;

  resolve: TypedContractMethod<[data: BytesLike], [void], "nonpayable">;

  state: TypedContractMethod<[], [bigint], "view">;

  token: TypedContractMethod<
    [],
    [
      [bigint, string, bigint] & {
        chainId: bigint;
        tokenContract: string;
        tokenId: bigint;
      }
    ],
    "view"
  >;

  transferObligee: TypedContractMethod<[data: BytesLike], [void], "nonpayable">;

  transferObligor: TypedContractMethod<[data: BytesLike], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "arbitrage"
  ): TypedContractMethod<[data: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "deal"
  ): TypedContractMethod<[data: BytesLike], [[boolean, boolean]], "nonpayable">;
  getFunction(
    nameOrSignature: "dealId"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "degenDeals"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "fund"
  ): TypedContractMethod<[data: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [
      entryPoint_: AddressLike,
      erc6551Registry_: AddressLike,
      dealId: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "isValidSigner"
  ): TypedContractMethod<
    [signer: AddressLike, context: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "pay"
  ): TypedContractMethod<[data: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "resolve"
  ): TypedContractMethod<[data: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "state"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "token"
  ): TypedContractMethod<
    [],
    [
      [bigint, string, bigint] & {
        chainId: bigint;
        tokenContract: string;
        tokenId: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "transferObligee"
  ): TypedContractMethod<[data: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferObligor"
  ): TypedContractMethod<[data: BytesLike], [void], "nonpayable">;

  filters: {};
}
