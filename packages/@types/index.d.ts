export = Vitruvio;
export as namespace Vitruvio;
declare namespace Vitruvio {
  const enum Chains {
    ethereum = 'ethereum',
    polygon = 'polygon',
    avalanche = 'avalanche',
  }
  const enum Testnets {
    goerli = 'goerli',
    mumbai = 'mumbai',
    fuji = 'fuji',
  }
  type Chain = Chains.avalanche | Chains.ethereum | Chains.polygon;
  type Testnet = Testnets.goerli | Testnets.mumbai | Testnets.fuji;
}
