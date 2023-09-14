import axios from 'axios'
import { IPFS_INFURA_URL } from '../GLOBALS'
const addToIpfs = async (
  data: Blob,
  provider: {
    type: 'infura'
    apiKey: string
    apiSecret: string
  }
): Promise<{ CID: string }> => {
  const form = new FormData()
  form.append('file', data, 'data.txt')
  const { data: res } = await axios.post<{
    Name: string
    Hash: string
    Size: string
  }>(`${IPFS_INFURA_URL}/add`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Basic ${Buffer.from(
        `${provider.apiKey}:${provider.apiSecret}`,
        'utf8'
      ).toString('base64')}`,
    },
  })
  return {
    CID: res.Hash,
  }
}

export { addToIpfs }
