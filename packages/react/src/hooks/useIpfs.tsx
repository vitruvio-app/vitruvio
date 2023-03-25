export default function useIpfs(config: {
  infura: {
    apiKey: string
    apiSecret: string
  }
}) {
  const upload = async (string: string) => {}
  return { upload }
}
