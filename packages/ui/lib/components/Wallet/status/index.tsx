import { Card, CardContent, Typography } from '@mui/material'
import { formatWalletAddress, getTestnetFromMainnet } from '@vitruvio/utils'
import { Chain } from '@vitruvio/types'
import { Stack } from '@mui/system'
import _ from 'lodash'
export interface Props {
  address: string
  chain: Chain
  isTestnet?: boolean
}

const WalletStatus = (props: Props): JSX.Element => {
  return (
    <Card sx={{ borderRadius: '30px', maxWidth: '25%' }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction={'column'}>
          <Typography>{formatWalletAddress(props.address)}</Typography>
          <Typography variant='body1'>
            {_.capitalize(props.chain)}{' '}
            {props.isTestnet && `(${getTestnetFromMainnet(props.chain)})`}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default WalletStatus
