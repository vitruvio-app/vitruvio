import React from 'react'
import { LitNodeClient } from '@lit-protocol/lit-node-client'

export const APPContext = React.createContext<{
  litProtocolInstance: LitNodeClient
}>({
  litProtocolInstance: {} as any,
})
