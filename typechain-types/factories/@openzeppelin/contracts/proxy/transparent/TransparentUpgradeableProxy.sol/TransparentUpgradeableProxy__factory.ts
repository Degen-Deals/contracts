/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BytesLike,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { PayableOverrides } from "../../../../../../common";
import type {
  TransparentUpgradeableProxy,
  TransparentUpgradeableProxyInterface,
} from "../../../../../../@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol/TransparentUpgradeableProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_logic",
        type: "address",
      },
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "ERC1967InvalidAdmin",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [],
    name: "ProxyDeniedAdminAccess",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
] as const;

const _bytecode =
  "0x60a060405260405162000eb138038062000eb18339810160408190526200002691620003cd565b82816200003482826200009c565b505081604051620000459062000366565b6001600160a01b039091168152602001604051809103906000f08015801562000072573d6000803e3d6000fd5b506001600160a01b0316608052620000936200008d60805190565b62000102565b505050620004cb565b620000a78262000174565b6040516001600160a01b038316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a2805115620000f457620000ef8282620001f4565b505050565b620000fe62000271565b5050565b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f6200014460008051602062000e91833981519152546001600160a01b031690565b604080516001600160a01b03928316815291841660208301520160405180910390a1620001718162000293565b50565b806001600160a01b03163b600003620001b057604051634c9c8ce360e01b81526001600160a01b03821660048201526024015b60405180910390fd5b807f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5b80546001600160a01b0319166001600160a01b039290921691909117905550565b6060600080846001600160a01b031684604051620002139190620004ad565b600060405180830381855af49150503d806000811462000250576040519150601f19603f3d011682016040523d82523d6000602084013e62000255565b606091505b50909250905062000268858383620002d6565b95945050505050565b3415620002915760405163b398979f60e01b815260040160405180910390fd5b565b6001600160a01b038116620002bf57604051633173bdd160e11b815260006004820152602401620001a7565b8060008051602062000e91833981519152620001d3565b606082620002ef57620002e9826200033c565b62000335565b81511580156200030757506001600160a01b0384163b155b156200033257604051639996b31560e01b81526001600160a01b0385166004820152602401620001a7565b50805b9392505050565b8051156200034d5780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b610524806200096d83390190565b80516001600160a01b03811681146200038c57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b83811015620003c4578181015183820152602001620003aa565b50506000910152565b600080600060608486031215620003e357600080fd5b620003ee8462000374565b9250620003fe6020850162000374565b60408501519092506001600160401b03808211156200041c57600080fd5b818601915086601f8301126200043157600080fd5b81518181111562000446576200044662000391565b604051601f8201601f19908116603f0116810190838211818310171562000471576200047162000391565b816040528281528960208487010111156200048b57600080fd5b6200049e836020830160208801620003a7565b80955050505050509250925092565b60008251620004c1818460208701620003a7565b9190910192915050565b608051610487620004e66000396000601001526104876000f3fe608060405261000c61000e565b005b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316330361007b576000356001600160e01b03191663278f794360e11b14610071576040516334ad5dbb60e21b815260040160405180910390fd5b610079610083565b565b6100796100b2565b6000806100933660048184610312565b8101906100a09190610352565b915091506100ae82826100c2565b5050565b6100796100bd61011d565b610155565b6100cb82610179565b6040516001600160a01b038316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a28051156101155761011082826101f5565b505050565b6100ae61026b565b60006101507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b905090565b3660008037600080366000845af43d6000803e808015610174573d6000f35b3d6000fd5b806001600160a01b03163b6000036101b457604051634c9c8ce360e01b81526001600160a01b03821660048201526024015b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80546001600160a01b0319166001600160a01b0392909216919091179055565b6060600080846001600160a01b0316846040516102129190610422565b600060405180830381855af49150503d806000811461024d576040519150601f19603f3d011682016040523d82523d6000602084013e610252565b606091505b509150915061026285838361028a565b95945050505050565b34156100795760405163b398979f60e01b815260040160405180910390fd5b60608261029f5761029a826102e9565b6102e2565b81511580156102b657506001600160a01b0384163b155b156102df57604051639996b31560e01b81526001600160a01b03851660048201526024016101ab565b50805b9392505050565b8051156102f95780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b6000808585111561032257600080fd5b8386111561032f57600080fd5b5050820193919092039150565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561036557600080fd5b82356001600160a01b038116811461037c57600080fd5b9150602083013567ffffffffffffffff8082111561039957600080fd5b818501915085601f8301126103ad57600080fd5b8135818111156103bf576103bf61033c565b604051601f8201601f19908116603f011681019083821181831017156103e7576103e761033c565b8160405282815288602084870101111561040057600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b6000825160005b818110156104435760208186018101518583015201610429565b50600092019182525091905056fea2646970667358221220947e0a1ded970813b78f19358c6b3a1fbfd998f79756b5caa23ff5a68d62528564736f6c63430008180033608060405234801561001057600080fd5b5060405161052438038061052483398101604081905261002f916100be565b806001600160a01b03811661005e57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b6100678161006e565b50506100ee565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100d057600080fd5b81516001600160a01b03811681146100e757600080fd5b9392505050565b610427806100fd6000396000f3fe60806040526004361061004a5760003560e01c8063715018a61461004f5780638da5cb5b146100665780639623609d14610093578063ad3cb1cc146100a6578063f2fde38b146100e4575b600080fd5b34801561005b57600080fd5b50610064610104565b005b34801561007257600080fd5b506000546040516001600160a01b0390911681526020015b60405180910390f35b6100646100a1366004610272565b610118565b3480156100b257600080fd5b506100d7604051806040016040528060058152602001640352e302e360dc1b81525081565b60405161008a919061038e565b3480156100f057600080fd5b506100646100ff3660046103a8565b610187565b61010c6101ca565b61011660006101f7565b565b6101206101ca565b60405163278f794360e11b81526001600160a01b03841690634f1ef28690349061015090869086906004016103c5565b6000604051808303818588803b15801561016957600080fd5b505af115801561017d573d6000803e3d6000fd5b5050505050505050565b61018f6101ca565b6001600160a01b0381166101be57604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b6101c7816101f7565b50565b6000546001600160a01b031633146101165760405163118cdaa760e01b81523360048201526024016101b5565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03811681146101c757600080fd5b634e487b7160e01b600052604160045260246000fd5b60008060006060848603121561028757600080fd5b833561029281610247565b925060208401356102a281610247565b9150604084013567ffffffffffffffff808211156102bf57600080fd5b818601915086601f8301126102d357600080fd5b8135818111156102e5576102e561025c565b604051601f8201601f19908116603f0116810190838211818310171561030d5761030d61025c565b8160405282815289602084870101111561032657600080fd5b8260208601602083013760006020848301015280955050505050509250925092565b6000815180845260005b8181101561036e57602081850181015186830182015201610352565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006103a16020830184610348565b9392505050565b6000602082840312156103ba57600080fd5b81356103a181610247565b6001600160a01b03831681526040602082018190526000906103e990830184610348565b94935050505056fea264697066735822122042ed984e328b79c0a5532493800e1ad099312f748f15f3e480127b1cdbccccc964736f6c63430008180033b53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103";

type TransparentUpgradeableProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TransparentUpgradeableProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TransparentUpgradeableProxy__factory extends ContractFactory {
  constructor(...args: TransparentUpgradeableProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _logic: AddressLike,
    initialOwner: AddressLike,
    _data: BytesLike,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _logic,
      initialOwner,
      _data,
      overrides || {}
    );
  }
  override deploy(
    _logic: AddressLike,
    initialOwner: AddressLike,
    _data: BytesLike,
    overrides?: PayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _logic,
      initialOwner,
      _data,
      overrides || {}
    ) as Promise<
      TransparentUpgradeableProxy & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): TransparentUpgradeableProxy__factory {
    return super.connect(runner) as TransparentUpgradeableProxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TransparentUpgradeableProxyInterface {
    return new Interface(_abi) as TransparentUpgradeableProxyInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): TransparentUpgradeableProxy {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as TransparentUpgradeableProxy;
  }
}
