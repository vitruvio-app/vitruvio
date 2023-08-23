/* eslint-disable @typescript-eslint/no-extra-semi */
import React, { useEffect } from 'react'
import { IpfsProvider } from '@vitruvio/types'
import { APPContext } from './context'
import LitSdk from '@lit-protocol/lit-node-client'
interface VitruvioReactProps {
  children: React.ReactNode
  ipfsProvider: {
    type: IpfsProvider
    apiKey: string
    apiKeySecret: string
    apiEndpoint: string
  }
}

const VitruvioReact = (props: VitruvioReactProps): JSX.Element => {
  //lit protocol general instance
  const litProtocol = new LitSdk.LitNodeClient({
    alertWhenUnauthorized: false,
    debug: false,
  })

  useEffect(() => {
    ;(async () => {
      await litProtocol.connect()
    })()
  }, [])

  return (
    <APPContext.Provider
      value={{
        litProtocolInstance: litProtocol,
        ipfsProvider: {
          type: props.ipfsProvider.type,
          apiKey: props.ipfsProvider.apiKey,
          apiSecret: props.ipfsProvider.apiKeySecret,
          host: props.ipfsProvider.apiEndpoint,
        },
      }}
    >
      {props.children}
    </APPContext.Provider>
  )
}

export default VitruvioReact
