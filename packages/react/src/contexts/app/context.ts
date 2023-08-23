import React from 'react'
import { LitNodeClient } from '@lit-protocol/lit-node-client'

export const APPContext = React.createContext<{
  litProtocolInstance: LitNodeClient
  ipfsProvider: {
    type: 'infura'
    apiKey: string
    host: string
    apiSecret: string
  }
}>({
  litProtocolInstance: {} as any,
  ipfsProvider: {
    type: 'infura',
    apiKey: '',
    host: '',
    apiSecret: '',
  },
})
