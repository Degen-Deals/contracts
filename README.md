## Degen Deals

Deployed addresses on Optimism mainnet: 

### Deployed Addresses on Optimism Mainnet

| Contract                            | Address                                    |
|-------------------------------------|--------------------------------------------|
| DegenDealsERC721                    | 0xE31e85CBef95Aec9BD7c056ec52Da7a437b9D6fa |
| DegenDealsERC6551Account            | 0x2b72b717a4151F93ead42606EB053407ff860009 |
| DegenDealsERC6551Registry implementation | 0x869285aF7581549ca7cC6dDeAfaBa99b966494fa |
| DegenDealsERC6551Registry proxy     | 0xAA45302106FfAa5D84c9AB05db688F877659fb1B |

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
