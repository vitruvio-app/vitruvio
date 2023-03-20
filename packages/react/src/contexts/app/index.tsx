import React, { useEffect } from 'react'
import { APPContext } from './context'
import LitSdk from '@lit-protocol/lit-node-client'
interface VitruvioReactProps {
  children: React.ReactNode
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
      }}
    >
      {props.children}
    </APPContext.Provider>
  )
}

export default VitruvioReact
