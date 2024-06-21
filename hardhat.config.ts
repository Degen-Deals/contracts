import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
const { path } = require('path');
import dotenv from 'dotenv';
dotenv.config();

const { 
  MNEMONIC,
  INFURA_API_KEY,
  ETHERSCAN_API_KEY,
  POLYGON_API_KEY,
} = process.env


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./src",
    artifacts: "./artifacts",
    cache: "./cache",
  },
  networks: {
    hardhat: {
      forking: {
        // url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`
        // url: 'https://eth-sepolia.g.alchemy.com/v2/l68CQ2vgQW7t5BiyiPAdC-rhTcGy_9xZ'
        // url: `https://optimism-sepolia.infura.io/v3/${INFURA_API_KEY}`,
        url: `https://opt-sepolia.g.alchemy.com/v2/l68CQ2vgQW7t5BiyiPAdC-rhTcGy_9xZ`
      },
      allowUnlimitedContractSize: false,
      blockGasLimit: 1000_000_000,
      gas: 100_000_000,
      gasPrice: 'auto',
      accounts: {mnemonic: MNEMONIC}
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      gas: 'auto',
      gasPrice: 'auto',
      accounts: {mnemonic: MNEMONIC}
    },
    optimismSepolia: {
      url: `https://optimism-sepolia.infura.io/v3/${INFURA_API_KEY}`,
      gas: 'auto',
      gasPrice: 'auto',
      accounts: {mnemonic: MNEMONIC}
    },
    optimism: {
      url: `https://optimism-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      gas: 'auto',
      gasPrice: 'auto',
      accounts: {mnemonic: MNEMONIC}
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  }
};

export default config;
