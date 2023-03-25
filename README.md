<p align="center">
  <a href="https://vitruvio.tech">
    <img alt="babel" src="https://creazilla-store.fra1.digitaloceanspaces.com/silhouettes/778/vitruvian-man-silhouette-4bb7ee-md.png" width="546">
  </a>
</p>

<h1 align="center">
  Secure & Private Decentralized storage for your files
</h1>

<p align="center">Supported chains</p>
<p align="center">
  <a href="https://polygon.technology/"><img alt="Polygon blockchain" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Polygon_Blockchain_Matic_Logo.svg/1200px-Polygon_Blockchain_Matic_Logo.svg.png" width="50" /></a>
  <a href="https://ethereum.org/en/"><img alt="Ethereum" src="https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png" width="50" /></a>
  <a href="https://www.avax.com/"><img alt="Avalanche blockchain" src="https://upload.wikimedia.org/wikipedia/en/0/03/Avalanche_logo_without_text.png" width="50" /></a>
   <a href="https://www.binance.com/en"><img alt="Binance blockchain" src="https://www.xdefi.io/wp-content/uploads/2022/05/logo-4.png" width="50" /></a>
   <a href="https://fantom.foundation/"><img alt="Wallet connect protocol" src="https://thegivingblock.com/wp-content/uploads/2021/07/Fantom-FTM-Logo.png" width="50" /></a>
</p>

## Intro

Vitruvio is a cutting-edge project that harnesses the power of IPFS to provide secure and reliable file storage. With Vitruvio, users can confidently store and share their sensitive data without fear of data breaches or loss.

## Monorepo get started 🎬🎬

This is a monorepo, so you need to install all the dependencies in the root folder.

```bash
yarn setup
```

For a detailed and step by step guide, you can check the [Get Started Guide](./docs/GetStarted.md).

## Packages

- [themes](./packages/themes) - Set of visual themes for the Vitruvio UI in mui.
- [react](./packages/react) - Public library aimed to be used by developers to integrate Vitruvio in their dapps.
- [ui](./packages/ui) - Vitruvio UI library.

## Husky 🐕 and Lerna 🐉

We use husky and lerna to manage the hooks and the packages. You can find the hooks in the root folder.

Before each commit, husky will run the builder and the linter. If you want to skip the hooks, you can use the flag --no-verify.

## Graph of monorepo 📊

```bash
yarn graph
```

## License

[MIT](./LICENSE)
