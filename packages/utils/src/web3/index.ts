import { Chain, Testnet } from '@vitruvio/types';
import {
  sepolia,
  mainnet,
  polygonMumbai,
  avalancheFuji,
  polygon,
  avalanche,
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
    default:
      return mainnet;
  }
};

export { getWagmiInstanceByChain };
