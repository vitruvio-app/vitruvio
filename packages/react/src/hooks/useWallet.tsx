import { useAccount, useSignMessage } from 'wagmi'
import { ethers } from 'ethers'
import { useState } from 'react'
import siwe from 'siwe'
//Requires a wallet connect instance
export default function useWallet() {
  const [statement, setStatement] = useState('Vitruvio auth message')
  const { isConnected, address } = useAccount()
  const {
    isError,
    isLoading: isSigning,
    signMessageAsync,
  } = useSignMessage({
    message: statement,
  })
  const signAuthMessage = async () => {
    if (!isConnected) throw new Error('No wallet connected')
    const signature = await signMessageAsync()
    const recoveredAddress = ethers.utils.verifyMessage(statement, signature)
    if (isError) throw new Error('Error signing message')
    const siweMessage = new siwe.SiweMessage({
      domain: 'localhost',
      address,
      statement,
      uri: 'http://localhost:3000/sandbox',
      version: '1',
      chainId: 5,
    })
    const messageToSign = siweMessage.prepareMessage()
    const authSig = {
      sig: signature,
      derivedVia: 'web3.eth.personal.sign',
      signedMessage: messageToSign,
      address: recoveredAddress,
    }
    return authSig
  }

  return {
    signAuthMessage,
    isSigning,
  }
}
