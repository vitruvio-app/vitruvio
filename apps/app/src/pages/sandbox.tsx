/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Chain, Testnet } from '@vitruvio/types'
import { useUI, SelectChains, WalletStatus } from '@vitruvio/ui'
import { useVitruvio } from '@vitruvio/react'
import { useAccount } from 'wagmi'
import { Checkbox, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { getTestnetFromMainnet } from '@vitruvio/utils'
const Page: NextPage = () => {
  const { isConnected, address } = useAccount()
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isTestnet, setIsTestnet] = useState(false)
  const [chain, setChain] = useState<Chain>('ethereum')
  const { encrypt, decrypt } = useVitruvio(
    isTestnet ? getTestnetFromMainnet(chain) : chain
  )
  const [encryptedString, setEncryptedString] = useState<Blob>()
  const [encryptedSymmetricKey, setEncryptedSymmetricKey] = useState<string>()
  const { Connect } = useUI()

  useEffect(() => {
    setHasLoaded(true)
  }, [])

  return (
    <>
      <Stack direction='row' justifyContent={'space-between'}>
        <Typography variant='h4'>Vitruvio Sandbox</Typography>
        <WalletStatus chain={chain} isTestnet={isTestnet} address={'0x'} />
      </Stack>

      <Stack direction={'row'} alignItems={'center'}>
        <Typography variant='body1'>Testnet</Typography>
        <Checkbox
          onChange={(e) => {
            setIsTestnet(e.target.checked)
          }}
        />
      </Stack>
      <Stack direction='row'>
        <SelectChains
          onSelect={(chain) => {
            setChain(chain)
          }}
        />
        <Connect
          hideOnConnect={true}
          defaultChain={isTestnet ? getTestnetFromMainnet(chain) : chain}
        />
      </Stack>

      {isConnected && hasLoaded ? (
        <>
          <button
            onClick={async () => {
              const res = await encrypt(
                'This is a superstring encrypted with lit protocol',
                '0.0.1',
                'Secret string'
              )
              setEncryptedString(res.encryptedString)
              setEncryptedSymmetricKey(res.encryptedSymmetricKey)
            }}
          >
            Sign Message
          </button>
          <button
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
          >
            Decrypt my message
          </button>
        </>
      ) : null}
    </>
  )
}

export default Page
