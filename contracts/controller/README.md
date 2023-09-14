# Contract Controller

Vitruvio's Contract controller allows you to deploy and interact with the contracts that are part of the Vitruvio's ecosystem.

## Testing 🧪

All testing is done using [Sepolia Testnet 🔗](https://sepolia.etherscan.io/)

### Last stable testnet contract for Sepolia ⚙️

- [Contract Controller 🔄](https://sepolia.etherscan.io/address/0xC74D98443Dd9a45bAD9AeaD30B5688E3a99E015D): 0xC74D98443Dd9a45bAD9AeaD30B5688E3a99E015D

### How to use 🤔

1.  Create your own .env file
2.  Add the specified keys to your .env file
3.  Run `yarn install` or `npm install`
4.  Run the following command to compile and deploy the contract:

```shell
npx hardhat compile
npm run deploy:sepolia
```

### Environment variables 📝

| Item                  |                                           Value |
| --------------------- | ----------------------------------------------: |
| RPC_SEPOLIA           | Add your alchemy RPC server for sepolia testnet |
| ETHERSCAN_API_KEY     |                   API Key provided by etherscan |
| WALLET_PRIVATE_KEY    |                         Your wallet private key |
| COINMARKETCAP_API_KEY |                 In case you want the gas-report |
