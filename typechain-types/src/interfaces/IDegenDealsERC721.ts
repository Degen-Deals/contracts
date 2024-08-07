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

export declare namespace IDegenDealsERC721 {
  export type DealDataStruct = {
    minter: AddressLike;
    obligor: AddressLike;
    offerHash: string;
    paymentToken: AddressLike;
    paymentAmount: BigNumberish;
    period: BigNumberish;
    dealAccount: AddressLike;
    deadline: BigNumberish;
    obligee: AddressLike;
    obligorDeal: boolean;
    beneficiaryDeal: boolean;
    arbitrator: AddressLike;
    status: BigNumberish;
  };

  export type DealDataStructOutput = [
    minter: string,
    obligor: string,
    offerHash: string,
    paymentToken: string,
    paymentAmount: bigint,
    period: bigint,
    dealAccount: string,
    deadline: bigint,
    obligee: string,
    obligorDeal: boolean,
    beneficiaryDeal: boolean,
    arbitrator: string,
    status: bigint
  ] & {
    minter: string;
    obligor: string;
    offerHash: string;
    paymentToken: string;
    paymentAmount: bigint;
    period: bigint;
    dealAccount: string;
    deadline: bigint;
    obligee: string;
    obligorDeal: boolean;
    beneficiaryDeal: boolean;
    arbitrator: string;
    status: bigint;
  };
}

export interface IDegenDealsERC721Interface extends Interface {
  getFunction(
    nameOrSignature:
      | "approve"
      | "balanceOf"
      | "calcFundAmount"
      | "create"
      | "designate"
      | "fund"
      | "getApproved"
      | "getDeal"
      | "getDeals"
      | "isApprovedForAll"
      | "mint"
      | "ownerOf"
      | "pay"
      | "royaltyInfo"
      | "safeTransferFrom(address,address,uint256)"
      | "safeTransferFrom(address,address,uint256,bytes)"
      | "setApprovalForAll"
      | "split"
      | "supportsInterface"
      | "transferFrom"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Approval"
      | "ApprovalForAll"
      | "Arbitrage"
      | "BatchMetadataUpdate"
      | "Deal"
      | "Designate"
      | "Fund"
      | "MetadataUpdate"
      | "Mint"
      | "Pay"
      | "Resolve"
      | "Split"
      | "Transfer"
      | "TransferObligee"
      | "TransferObligor"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "approve",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "calcFundAmount",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "create",
    values: [
      string,
      AddressLike,
      BigNumberish,
      BigNumberish,
      AddressLike,
      AddressLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "designate",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "fund",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getApproved",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getDeal",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getDeals",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [
      string,
      AddressLike,
      BigNumberish,
      BigNumberish,
      AddressLike,
      AddressLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "pay",
    values: [BigNumberish, AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "royaltyInfo",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom(address,address,uint256)",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom(address,address,uint256,bytes)",
    values: [AddressLike, AddressLike, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "split",
    values: [BigNumberish, BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calcFundAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "designate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fund", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getDeal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getDeals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pay", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "royaltyInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom(address,address,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom(address,address,uint256,bytes)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "split", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
}

export namespace ApprovalEvent {
  export type InputTuple = [
    owner: AddressLike,
    approved: AddressLike,
    tokenId: BigNumberish
  ];
  export type OutputTuple = [owner: string, approved: string, tokenId: bigint];
  export interface OutputObject {
    owner: string;
    approved: string;
    tokenId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ApprovalForAllEvent {
  export type InputTuple = [
    owner: AddressLike,
    operator: AddressLike,
    approved: boolean
  ];
  export type OutputTuple = [
    owner: string,
    operator: string,
    approved: boolean
  ];
  export interface OutputObject {
    owner: string;
    operator: string;
    approved: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ArbitrageEvent {
  export type InputTuple = [dealId: BigNumberish, subject: AddressLike];
  export type OutputTuple = [dealId: bigint, subject: string];
  export interface OutputObject {
    dealId: bigint;
    subject: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace BatchMetadataUpdateEvent {
  export type InputTuple = [
    _fromTokenId: BigNumberish,
    _toTokenId: BigNumberish
  ];
  export type OutputTuple = [_fromTokenId: bigint, _toTokenId: bigint];
  export interface OutputObject {
    _fromTokenId: bigint;
    _toTokenId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DealEvent {
  export type InputTuple = [dealId: BigNumberish];
  export type OutputTuple = [dealId: bigint];
  export interface OutputObject {
    dealId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DesignateEvent {
  export type InputTuple = [
    dealId: BigNumberish,
    dealDiscountPercent: BigNumberish
  ];
  export type OutputTuple = [dealId: bigint, dealDiscountPercent: bigint];
  export interface OutputObject {
    dealId: bigint;
    dealDiscountPercent: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FundEvent {
  export type InputTuple = [dealId: BigNumberish, newObligor: AddressLike];
  export type OutputTuple = [dealId: bigint, newObligor: string];
  export interface OutputObject {
    dealId: bigint;
    newObligor: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MetadataUpdateEvent {
  export type InputTuple = [_tokenId: BigNumberish];
  export type OutputTuple = [_tokenId: bigint];
  export interface OutputObject {
    _tokenId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MintEvent {
  export type InputTuple = [
    dealId: BigNumberish,
    obligor: AddressLike,
    obligee: AddressLike,
    dealAccount: AddressLike,
    offerHash: string,
    paymentToken: AddressLike,
    paymentAmount: BigNumberish,
    period: BigNumberish
  ];
  export type OutputTuple = [
    dealId: bigint,
    obligor: string,
    obligee: string,
    dealAccount: string,
    offerHash: string,
    paymentToken: string,
    paymentAmount: bigint,
    period: bigint
  ];
  export interface OutputObject {
    dealId: bigint;
    obligor: string;
    obligee: string;
    dealAccount: string;
    offerHash: string;
    paymentToken: string;
    paymentAmount: bigint;
    period: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PayEvent {
  export type InputTuple = [
    dealId: BigNumberish,
    obligee: AddressLike,
    token: AddressLike,
    paymentAmount: BigNumberish,
    receiver: AddressLike
  ];
  export type OutputTuple = [
    dealId: bigint,
    obligee: string,
    token: string,
    paymentAmount: bigint,
    receiver: string
  ];
  export interface OutputObject {
    dealId: bigint;
    obligee: string;
    token: string;
    paymentAmount: bigint;
    receiver: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ResolveEvent {
  export type InputTuple = [dealId: BigNumberish];
  export type OutputTuple = [dealId: bigint];
  export interface OutputObject {
    dealId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SplitEvent {
  export type InputTuple = [dealId: BigNumberish];
  export type OutputTuple = [dealId: bigint];
  export interface OutputObject {
    dealId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    from: AddressLike,
    to: AddressLike,
    tokenId: BigNumberish
  ];
  export type OutputTuple = [from: string, to: string, tokenId: bigint];
  export interface OutputObject {
    from: string;
    to: string;
    tokenId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferObligeeEvent {
  export type InputTuple = [
    dealId: BigNumberish,
    prevObligee: AddressLike,
    newObligor: AddressLike
  ];
  export type OutputTuple = [
    dealId: bigint,
    prevObligee: string,
    newObligor: string
  ];
  export interface OutputObject {
    dealId: bigint;
    prevObligee: string;
    newObligor: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferObligorEvent {
  export type InputTuple = [
    dealId: BigNumberish,
    prevObligor: AddressLike,
    newObligor: AddressLike
  ];
  export type OutputTuple = [
    dealId: bigint,
    prevObligor: string,
    newObligor: string
  ];
  export interface OutputObject {
    dealId: bigint;
    prevObligor: string;
    newObligor: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IDegenDealsERC721 extends BaseContract {
  connect(runner?: ContractRunner | null): IDegenDealsERC721;
  waitForDeployment(): Promise<this>;

  interface: IDegenDealsERC721Interface;

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

  approve: TypedContractMethod<
    [to: AddressLike, tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;

  balanceOf: TypedContractMethod<[owner: AddressLike], [bigint], "view">;

  calcFundAmount: TypedContractMethod<
    [dealId: BigNumberish],
    [
      [bigint, bigint, bigint] & {
        totalAmount: bigint;
        amountWithDiscount: bigint;
        fundFee: bigint;
      }
    ],
    "view"
  >;

  create: TypedContractMethod<
    [
      offerHash: string,
      paymentToken: AddressLike,
      paymentAmount: BigNumberish,
      period: BigNumberish,
      obligor: AddressLike,
      erc6551Account: AddressLike
    ],
    [[bigint, string] & { dealId: bigint; dealAccount: string }],
    "nonpayable"
  >;

  designate: TypedContractMethod<
    [dealId: BigNumberish, dealDiscountPercent_: BigNumberish],
    [void],
    "nonpayable"
  >;

  fund: TypedContractMethod<
    [dealId: BigNumberish, data: BytesLike],
    [void],
    "nonpayable"
  >;

  getApproved: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;

  getDeal: TypedContractMethod<
    [dealId: BigNumberish],
    [IDegenDealsERC721.DealDataStructOutput],
    "view"
  >;

  getDeals: TypedContractMethod<
    [dealIdFrom: BigNumberish, dealIdTo: BigNumberish],
    [IDegenDealsERC721.DealDataStructOutput[]],
    "view"
  >;

  isApprovedForAll: TypedContractMethod<
    [owner: AddressLike, operator: AddressLike],
    [boolean],
    "view"
  >;

  mint: TypedContractMethod<
    [
      offerHash: string,
      paymentToken: AddressLike,
      principalAmount: BigNumberish,
      period: BigNumberish,
      obligee: AddressLike,
      erc6551Account: AddressLike
    ],
    [[bigint, string] & { dealId: bigint; dealAccount: string }],
    "nonpayable"
  >;

  ownerOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;

  pay: TypedContractMethod<
    [dealId: BigNumberish, beneficiary: AddressLike, data: BytesLike],
    [void],
    "nonpayable"
  >;

  royaltyInfo: TypedContractMethod<
    [tokenId: BigNumberish, salePrice: BigNumberish],
    [[string, bigint] & { receiver: string; royaltyAmount: bigint }],
    "view"
  >;

  "safeTransferFrom(address,address,uint256)": TypedContractMethod<
    [from: AddressLike, to: AddressLike, tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;

  "safeTransferFrom(address,address,uint256,bytes)": TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      tokenId: BigNumberish,
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  setApprovalForAll: TypedContractMethod<
    [operator: AddressLike, approved: boolean],
    [void],
    "nonpayable"
  >;

  split: TypedContractMethod<
    [
      dealId: BigNumberish,
      principalAmounts: BigNumberish[],
      periodShifts: BigNumberish[]
    ],
    [[bigint, bigint] & { splitDealIdFrom: bigint; splitDealIdTo: bigint }],
    "nonpayable"
  >;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  transferFrom: TypedContractMethod<
    [from: AddressLike, to: AddressLike, tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "approve"
  ): TypedContractMethod<
    [to: AddressLike, tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "calcFundAmount"
  ): TypedContractMethod<
    [dealId: BigNumberish],
    [
      [bigint, bigint, bigint] & {
        totalAmount: bigint;
        amountWithDiscount: bigint;
        fundFee: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "create"
  ): TypedContractMethod<
    [
      offerHash: string,
      paymentToken: AddressLike,
      paymentAmount: BigNumberish,
      period: BigNumberish,
      obligor: AddressLike,
      erc6551Account: AddressLike
    ],
    [[bigint, string] & { dealId: bigint; dealAccount: string }],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "designate"
  ): TypedContractMethod<
    [dealId: BigNumberish, dealDiscountPercent_: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fund"
  ): TypedContractMethod<
    [dealId: BigNumberish, data: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getApproved"
  ): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "getDeal"
  ): TypedContractMethod<
    [dealId: BigNumberish],
    [IDegenDealsERC721.DealDataStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getDeals"
  ): TypedContractMethod<
    [dealIdFrom: BigNumberish, dealIdTo: BigNumberish],
    [IDegenDealsERC721.DealDataStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "isApprovedForAll"
  ): TypedContractMethod<
    [owner: AddressLike, operator: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "mint"
  ): TypedContractMethod<
    [
      offerHash: string,
      paymentToken: AddressLike,
      principalAmount: BigNumberish,
      period: BigNumberish,
      obligee: AddressLike,
      erc6551Account: AddressLike
    ],
    [[bigint, string] & { dealId: bigint; dealAccount: string }],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "ownerOf"
  ): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "pay"
  ): TypedContractMethod<
    [dealId: BigNumberish, beneficiary: AddressLike, data: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "royaltyInfo"
  ): TypedContractMethod<
    [tokenId: BigNumberish, salePrice: BigNumberish],
    [[string, bigint] & { receiver: string; royaltyAmount: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "safeTransferFrom(address,address,uint256)"
  ): TypedContractMethod<
    [from: AddressLike, to: AddressLike, tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "safeTransferFrom(address,address,uint256,bytes)"
  ): TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      tokenId: BigNumberish,
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setApprovalForAll"
  ): TypedContractMethod<
    [operator: AddressLike, approved: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "split"
  ): TypedContractMethod<
    [
      dealId: BigNumberish,
      principalAmounts: BigNumberish[],
      periodShifts: BigNumberish[]
    ],
    [[bigint, bigint] & { splitDealIdFrom: bigint; splitDealIdTo: bigint }],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "transferFrom"
  ): TypedContractMethod<
    [from: AddressLike, to: AddressLike, tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "Approval"
  ): TypedContractEvent<
    ApprovalEvent.InputTuple,
    ApprovalEvent.OutputTuple,
    ApprovalEvent.OutputObject
  >;
  getEvent(
    key: "ApprovalForAll"
  ): TypedContractEvent<
    ApprovalForAllEvent.InputTuple,
    ApprovalForAllEvent.OutputTuple,
    ApprovalForAllEvent.OutputObject
  >;
  getEvent(
    key: "Arbitrage"
  ): TypedContractEvent<
    ArbitrageEvent.InputTuple,
    ArbitrageEvent.OutputTuple,
    ArbitrageEvent.OutputObject
  >;
  getEvent(
    key: "BatchMetadataUpdate"
  ): TypedContractEvent<
    BatchMetadataUpdateEvent.InputTuple,
    BatchMetadataUpdateEvent.OutputTuple,
    BatchMetadataUpdateEvent.OutputObject
  >;
  getEvent(
    key: "Deal"
  ): TypedContractEvent<
    DealEvent.InputTuple,
    DealEvent.OutputTuple,
    DealEvent.OutputObject
  >;
  getEvent(
    key: "Designate"
  ): TypedContractEvent<
    DesignateEvent.InputTuple,
    DesignateEvent.OutputTuple,
    DesignateEvent.OutputObject
  >;
  getEvent(
    key: "Fund"
  ): TypedContractEvent<
    FundEvent.InputTuple,
    FundEvent.OutputTuple,
    FundEvent.OutputObject
  >;
  getEvent(
    key: "MetadataUpdate"
  ): TypedContractEvent<
    MetadataUpdateEvent.InputTuple,
    MetadataUpdateEvent.OutputTuple,
    MetadataUpdateEvent.OutputObject
  >;
  getEvent(
    key: "Mint"
  ): TypedContractEvent<
    MintEvent.InputTuple,
    MintEvent.OutputTuple,
    MintEvent.OutputObject
  >;
  getEvent(
    key: "Pay"
  ): TypedContractEvent<
    PayEvent.InputTuple,
    PayEvent.OutputTuple,
    PayEvent.OutputObject
  >;
  getEvent(
    key: "Resolve"
  ): TypedContractEvent<
    ResolveEvent.InputTuple,
    ResolveEvent.OutputTuple,
    ResolveEvent.OutputObject
  >;
  getEvent(
    key: "Split"
  ): TypedContractEvent<
    SplitEvent.InputTuple,
    SplitEvent.OutputTuple,
    SplitEvent.OutputObject
  >;
  getEvent(
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;
  getEvent(
    key: "TransferObligee"
  ): TypedContractEvent<
    TransferObligeeEvent.InputTuple,
    TransferObligeeEvent.OutputTuple,
    TransferObligeeEvent.OutputObject
  >;
  getEvent(
    key: "TransferObligor"
  ): TypedContractEvent<
    TransferObligorEvent.InputTuple,
    TransferObligorEvent.OutputTuple,
    TransferObligorEvent.OutputObject
  >;

  filters: {
    "Approval(address,address,uint256)": TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;
    Approval: TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;

    "ApprovalForAll(address,address,bool)": TypedContractEvent<
      ApprovalForAllEvent.InputTuple,
      ApprovalForAllEvent.OutputTuple,
      ApprovalForAllEvent.OutputObject
    >;
    ApprovalForAll: TypedContractEvent<
      ApprovalForAllEvent.InputTuple,
      ApprovalForAllEvent.OutputTuple,
      ApprovalForAllEvent.OutputObject
    >;

    "Arbitrage(uint256,address)": TypedContractEvent<
      ArbitrageEvent.InputTuple,
      ArbitrageEvent.OutputTuple,
      ArbitrageEvent.OutputObject
    >;
    Arbitrage: TypedContractEvent<
      ArbitrageEvent.InputTuple,
      ArbitrageEvent.OutputTuple,
      ArbitrageEvent.OutputObject
    >;

    "BatchMetadataUpdate(uint256,uint256)": TypedContractEvent<
      BatchMetadataUpdateEvent.InputTuple,
      BatchMetadataUpdateEvent.OutputTuple,
      BatchMetadataUpdateEvent.OutputObject
    >;
    BatchMetadataUpdate: TypedContractEvent<
      BatchMetadataUpdateEvent.InputTuple,
      BatchMetadataUpdateEvent.OutputTuple,
      BatchMetadataUpdateEvent.OutputObject
    >;

    "Deal(uint256)": TypedContractEvent<
      DealEvent.InputTuple,
      DealEvent.OutputTuple,
      DealEvent.OutputObject
    >;
    Deal: TypedContractEvent<
      DealEvent.InputTuple,
      DealEvent.OutputTuple,
      DealEvent.OutputObject
    >;

    "Designate(uint256,uint256)": TypedContractEvent<
      DesignateEvent.InputTuple,
      DesignateEvent.OutputTuple,
      DesignateEvent.OutputObject
    >;
    Designate: TypedContractEvent<
      DesignateEvent.InputTuple,
      DesignateEvent.OutputTuple,
      DesignateEvent.OutputObject
    >;

    "Fund(uint256,address)": TypedContractEvent<
      FundEvent.InputTuple,
      FundEvent.OutputTuple,
      FundEvent.OutputObject
    >;
    Fund: TypedContractEvent<
      FundEvent.InputTuple,
      FundEvent.OutputTuple,
      FundEvent.OutputObject
    >;

    "MetadataUpdate(uint256)": TypedContractEvent<
      MetadataUpdateEvent.InputTuple,
      MetadataUpdateEvent.OutputTuple,
      MetadataUpdateEvent.OutputObject
    >;
    MetadataUpdate: TypedContractEvent<
      MetadataUpdateEvent.InputTuple,
      MetadataUpdateEvent.OutputTuple,
      MetadataUpdateEvent.OutputObject
    >;

    "Mint(uint256,address,address,address,string,address,uint256,uint256)": TypedContractEvent<
      MintEvent.InputTuple,
      MintEvent.OutputTuple,
      MintEvent.OutputObject
    >;
    Mint: TypedContractEvent<
      MintEvent.InputTuple,
      MintEvent.OutputTuple,
      MintEvent.OutputObject
    >;

    "Pay(uint256,address,address,uint256,address)": TypedContractEvent<
      PayEvent.InputTuple,
      PayEvent.OutputTuple,
      PayEvent.OutputObject
    >;
    Pay: TypedContractEvent<
      PayEvent.InputTuple,
      PayEvent.OutputTuple,
      PayEvent.OutputObject
    >;

    "Resolve(uint256)": TypedContractEvent<
      ResolveEvent.InputTuple,
      ResolveEvent.OutputTuple,
      ResolveEvent.OutputObject
    >;
    Resolve: TypedContractEvent<
      ResolveEvent.InputTuple,
      ResolveEvent.OutputTuple,
      ResolveEvent.OutputObject
    >;

    "Split(uint256)": TypedContractEvent<
      SplitEvent.InputTuple,
      SplitEvent.OutputTuple,
      SplitEvent.OutputObject
    >;
    Split: TypedContractEvent<
      SplitEvent.InputTuple,
      SplitEvent.OutputTuple,
      SplitEvent.OutputObject
    >;

    "Transfer(address,address,uint256)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;

    "TransferObligee(uint256,address,address)": TypedContractEvent<
      TransferObligeeEvent.InputTuple,
      TransferObligeeEvent.OutputTuple,
      TransferObligeeEvent.OutputObject
    >;
    TransferObligee: TypedContractEvent<
      TransferObligeeEvent.InputTuple,
      TransferObligeeEvent.OutputTuple,
      TransferObligeeEvent.OutputObject
    >;

    "TransferObligor(uint256,address,address)": TypedContractEvent<
      TransferObligorEvent.InputTuple,
      TransferObligorEvent.OutputTuple,
      TransferObligorEvent.OutputObject
    >;
    TransferObligor: TypedContractEvent<
      TransferObligorEvent.InputTuple,
      TransferObligorEvent.OutputTuple,
      TransferObligorEvent.OutputObject
    >;
  };
}
