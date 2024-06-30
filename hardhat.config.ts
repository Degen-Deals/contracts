import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
import "hardhat-contract-sizer";
const { path } = require('path');
import dotenv from 'dotenv';
dotenv.config();

const { 
  MNEMONIC,
  INFURA_API_KEY,
  ETHERSCAN_API_KEY,
  POLYGON_API_KEY,
  OPTIMISMSCAN_API_KEY,
  ARBITRUMSCAN_API_KEY,
  LINEASCAN_API_KEY,
} = process.env


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    }
    
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
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
        //url: `https://opt-sepolia.g.alchemy.com/v2/l68CQ2vgQW7t5BiyiPAdC-rhTcGy_9xZ`
        url: `https://opt-mainnet.g.alchemy.com/v2/l68CQ2vgQW7t5BiyiPAdC-rhTcGy_9xZ`
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
      // url: `https://optimism-sepolia.infura.io/v3/${INFURA_API_KEY}`,
      url: `https://opt-sepolia.g.alchemy.com/v2/l68CQ2vgQW7t5BiyiPAdC-rhTcGy_9xZ`,
      gas: 'auto',
      gasPrice: 'auto',
      accounts: {mnemonic: MNEMONIC}
    },
    optimism: {
      url: `https://opt-mainnet.g.alchemy.com/v2/l68CQ2vgQW7t5BiyiPAdC-rhTcGy_9xZ`,
      //url: `https://optimism-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      gas: 'auto',
      gasPrice: 'auto',
      accounts: {mnemonic: MNEMONIC}
    }
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      optimismSepolia: OPTIMISMSCAN_API_KEY,
      optimisticEthereum: OPTIMISMSCAN_API_KEY,
      arbitrumOne: ARBITRUMSCAN_API_KEY,
      arbitrumSepolia: ARBITRUMSCAN_API_KEY,
      linea: LINEASCAN_API_KEY,
      lineaGoerli: LINEASCAN_API_KEY,
    },
    customChains: [
      {
        network: "optimismSepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          browserURL: "https://sepolia-optimism.etherscan.io/"
        }
      },
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
            apiURL: "https://api-sepolia.arbiscan.io/api",
            browserURL: "https://sepolia.arbiscan.io/",
        },
      },
      {
        network: "lineaGoerli",
        chainId: 59140,
        urls: {
          apiURL: "https://api-testnet.lineascan.build/api",
          browserURL: "https://goerli.lineascan.build/address"
        }
      },
      {
        network: "linea",
        chainId: 59144,
        urls: {
          apiURL: "https://api.lineascan.build/api",
          browserURL: "https://lineascan.build/"
        }
      }
    ]
  }
};

export default config;
