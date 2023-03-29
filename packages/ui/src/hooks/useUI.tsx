import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import { Chain, Testnet } from '@vitruvio/types'
import { useWeb3Modal } from '@web3modal/react'
import { useAccount } from 'wagmi'
import { disconnect } from '@wagmi/core'
import WalletConnectIcon from '../assets/wc'
//Requires a wallet connect instance
export default function useUI() {
  const [hasMounted, setHasMounted] = useState(false)
  const { open, isOpen } = useWeb3Modal()
  const { isConnected } = useAccount()

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const Connect = (params: { icon?: 'show' | 'hide'; label?: string; disabled?: boolean; chain?: Chain | Testnet }) => {
    if (!hasMounted) return null
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
