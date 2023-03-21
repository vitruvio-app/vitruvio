import { useAccount, useSigner, useSignMessage } from 'wagmi'
import { ethers } from 'ethers'
import { useState } from 'react'
import siwe from 'siwe'
//Requires a wallet connect instance
export default function useWallet() {
  const statement = 'Vitruvio auth message'
  const [isSigning, setIsSigning] = useState(false)
  const { isConnected, address } = useAccount()
  const { data: signer } = useSigner()

  /**
   * It signs a message using the wallet connected to the app. PROTOCOL EIP 4361
   * @returns An object with the signature, the method used to sign, the message that was signed, and
   * the address that signed it.
   */
  const signAuthMessage = async () => {
    if (!isConnected) throw new Error('No wallet connected')
    if (!signer) throw new Error('No signer')
    const siweMessage = new siwe.SiweMessage({
      domain: 'localhost',
      address,
      statement,
      uri: 'http://localhost:3000/sandbox',
      version: '1',
      chainId: 5,
    })
    const messageToSign = siweMessage.prepareMessage()
    setIsSigning(true)
    const signature = await signer.signMessage(messageToSign)
    setIsSigning(false)
    const recoveredAddress = ethers.utils.verifyMessage(messageToSign, signature)
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
