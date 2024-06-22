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
import type { NonPayableOverrides } from "../../common";
import type {
  DegenDealsERC6551Registry,
  DegenDealsERC6551RegistryInterface,
} from "../../src/DegenDealsERC6551Registry";

const _abi = [
  {
    inputs: [],
    name: "AccountCreationFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "msgSender",
        type: "address",
      },
      {
        internalType: "address",
        name: "degenDeals",
        type: "address",
      },
    ],
    name: "CallerNotDegenDeals",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
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
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC6551AccountCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "account",
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
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "createAccount",
    outputs: [
      {
        internalType: "address",
        name: "",
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
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "createDealAccount",
    outputs: [
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
    ],
    name: "dealAccountImplementations",
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
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
    ],
    name: "dealAccounts",
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
    name: "degenDeals",
    outputs: [
      {
        internalType: "contract IDegenDealsERC721",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "degenDealsERC6551Account",
    outputs: [
      {
        internalType: "contract IDegenDealsERC6551Account",
        name: "",
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
        internalType: "uint256",
        name: "splitDealId",
        type: "uint256",
      },
    ],
    name: "deriveCreateDealAccount",
    outputs: [
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
    inputs: [],
    name: "entryPoint",
    outputs: [
      {
        internalType: "contract IEntryPoint",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "degenDeals_",
        type: "address",
      },
      {
        internalType: "address",
        name: "degenDealsERC6551Account_",
        type: "address",
      },
      {
        internalType: "address",
        name: "entryPoint_",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    inputs: [
      {
        internalType: "address",
        name: "degenDealsERC6551Account_",
        type: "address",
      },
    ],
    name: "setDegenDealsERC6551Account",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "entryPoint_",
        type: "address",
      },
    ],
    name: "setEntryPoint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610e6f806100206000396000f3fe60806040523480156200001157600080fd5b5060043610620000e05760003560e01c80638a54c52f1162000097578063b0d691fe116200006e578063b0d691fe14620001de578063c0c53b8b14620001f2578063c30503051462000209578063d8a5f8ea146200023557600080fd5b80638a54c52f146200019c5780638da5cb5b14620001b3578063a14ed6c314620001c757600080fd5b80630a8750e314620000e55780632177b29014620000fe578063246a0021146200012e578063584465f214620001455780637c7692b7146200015c5780637f76ad031462000188575b600080fd5b620000fc620000f63660046200085c565b6200024c565b005b60015462000112906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b620001126200013f36600462000881565b620002a4565b620000fc620001563660046200085c565b62000308565b620001126200016d366004620008d4565b6005602052600090815260409020546001600160a01b031681565b60005462000112906001600160a01b031681565b62000112620001ad36600462000881565b62000357565b60035462000112906001600160a01b031681565b62000112620001d8366004620008ee565b620003b3565b60025462000112906001600160a01b031681565b620000fc620002033660046200091d565b620004f0565b620001126200021a366004620008d4565b6004602052600090815260409020546001600160a01b031681565b620001126200024636600462000967565b62000645565b6003546001600160a01b03163314620002825760405162461bcd60e51b815260040162000279906200098a565b60405180910390fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b600060806024608c376e5af43d82803e903d91602b57fd5bf3606c5285605d52733d60ad80600a3d3981f3363d3d373d3d3d363d7360495260b7605520603552846015523060601b60015260ff600053605560002060601b60601c60005260206000f35b6003546001600160a01b03163314620003355760405162461bcd60e51b815260040162000279906200098a565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b600080546001600160a01b031633146200039a5760005460405163e9e4b08d60e01b81523360048201526001600160a01b03909116602482015260440162000279565b620003a9868686868662000775565b9695505050505050565b600080546001600160a01b03163314620003f65760005460405163e9e4b08d60e01b81523360048201526001600160a01b03909116602482015260440162000279565b6001600160a01b03821662000414576001546001600160a01b031691505b6002546040516001600160a01b0390911660248201523060448201526064810184905260009060840160408051601f198184030181529181526020820180516001600160e01b03166305e52ecf60e21b17905251909150839082906200047a9062000831565b62000487929190620009ce565b604051809103906000f080158015620004a4573d6000803e3d6000fd5b50600094855260056020908152604080872080546001600160a01b03199081166001600160a01b0398891617909155600490925290952080549095169381169390931790935550919050565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff16600081158015620005375750825b905060008267ffffffffffffffff166001148015620005555750303b155b90508115801562000564575080155b15620005835760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315620005ae57845460ff60401b1916600160401b1785555b60038054336001600160a01b0319918216179091556000805482166001600160a01b038b8116919091179091556001805483168a83161790556002805490921690881617905583156200063b57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b5050505050505050565b600080546001600160a01b03163314620006885760005460405163e9e4b08d60e01b81523360048201526001600160a01b03909116602482015260440162000279565b6000838152600560205260408082205460025491516001600160a01b039283166024820152306044820152606481018790529116919060840160408051601f198184030181529181526020820180516001600160e01b03166305e52ecf60e21b1790525190915082908290620006fe9062000831565b6200070b929190620009ce565b604051809103906000f08015801562000728573d6000803e3d6000fd5b50600094855260056020908152604080872080546001600160a01b03199081166001600160a01b039788161790915560049092529095208054909516928116929092179093559392505050565b600060806024608c376e5af43d82803e903d91602b57fd5bf3606c5285605d52733d60ad80600a3d3981f3363d3d373d3d3d363d7360495260b7605520603552846015523060601b60015260ff6000536055600020803b62000821578560b760556000f580620007ed576320188a596000526004601cfd5b80606c52508284887f79f19b3655ee38b1ce526556b7731a20c8f218fbda4a3990b6cc4172fdf887226060606ca46020606cf35b8060601b60601c60005260206000f35b61040a8062000a3083390190565b80356001600160a01b03811681146200085757600080fd5b919050565b6000602082840312156200086f57600080fd5b6200087a826200083f565b9392505050565b600080600080600060a086880312156200089a57600080fd5b620008a5866200083f565b94506020860135935060408601359250620008c3606087016200083f565b949793965091946080013592915050565b600060208284031215620008e757600080fd5b5035919050565b600080604083850312156200090257600080fd5b8235915062000914602084016200083f565b90509250929050565b6000806000606084860312156200093357600080fd5b6200093e846200083f565b92506200094e602085016200083f565b91506200095e604085016200083f565b90509250925092565b600080604083850312156200097b57600080fd5b50508035926020909101359150565b60208082526024908201527f446567656e4465616c734552433635353152656769737472793a206e6f74206f6040820152633bb732b960e11b606082015260800190565b60018060a01b03831681526000602060406020840152835180604085015260005b8181101562000a0d57858101830151858201606001528201620009ef565b506000606082860101526060601f19601f83011685010192505050939250505056fe608060405260405161040a38038061040a83398101604081905261002291610268565b61002c8282610033565b5050610352565b61003c82610092565b6040516001600160a01b038316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a280511561008657610081828261010e565b505050565b61008e610185565b5050565b806001600160a01b03163b6000036100cd57604051634c9c8ce360e01b81526001600160a01b03821660048201526024015b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80546001600160a01b0319166001600160a01b0392909216919091179055565b6060600080846001600160a01b03168460405161012b9190610336565b600060405180830381855af49150503d8060008114610166576040519150601f19603f3d011682016040523d82523d6000602084013e61016b565b606091505b50909250905061017c8583836101a6565b95945050505050565b34156101a45760405163b398979f60e01b815260040160405180910390fd5b565b6060826101bb576101b682610205565b6101fe565b81511580156101d257506001600160a01b0384163b155b156101fb57604051639996b31560e01b81526001600160a01b03851660048201526024016100c4565b50805b9392505050565b8051156102155780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b634e487b7160e01b600052604160045260246000fd5b60005b8381101561025f578181015183820152602001610247565b50506000910152565b6000806040838503121561027b57600080fd5b82516001600160a01b038116811461029257600080fd5b60208401519092506001600160401b03808211156102af57600080fd5b818501915085601f8301126102c357600080fd5b8151818111156102d5576102d561022e565b604051601f8201601f19908116603f011681019083821181831017156102fd576102fd61022e565b8160405282815288602084870101111561031657600080fd5b610327836020830160208801610244565b80955050505050509250929050565b60008251610348818460208701610244565b9190910192915050565b60aa806103606000396000f3fe6080604052600a600c565b005b60186014601a565b6051565b565b6000604c7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b905090565b3660008037600080366000845af43d6000803e808015606f573d6000f35b3d6000fdfea2646970667358221220bd42728c374f7f0ddc17b53ec61cdb40d51094c5fa601cbd894add86d0771b8264736f6c63430008180033a264697066735822122020ae291c11f0c85a5a65a1ddc3b02edf0e4fec47030fe60d6a6a24f63116c72a64736f6c63430008180033";

type DegenDealsERC6551RegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DegenDealsERC6551RegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DegenDealsERC6551Registry__factory extends ContractFactory {
  constructor(...args: DegenDealsERC6551RegistryConstructorParams) {
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
      DegenDealsERC6551Registry & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): DegenDealsERC6551Registry__factory {
    return super.connect(runner) as DegenDealsERC6551Registry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DegenDealsERC6551RegistryInterface {
    return new Interface(_abi) as DegenDealsERC6551RegistryInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): DegenDealsERC6551Registry {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as DegenDealsERC6551Registry;
  }
}