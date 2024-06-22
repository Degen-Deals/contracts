## Degen Deals

Deployed addresses on Optimism mainnet: 

### Deployed Addresses on Optimism Mainnet

| Contract                            | Address                                    |
|-------------------------------------|--------------------------------------------|
| DegenDealsERC721                    | 0x3e3d5364e6f767Eb8F6AeCdCE97aFcDd08462D35 |
| DegenDealsERC6551Account            | 0x4356c300B1021e2725269531E16854c31Ae02EA3 |
| DegenDealsERC6551Registry implementation | 0x2397a8C92f945e351d43ca9De786090211C784F7 |
| DegenDealsERC6551Registry proxy     | 0x67B4cF044e4ccC5964ed0e19F1Fc4054beaA5725 |

DegenDeals is a smart contract system designed for tokenizing obligations and rights with associated smart contract accounts. The architecture leverages several components, including ERC721 tokens for representing deals, ERC6551 accounts for managing deal-specific logic with combination of ERC4337 smart contracts account. The system incorporates various roles for managing access and functionality, ensuring a robust and flexible platform for decentralized deals.

# DegenDealsERC721
The main contract for managing deals, which are represented as ERC721 tokens. This contract handles the minting, splitting, and managing of deals, including the fees and roles associated with each deal.

Roles and Permissions:
1) DEGEN_BOSS_ROLE: Role with administrative privileges.
2) MEMBER_ROLE: Role for members who can participate in deals.
3) ARBITRATOR_ROLE: Role for trusted arbitrators.

Fees are calculated as a percentage of the deal amount. Fees are distributed to the platform and legal wallets.

The functionality of DegenDealsERC721:
1. Minting deals with associated ERC6551 accounts.
2. Splitting deals into smaller deals.
3. Designating deals with discounts.
4. Funding and paying deals with proper fee handling.
5. Transferring obligations between obligors and obligees.
6. Handling deal states and arbitrage processes.


# DegenDealsERC6551Account
A contract implementing the ERC6551 standard for managing deal-specific logic. Each deal NFT has an associated ERC6551 account, which handles the fund, pay, and deal processes via forwarding `bytes memore data`.
Initialize the account with the entry point, registry, and deal ID. Validates signatures and executors. Also possible to change `EntryPoint` contract. Handles fund, transfer obligations and payments.

# DegenDealsERC6551Registry
A contract for managing the creation and deployment of ERC6551 accounts associated with deals. Create and derive ERC6551 accounts for deals. Manage the implementation and deployment of accounts.

## Installation and Deploy

1. Clone repo
```
git clone https://github.com/Degen-Deals/contracts
cd contracts
```

2. Install dependencies
```
yarn
forge
```

3. Compile
```
yarn hardhat compile
```

## Deployment

```
yarn hardhat run scripts/deploy.ts --network <NAME_NETWORK_IN_HARDHAT_CONFIG>
```
