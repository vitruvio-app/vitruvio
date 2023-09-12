import { Chain, Testnet } from '@vitruvio/types'
import {
  sepolia,
  mainnet,
  polygonMumbai,
  avalancheFuji,
  polygon,
  avalanche,
  fantomTestnet,
  fantom,
  bscTestnet,
  bsc,
} from 'wagmi/chains'
import { ContractController } from '../data/abis.json'
import contracts from '../data/contracts.json'

const getWagmiInstanceByChain = (chain: Chain | Testnet) => {
  switch (chain) {
    case 'sepolia':
      return sepolia
    case 'ethereum':
      return mainnet
    case 'mumbai':
      return polygonMumbai
    case 'fuji':
      return avalancheFuji
    case 'polygon':
      return polygon
    case 'avalanche':
      return avalanche
    case 'fantomTestnet':
      return fantomTestnet
    case 'fantom':
      return fantom
    case 'bscTestnet':
      return bscTestnet
    case 'bsc':
      return bsc
    default:
      return mainnet
  }
}

const getTestnetFromMainnet = (chain: Chain): Testnet => {
  switch (chain) {
    case 'ethereum':
      return 'sepolia'
    case 'polygon':
      return 'mumbai'
    case 'avalanche':
      return 'fuji'
    case 'bsc':
      return 'bscTestnet'
    case 'fantom':
      return 'fantomTestnet'
    default:
      return 'sepolia'
  }
}

const getMainnetFromTestnet = (chain: Testnet): Chain => {
  switch (chain) {
    case 'sepolia':
      return 'ethereum'
    case 'mumbai':
      return 'polygon'
    case 'fuji':
      return 'avalanche'
    case 'bscTestnet':
      return 'bsc'
    case 'fantomTestnet':
      return 'fantom'
    default:
      return 'ethereum'
  }
}
const getChainIdFromChain = (chain: Chain | Testnet): number => {
  switch (chain) {
    case 'sepolia':
      return 42161
    case 'ethereum':
      return 1
    case 'mumbai':
      return 80001
    case 'fuji':
      return 43114
    case 'polygon':
      return 137
    case 'avalanche':
      return 43114
    case 'bscTestnet':
      return 97
    case 'bsc':
      return 56
    case 'fantomTestnet':
      return 250
    case 'fantom':
      return 250
    default:
      return 1
  }
}

const formatWalletAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const getContractControllerAddress = (
  chain: Chain | Testnet
): `0x${string}` | undefined => {
  switch (chain) {
    case 'sepolia':
      return contracts.ethereum.testnet as `0x${string}`
    default:
      return contracts.ethereum.testnet as `0x${string}`
  }
}

const getChainFromChainId = (chainId: number): Chain => {
  switch (chainId) {
    case 1:
      return 'ethereum'
    case 137:
      return 'polygon'
    case 421614:
      return 'ethereum'
    case 80001:
      return 'polygon'
    case 43114:
      return 'avalanche'
    case 56:
      return 'bsc'
    case 250:
      return 'fantom'
    default:
      return 'ethereum'
  }
}
const isTestnetFromChainId = (chainId: number): boolean => {
  switch (chainId) {
    case 1:
      return false
    case 137:
      return false
    case 42161:
      return true
    case 80001:
      return true
    case 43114:
      return true
    default:
      return false
  }
}
const ContractControllerABI = ContractController

export {
  getWagmiInstanceByChain,
  getTestnetFromMainnet,
  formatWalletAddress,
  ContractControllerABI,
  getContractControllerAddress,
  getChainFromChainId,
  isTestnetFromChainId,
  getChainIdFromChain,
  getMainnetFromTestnet,
}
