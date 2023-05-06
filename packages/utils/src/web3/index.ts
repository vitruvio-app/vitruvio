import { Chain, Testnet } from '@vitruvio/types';
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
} from 'wagmi/chains';
const getWagmiInstanceByChain = (chain: Chain | Testnet) => {
  switch (chain) {
    case 'sepolia':
      return sepolia;
    case 'ethereum':
      return mainnet;
    case 'mumbai':
      return polygonMumbai;
    case 'fuji':
      return avalancheFuji;
    case 'polygon':
      return polygon;
    case 'avalanche':
      return avalanche;
    case 'fantomTestnet':
      return fantomTestnet;
    case 'fantom':
      return fantom;
    case 'bscTestnet':
      return bscTestnet;
    case 'bsc':
      return bsc;
    default:
      return mainnet;
  }
};

const getTestnetFromMainnet = (chain: Chain): Testnet => {
  switch (chain) {
    case 'ethereum':
      return 'sepolia';
    case 'polygon':
      return 'mumbai';
    case 'avalanche':
      return 'fuji';
    case 'bsc':
      return 'bscTestnet';
    case 'fantom':
      return 'fantomTestnet';
    default:
      return 'sepolia';
  }
};

export { getWagmiInstanceByChain, getTestnetFromMainnet };
