export = Vitruvio
export as namespace Vitruvio
declare namespace Vitruvio {
  const enum Chains {
    ethereum = 'ethereum',
    polygon = 'polygon',
    avalanche = 'avalanche',
    fantom = 'fantom',
    bsc = 'bsc',
  }
  const enum Testnets {
    sepolia = 'sepolia',
    mumbai = 'mumbai',
    fuji = 'fuji',
    bscTestnet = 'bscTestnet',
    fantomTestnet = 'fantomTestnet',
  }
  type IpfsProvider = 'infura'
  type Chain = 'ethereum' | 'polygon' | 'avalanche' | 'fantom' | 'bsc'
  type Testnet = 'sepolia' | 'mumbai' | 'fuji' | 'bscTestnet' | 'fantomTestnet'
}
