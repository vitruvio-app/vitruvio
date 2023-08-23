/* eslint-disable no-unsafe-optional-chaining */
import { useContext, useState } from 'react'
import { APPContext } from '../contexts/app/context'
import * as LitSdk from '@lit-protocol/lit-node-client'
import { Chain, Testnet } from '@vitruvio/types'
import { AccessControlConditions } from '@lit-protocol/types'
import useWallet from './useWallet'
import { addToIpfs, ContractControllerABI, getContractControllerAddress } from '@vitruvio/utils'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
// create a Helia node
export default function useVitruvio(chain: Chain | Testnet) {
  const { litProtocolInstance, ipfsProvider } = useContext(APPContext)
  const [newCommit, setNewCommit] = useState<{
    waitingForUserResponse: boolean
    waitingForBlockchain: boolean
  }>()
  const [encryptionResult, setEncryptionResult] = useState<{
    CID: string
    encryptedString: Blob
    accessControlConditions: string
    encryptedSymmetricKey: string
    version: string
    archiveName: string
    timestamp: number
  }>()
  const { config } = usePrepareContractWrite({
    address: getContractControllerAddress(chain),
    abi: ContractControllerABI,
    functionName: 'uploadNewFile',
    args: [
      encryptionResult?.CID,
      encryptionResult?.encryptedSymmetricKey,
      encryptionResult?.accessControlConditions,
      encryptionResult?.version,
      encryptionResult?.archiveName,
      encryptionResult?.timestamp,
    ],
  })
  const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config)
  const { signAuthMessage, isSigning } = useWallet()

  /**
   * The `encrypt` function encrypts a message using a symmetric key and saves the encrypted message and
   * key to IPFS, with optional access control conditions.
   * @param {string} message - The `message` parameter is a string that represents the message you want
   * to encrypt.
   * @param {string} version - The `version` parameter is a string that represents the version of the file
   * @param {string} archiveName - The `archiveName` parameter is a string that represents the name of the file
   * @param [config] - The `config` parameter is an optional object that can contain the following
   * property:
   *  - `useIPFS` - The `useIPFS` property is a boolean that indicates whether or not to save the data in an ipfs
   * @returns The function `encrypt` returns an object with the following properties:
   * - `CID` - The `CID` property is a string that represents the IPFS CID of the encrypted message.
   * - `encryptedString` - The `encryptedString` property is a string that represents the encrypted
   * - `accessControlConditions` - The `accessControlConditions` property is an array of
   * - `encryptedSymmetricKey` - The `encryptedSymmetricKey` property is a string that represents the
   */
  const encrypt = async (
    message: string,
    version: string,
    archiveName: string,
    config?: {
      useIPFS: boolean
    },
  ) => {
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
      chain: chain,
    })
    if (config && config.useIPFS) {
      // Save the encrypted string to IPFS, asuming that the user sent Infura credentials
      const { CID } = await addToIpfs(encryptedString, {
        type: ipfsProvider.type,
        apiKey: ipfsProvider.apiKey,
        apiSecret: ipfsProvider.apiSecret,
      })
      setEncryptionResult({
        CID,
        encryptedString,
        accessControlConditions: JSON.stringify(accessControlConditions),
        encryptedSymmetricKey: LitSdk.uint8arrayToString(encryptedSymmetricKey, 'base16') as string,
        version,
        archiveName,
        timestamp: Date.now(),
      })
      return {
        CID,
        encryptedString,
        accessControlConditions,
        encryptedSymmetricKey: LitSdk.uint8arrayToString(encryptedSymmetricKey, 'base16') as string,
      }
    } else {
      throw new Error('IPFS is not configured')
    }
  }

  /**
   * The function `commitVersion` is an asynchronous function that writes data and waits for the
   * transaction result before returning the transaction receipt.
   * @returns The function `commitVersion` returns the transaction receipt.
   */
  const commitVersion = async () => {
    const txResult = await writeAsync?.()
    const transactionReceipt = await txResult?.wait()
    return transactionReceipt
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
    const decryptedString = await LitSdk.decryptString(dataToDecrypt, symmetricKey)
    return decryptedString
  }

  return {
    encrypt,
    decrypt,
    commit: {
      execute: commitVersion,
      waitingForUserResponse: newCommit?.waitingForUserResponse,
      waitingForBlockchain: newCommit?.waitingForBlockchain,
    },
  }
}
