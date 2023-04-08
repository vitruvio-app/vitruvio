import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import { Chain, Testnet } from '@vitruvio/types'
import { getWagmiInstanceByChain } from '@vitruvio/utils'
import { useWeb3Modal } from '@web3modal/react'
import { useAccount } from 'wagmi'
import { disconnect } from '@wagmi/core'
import WalletConnectIcon from '../assets/wc'
//Requires a wallet connect instance
export default function useUI() {
  const [hasMounted, setHasMounted] = useState(false)
  const { open, isOpen, setDefaultChain } = useWeb3Modal()
  const { isConnected } = useAccount()

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const Connect = (params: {
    icon?: 'show' | 'hide'
    label?: string
    disabled?: boolean
    defaultChain?: Chain | Testnet
  }) => {
    if (!hasMounted) return null
    if (params.defaultChain) {
      //Sets default chain before connecting
      setDefaultChain(getWagmiInstanceByChain(params.defaultChain))
    }
    return (
      <Button
        icon={!isOpen ? <WalletConnectIcon /> : undefined}
        loading={isOpen}
        loadingText={'Connecting...'}
        onClick={() => {
          if (isConnected) {
            disconnect()
          } else {
            open()
          }
        }}
        disabled={params.disabled}
        text={params.label || 'Connect Wallet'}
      />
    )
  }
  return {
    Connect,
  }
}
