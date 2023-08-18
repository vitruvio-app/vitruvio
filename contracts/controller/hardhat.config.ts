import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
const config: HardhatUserConfig = {
  solidity: '0.8.19',
  networks: {
    sepolia: {
      url: process.env.RPC_SEPOLIA,
      accounts: [process.env.WALLET_PRIVATE_KEY as string],
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY as string,
      sepolia: process.env.ETHERSCAN_API_KEY as string,
      goerli: process.env.ETHERSCAN_API_KEY as string,
      polygon: process.env.POLYGONSCAN_API_KEY as string,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY as string,
    },
  },
  gasReporter: {
    enabled: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    outputFile: 'gas-report.txt',
    currency: 'USD',
    token: 'ETH',
    noColors: true,
  },
}

export default config
