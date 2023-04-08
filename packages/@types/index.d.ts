export = Vitruvio;
export as namespace Vitruvio;
declare namespace Vitruvio {
  const enum Chains {
    ethereum = 'ethereum',
    polygon = 'polygon',
    avalanche = 'avalanche',
  }
  const enum Testnets {
    sepolia = 'sepolia',
    mumbai = 'mumbai',
    fuji = 'fuji',
  }
  type Chain = 'ethereum' | 'polygon' | 'avalanche';
  type Testnet = 'sepolia' | 'mumbai' | 'fuji';
}
