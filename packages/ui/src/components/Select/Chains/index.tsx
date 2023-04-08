import React from 'react'
import { Chain } from '@vitruvio/types'
import { Box, ListItemIcon, ListItemText, MenuItem, Select, SvgIcon } from '@mui/material'
import _ from 'lodash'
import EthereumIcon from '../../../assets/ethereum'
import PolygonIcon from '../../../assets/polygon'
import AvalancheIcon from '../../../assets/avalanche'
export interface Props {
  onSelect: (chain: Chain) => void
}
const getChainIcon = (chain: Chain): JSX.Element => {
  switch (chain) {
    case 'ethereum':
      return <EthereumIcon width='1.5rem' height='1.5rem' color='gray' />
    case 'avalanche':
      return <AvalancheIcon width='1.5rem' height='1.5rem' color='red' />
    case 'polygon':
      return <PolygonIcon width='1.5rem' height='1.5rem' color='purple' />
    default:
      return <EthereumIcon width='1.5rem' height='1.5rem' color='gray' />
  }
}

const SelectChains = (): JSX.Element => {
  const CHAINS: Chain[] = ['ethereum', 'avalanche', 'polygon']
  return (
    <Select
      value={CHAINS[0]}
      renderValue={(value) => {
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {getChainIcon(value as Chain)}
            {_.capitalize(value)}
          </Box>
        )
      }}
    >
      {CHAINS.map((chain) => (
        <MenuItem key={chain} value={chain}>
          <ListItemIcon>{getChainIcon(chain)}</ListItemIcon>
          <ListItemText primary={_.capitalize(chain)} />
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectChains
