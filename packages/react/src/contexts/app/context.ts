import React from 'react'
import { LitNodeClient } from '@lit-protocol/lit-node-client'

export const APPContext = React.createContext<{
  litProtocolInstance: LitNodeClient
  ipfsProvider: {
    apiKey: string
    host: string
    apiSecret: string
  }
}>({
  litProtocolInstance: {} as any,
  ipfsProvider: {
    apiKey: '',
    host: '',
    apiSecret: '',
  },
})
