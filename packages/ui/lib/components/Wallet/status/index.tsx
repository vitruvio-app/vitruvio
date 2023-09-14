import { Card, CardContent, Typography } from '@mui/material'
import { formatWalletAddress, getTestnetFromMainnet } from '@vitruvio/utils'
import { Chain } from '@vitruvio/types'
import { Stack } from '@mui/system'
import _ from 'lodash'
import Blockies from 'react-blockies'
import { useTheme } from '@mui/material'

export interface Props {
  address: string
  chain: Chain
  isTestnet?: boolean
}

const WalletStatus = (props: Props): JSX.Element => {
  const theme = useTheme()

  return (
    <Card sx={{ borderRadius: '30px', maxWidth: '25%' }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction={'row'} justifyContent='center' alignItems={'center'}>
          <Blockies color={theme.palette.primary.main} seed={props.address} />
          <Stack direction={'column'} marginLeft={2}>
            <Typography variant='h4' color={'primary'}>
              {formatWalletAddress(props.address)}
            </Typography>
            <Typography variant='caption' color={theme.palette.secondary.main}>
              {_.capitalize(props.chain)}{' '}
              {props.isTestnet && `(${getTestnetFromMainnet(props.chain)})`}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default WalletStatus
