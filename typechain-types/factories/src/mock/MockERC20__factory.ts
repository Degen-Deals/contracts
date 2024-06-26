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
  MockERC20,
  MockERC20Interface,
} from "../../../src/mock/MockERC20";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
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
    name: "ERC20InvalidApprover",
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
    name: "ERC20InvalidReceiver",
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
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
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
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
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
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "totalSupply",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600a81526020016904d6f636b2045524332360b41b815250604051806040016040528060038152602001624d434b60e81b8152508160039081620000629190620002d8565b506004620000718282620002d8565b505050600062000086620000b760201b60201c565b6200009390600a620004b9565b620000a290620f4240620004d1565b9050620000b03382620000bc565b5062000501565b601290565b6001600160a01b038216620000ec5760405163ec442f0560e01b8152600060048201526024015b60405180910390fd5b620000fa60008383620000fe565b5050565b6001600160a01b0383166200012d578060026000828254620001219190620004eb565b90915550620001a19050565b6001600160a01b03831660009081526020819052604090205481811015620001825760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401620000e3565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b038216620001bf57600280548290039055620001de565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516200022491815260200190565b60405180910390a3505050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200025c57607f821691505b6020821081036200027d57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002d3576000816000526020600020601f850160051c81016020861015620002ae5750805b601f850160051c820191505b81811015620002cf57828155600101620002ba565b5050505b505050565b81516001600160401b03811115620002f457620002f462000231565b6200030c8162000305845462000247565b8462000283565b602080601f8311600181146200034457600084156200032b5750858301515b600019600386901b1c1916600185901b178555620002cf565b600085815260208120601f198616915b82811015620003755788860151825594840194600190910190840162000354565b5085821015620003945787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115620003fb578160001904821115620003df57620003df620003a4565b80851615620003ed57918102915b93841c9390800290620003bf565b509250929050565b6000826200041457506001620004b3565b816200042357506000620004b3565b81600181146200043c5760028114620004475762000467565b6001915050620004b3565b60ff8411156200045b576200045b620003a4565b50506001821b620004b3565b5060208310610133831016604e8410600b84101617156200048c575081810a620004b3565b620004988383620003ba565b8060001904821115620004af57620004af620003a4565b0290505b92915050565b6000620004ca60ff84168362000403565b9392505050565b8082028115828204841417620004b357620004b3620003a4565b80820180821115620004b357620004b3620003a4565b61079e80620005116000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c806340c10f191161006657806340c10f191461011857806370a082311461012d57806395d89b4114610156578063a9059cbb1461015e578063dd62ed3e1461017157600080fd5b806306fdde03146100a3578063095ea7b3146100c157806318160ddd146100e457806323b872dd146100f6578063313ce56714610109575b600080fd5b6100ab6101aa565b6040516100b891906105e7565b60405180910390f35b6100d46100cf366004610652565b6101b9565b60405190151581526020016100b8565b6002545b6040519081526020016100b8565b6100d461010436600461067c565b6101d3565b604051601281526020016100b8565b61012b610126366004610652565b6101f7565b005b6100e861013b3660046106b8565b6001600160a01b031660009081526020819052604090205490565b6100ab610205565b6100d461016c366004610652565b61020f565b6100e861017f3660046106da565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606101b461021d565b905090565b6000336101c78185856102af565b60019150505b92915050565b6000336101e18582856102c1565b6101ec858585610344565b506001949350505050565b61020182826103a3565b5050565b60606101b46103d9565b6000336101c7818585610344565b60606003805461022c9061070d565b80601f01602080910402602001604051908101604052809291908181526020018280546102589061070d565b80156102a55780601f1061027a576101008083540402835291602001916102a5565b820191906000526020600020905b81548152906001019060200180831161028857829003601f168201915b5050505050905090565b6102bc83838360016103e8565b505050565b6001600160a01b03838116600090815260016020908152604080832093861683529290522054600019811461033e578181101561032f57604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064015b60405180910390fd5b61033e848484840360006103e8565b50505050565b6001600160a01b03831661036e57604051634b637e8f60e11b815260006004820152602401610326565b6001600160a01b0382166103985760405163ec442f0560e01b815260006004820152602401610326565b6102bc8383836104bd565b6001600160a01b0382166103cd5760405163ec442f0560e01b815260006004820152602401610326565b610201600083836104bd565b60606004805461022c9061070d565b6001600160a01b0384166104125760405163e602df0560e01b815260006004820152602401610326565b6001600160a01b03831661043c57604051634a1406b160e11b815260006004820152602401610326565b6001600160a01b038085166000908152600160209081526040808320938716835292905220829055801561033e57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516104af91815260200190565b60405180910390a350505050565b6001600160a01b0383166104e85780600260008282546104dd9190610747565b9091555061055a9050565b6001600160a01b0383166000908152602081905260409020548181101561053b5760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401610326565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b03821661057657600280548290039055610595565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516105da91815260200190565b60405180910390a3505050565b60006020808352835180602085015260005b81811015610615578581018301518582016040015282016105f9565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461064d57600080fd5b919050565b6000806040838503121561066557600080fd5b61066e83610636565b946020939093013593505050565b60008060006060848603121561069157600080fd5b61069a84610636565b92506106a860208501610636565b9150604084013590509250925092565b6000602082840312156106ca57600080fd5b6106d382610636565b9392505050565b600080604083850312156106ed57600080fd5b6106f683610636565b915061070460208401610636565b90509250929050565b600181811c9082168061072157607f821691505b60208210810361074157634e487b7160e01b600052602260045260246000fd5b50919050565b808201808211156101cd57634e487b7160e01b600052601160045260246000fdfea2646970667358221220a8b4646ad93aa0dacbe5cc8a83461f20118b41c2f81fe5782385d7c2591469b864736f6c63430008180033";

type MockERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockERC20__factory extends ContractFactory {
  constructor(...args: MockERC20ConstructorParams) {
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
      MockERC20 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MockERC20__factory {
    return super.connect(runner) as MockERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockERC20Interface {
    return new Interface(_abi) as MockERC20Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): MockERC20 {
    return new Contract(address, _abi, runner) as unknown as MockERC20;
  }
}
