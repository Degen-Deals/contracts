/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IDegenDealsERC721,
  IDegenDealsERC721Interface,
} from "../../../src/interfaces/IDegenDealsERC721";

const _abi = [
  {
    inputs: [],
    name: "DealAccountArbitrageFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "DealAccountDealFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "DealAccountFundFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "DealAccountPaymentFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "DealAccountResolveFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "DealAccountTransferObligeeFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "DealAccountTransferObligorFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
    ],
    name: "DealUnderArbitrage",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "iteration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "period",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "periodShift",
        type: "int256",
      },
    ],
    name: "InvalidPeriodShift",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "NotDealSubjectOnDeal",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "NotDealSubjectOnPay",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "NotDealSubjectOnTransfer",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "obligee",
        type: "address",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "NotObligeeOfDeal",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
    ],
    name: "NotObligeeReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "obligor",
        type: "address",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "NotObligorOfDeal",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
    ],
    name: "NotPaymentToken",
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
        indexed: false,
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "subject",
        type: "address",
      },
    ],
    name: "Arbitrage",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
    ],
    name: "BatchMetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
    ],
    name: "Deal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "dealDiscountPercent",
        type: "uint256",
      },
    ],
    name: "Designate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newObligor",
        type: "address",
      },
    ],
    name: "Fund",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "obligor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "obligee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "dealAccount",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "offerHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "paymentAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "period",
        type: "uint256",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "obligee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "paymentAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "Pay",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
    ],
    name: "Resolve",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
    ],
    name: "Split",
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "prevObligee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newObligor",
        type: "address",
      },
    ],
    name: "TransferObligee",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "prevObligor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newObligor",
        type: "address",
      },
    ],
    name: "TransferObligor",
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
        name: "balance",
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
        name: "dealId",
        type: "uint256",
      },
    ],
    name: "calcFundAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "totalAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountWithDiscount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fundFee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "offerHash",
        type: "string",
      },
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "paymentAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "period",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "obligor",
        type: "address",
      },
      {
        internalType: "address",
        name: "erc6551Account",
        type: "address",
      },
    ],
    name: "create",
    outputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "dealAccount",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dealDiscountPercent_",
        type: "uint256",
      },
    ],
    name: "designate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "fund",
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
        name: "operator",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
    ],
    name: "getDeal",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "minter",
            type: "address",
          },
          {
            internalType: "address",
            name: "obligor",
            type: "address",
          },
          {
            internalType: "string",
            name: "offerHash",
            type: "string",
          },
          {
            internalType: "contract IERC20",
            name: "paymentToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "paymentAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "period",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "dealAccount",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "obligee",
            type: "address",
          },
          {
            internalType: "bool",
            name: "obligorDeal",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "beneficiaryDeal",
            type: "bool",
          },
          {
            internalType: "address",
            name: "arbitrator",
            type: "address",
          },
          {
            internalType: "enum IDegenDealsERC721.DealStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct IDegenDealsERC721.DealData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealIdFrom",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dealIdTo",
        type: "uint256",
      },
    ],
    name: "getDeals",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "minter",
            type: "address",
          },
          {
            internalType: "address",
            name: "obligor",
            type: "address",
          },
          {
            internalType: "string",
            name: "offerHash",
            type: "string",
          },
          {
            internalType: "contract IERC20",
            name: "paymentToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "paymentAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "period",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "dealAccount",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "obligee",
            type: "address",
          },
          {
            internalType: "bool",
            name: "obligorDeal",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "beneficiaryDeal",
            type: "bool",
          },
          {
            internalType: "address",
            name: "arbitrator",
            type: "address",
          },
          {
            internalType: "enum IDegenDealsERC721.DealStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct IDegenDealsERC721.DealData[]",
        name: "dealDatas",
        type: "tuple[]",
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
        internalType: "string",
        name: "offerHash",
        type: "string",
      },
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "principalAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "period",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "obligee",
        type: "address",
      },
      {
        internalType: "address",
        name: "erc6551Account",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "dealAccount",
        type: "address",
      },
    ],
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
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "pay",
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
      {
        internalType: "uint256",
        name: "salePrice",
        type: "uint256",
      },
    ],
    name: "royaltyInfo",
    outputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "royaltyAmount",
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
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "principalAmounts",
        type: "uint256[]",
      },
      {
        internalType: "int256[]",
        name: "periodShifts",
        type: "int256[]",
      },
    ],
    name: "split",
    outputs: [
      {
        internalType: "uint256",
        name: "splitDealIdFrom",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "splitDealIdTo",
        type: "uint256",
      },
    ],
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

export class IDegenDealsERC721__factory {
  static readonly abi = _abi;
  static createInterface(): IDegenDealsERC721Interface {
    return new Interface(_abi) as IDegenDealsERC721Interface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IDegenDealsERC721 {
    return new Contract(address, _abi, runner) as unknown as IDegenDealsERC721;
  }
}
