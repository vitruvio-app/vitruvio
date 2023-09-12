/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Chain, Testnet } from '@vitruvio/types'
import { useUI, SelectChains, WalletStatus, Button } from '@vitruvio/ui'
import { useVitruvio } from '@vitruvio/react'
import { useAccount, useChainId, useConnect } from 'wagmi'
import { Checkbox, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useSwitchNetwork } from 'wagmi'
import {
  getTestnetFromMainnet,
  getChainFromChainId,
  isTestnetFromChainId,
  getChainIdFromChain,
} from '@vitruvio/utils'
import { useTheme } from '@mui/material'
const Page: NextPage = () => {
  const { isConnected, address, connector } = useAccount()
  const chainId = useChainId()
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isTestnet, setIsTestnet] = useState(false)
  const [chain, setChain] = useState<Chain>('ethereum')
  const { encrypt, decrypt } = useVitruvio(
    isTestnet ? getTestnetFromMainnet(chain) : chain
  )
  const [encryptedString, setEncryptedString] = useState<Blob>()
  const [encryptedSymmetricKey, setEncryptedSymmetricKey] = useState<string>()
  const { Connect } = useUI()
  const theme = useTheme()
  useEffect(() => {
    setHasLoaded(true)
  }, [])
  useEffect(() => {
    if (hasLoaded) {
      setIsTestnet(isConnected ? isTestnetFromChainId(chainId) : false)
      setChain(isConnected ? getChainFromChainId(chainId) : 'ethereum')
    }
  }, [isConnected, chainId, hasLoaded])
  return (
    <>
      <Stack direction='row' justifyContent={'space-between'}>
        <Typography variant='h4'>Vitruvio Sandbox</Typography>
        {isConnected && hasLoaded && (
          <WalletStatus
            chain={chain}
            isTestnet={isTestnet}
            address={address as string}
          />
        )}
      </Stack>

      {!isConnected && hasLoaded && (
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant='body1'>Testnet</Typography>
          <Checkbox
            checked={isTestnet}
            onChange={(e) => {
              setIsTestnet(e.target.checked)
            }}
          />
        </Stack>
      )}
      <Stack direction='row'>
        <SelectChains
          onSelect={(chain) => {
            setChain(chain)
          }}
        />
        <Connect
          color={'white'}
          hideOnConnect={true}
          defaultChain={isTestnet ? getTestnetFromMainnet(chain) : chain}
        />
      </Stack>

      {isConnected && hasLoaded ? (
        <>
          <Button
            variant='contained'
            color={'primary'}
            text='Sign Message'
            onClick={async () => {
              const res = await encrypt(
                'This is a superstring encrypted with lit protocol',
                '0.0.1',
                'Secret string'
              )
              setEncryptedString(res.encryptedString)
              setEncryptedSymmetricKey(res.encryptedSymmetricKey)
            }}
          />
          <Button
            color='secondary'
            variant='contained'
            text='Decrypt my message'
            disabled={!encryptedString || !encryptedSymmetricKey}
            onClick={async () => {
              if (encryptedString && encryptedSymmetricKey) {
                try {
                  const decryptedData = await decrypt(
                    encryptedSymmetricKey,
                    encryptedString
                  )
                  console.log(decryptedData)
                } catch (error) {
                  console.log(error)
                }
              }
            }}
          />
        </>
      ) : null}
    </>
  )
}

export default Page
