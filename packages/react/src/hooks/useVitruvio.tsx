import { useContext } from 'react'
import { APPContext } from '../contexts/app/context'
import LitSdk from '@lit-protocol/lit-node-client'
export default function useVitruvio() {
  const { litProtocolInstance } = useContext(APPContext)

  /**
   * It encrypts a string and saves the encryption key to the blockchain.
   * @param authSig - The signature of the user who is encrypting the data.
   * @returns The encrypted string and the encrypted symmetric key.
   */
  const encrypt = async (authSig: { sig: string; derivedVia: string; signedMessage: string; address: string }) => {
    const accessControlConditions = [
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
    const { symmetricKey, encryptedString } = await LitSdk.encryptString('this is a secret message')
    const encryptedSymmetricKey = await litProtocolInstance.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain: 'goerli',
    })
    return {
      encryptedString,
      encryptedSymmetricKey: LitSdk.uint8arrayToString(encryptedSymmetricKey),
    }
  }

  return { encrypt }
}
