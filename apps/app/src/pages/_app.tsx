import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
const chains = [arbitrum, mainnet, polygon]
const projectId = process.env.WALLETCONNECT_PROJECTID as string
// Client-side cache, shared for the whole session of the user in the browser.
import { AppProps } from 'next/app'
import { VitruvioReact } from '@vitruvio/react'
import ThemeProviderWrapper from '@/theme/ThemeProvider'
const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  provider,
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

export default function App({ Component, pageProps }: AppProps) {
  const INFURA_API_KEY = process.env.INFURA_API_KEY as string
  const INFURA_API_SECRET = process.env.INFURA_API_SECRET as string
  const API_ENDPOINT = process.env.API_ENDPOINT as string
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <VitruvioReact
          ipfsProvider={{
            type: 'infura',
            apiKey: INFURA_API_KEY,
            apiKeySecret: INFURA_API_SECRET,
            apiEndpoint: API_ENDPOINT,
          }}
        >
          <ThemeProviderWrapper>
            <Component {...pageProps} />
          </ThemeProviderWrapper>
        </VitruvioReact>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}
