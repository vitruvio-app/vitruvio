/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Chain } from '@vitruvio/types'
import { useUI, SelectChains, WalletStatus, Button } from '@vitruvio/ui'
import { useVitruvio } from '@vitruvio/react'
import { useAccount, useNetwork } from 'wagmi'
import { Checkbox, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import {
  getTestnetFromMainnet,
  getChainFromChainId,
  isTestnetFromChainId,
} from '@vitruvio/utils'
const Page: NextPage = () => {
  const { isConnected, address } = useAccount()
  const { chain: networkChain } = useNetwork()
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isTestnet, setIsTestnet] = useState(false)
  const [chain, setChain] = useState<Chain>('ethereum')
  const { encrypt, decrypt, commit } = useVitruvio(
    isTestnet ? getTestnetFromMainnet(chain) : chain
  )
  const [encryptedString, setEncryptedString] = useState<Blob>()
  const [encryptedSymmetricKey, setEncryptedSymmetricKey] = useState<string>()
  const { Connect } = useUI()
  useEffect(() => {
    setHasLoaded(true)
  }, [])
  useEffect(() => {
    if (hasLoaded) {
      setIsTestnet(
        isConnected ? isTestnetFromChainId(networkChain?.id as number) : false
      )
      setChain(
        isConnected
          ? getChainFromChainId(networkChain?.id as number)
          : 'ethereum'
      )
    }
  }, [isConnected, networkChain?.id, hasLoaded])
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
        {!isConnected && hasLoaded && (
          <SelectChains
            onSelect={(chain) => {
              setChain(chain)
            }}
          />
        )}
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
                'Secret string',
                {
                  useIPFS: true,
                }
              )
              setEncryptedString(res.encryptedString)
              setEncryptedSymmetricKey(res.encryptedSymmetricKey)
            }}
          />
          <Button
            variant='contained'
            text='Save changes'
            onClick={async () => {
              const tx = await commit.execute()
              console.log(tx)
            }}
          />
        </>
      ) : null}
    </>
  )
}

export default Page
