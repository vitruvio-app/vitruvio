import { useContext } from 'react'
import { APPContext } from '../contexts/app/context'
import LitSdk from '@lit-protocol/lit-node-client'
import { AccessControlConditions } from '@lit-protocol/types'
import useWallet from './useWallet'
export default function useVitruvio() {
  const { litProtocolInstance } = useContext(APPContext)
  const { signAuthMessage, isSigning } = useWallet()
  /**
   * It encrypts a string and saves the encryption key to the blockchain.
   * @param authSig - The signature of the user who is encrypting the data.
   * @returns The encrypted string and the encrypted symmetric key.
   */
  const encrypt = async (message: string) => {
    const accessControlConditions: AccessControlConditions = [
      {
        contractAddress: '',
        standardContractType: '',
        chain: 'ethereum',
        method: 'eth_getBalance',
        parameters: [':userAddress', 'latest'],
        returnValueTest: {
          comparator: '>=',
          value: '1000000000000', // 0.000001 ETH
        },
      },
    ]
    const authSig = await signAuthMessage()
    const { symmetricKey, encryptedString } = await LitSdk.encryptString(message)
    const encryptedSymmetricKey = await litProtocolInstance.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain: 'goerli',
    })
    return {
      encryptedString,
      encryptedSymmetricKey: LitSdk.uint8arrayToString(encryptedSymmetricKey, 'base16') as string,
    }
  }

  /**
   * `decrypt` takes an encrypted symmetric key and a blob of encrypted data, and returns the decrypted
   * data
   * @param {string} encryptedSymmetricKey - The encrypted symmetric key that you want to decrypt.
   * @param {Blob} dataToDecrypt - The data you want to decrypt.
   * @returns The decrypted string.
   */
  const decrypt = async (encryptedSymmetricKey: string, dataToDecrypt: Blob) => {
    const accessControlConditions: AccessControlConditions = [
      {
        contractAddress: '',
        standardContractType: '',
        chain: 'ethereum',
        method: 'eth_getBalance',
        parameters: [':userAddress', 'latest'],
        returnValueTest: {
          comparator: '>=',
          value: '1000000000000', // 0.000001 ETH
        },
      },
    ]
    const authSig = await signAuthMessage()
    const symmetricKey = await litProtocolInstance.getEncryptionKey({
      toDecrypt: encryptedSymmetricKey,
      accessControlConditions,
      chain: 'goerli',
      authSig,
    })
    console.log(symmetricKey)
    const decryptedString = await LitSdk.decryptString(dataToDecrypt, symmetricKey)
    return decryptedString
  }

  return { encrypt, decrypt }
}
