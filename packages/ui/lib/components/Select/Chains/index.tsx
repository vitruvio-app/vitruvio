import { useState } from 'react'
import { Chain } from '@vitruvio/types'
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material'
import _ from 'lodash'
import EthereumIcon from '../../../assets/ethereum'
import PolygonIcon from '../../../assets/polygon'
import AvalancheIcon from '../../../assets/avalanche'
import FantomIcon from '../../../assets/fantom'
import BinanceChainIcon from '../../../assets/bsc'
export interface Props {
  onSelect?: (chain: Chain) => void
}

const getChainIcon = (chain: Chain): JSX.Element => {
  switch (chain) {
    case 'ethereum':
      return <EthereumIcon width='1.5rem' height='1.5rem' color='gray' />
    case 'avalanche':
      return <AvalancheIcon width='1.5rem' height='1.5rem' color='red' />
    case 'polygon':
      return <PolygonIcon width='1.5rem' height='1.5rem' color='purple' />
    case 'fantom':
      return <FantomIcon width='1.5rem' height='1.5rem' color='#1D66F1' />
    case 'bsc':
      return <BinanceChainIcon width='1.5rem' height='1.5rem' color='#f3ba2f' />
    default:
      return <EthereumIcon width='1.5rem' height='1.5rem' color='gray' />
  }
}

const SelectChains = (props: Props): JSX.Element => {
  const CHAINS: Chain[] = ['ethereum', 'avalanche', 'polygon', 'fantom', 'bsc']
  const [selectedChain, setSelectedChain] = useState<Chain>('ethereum')
  return (
    <Select
      value={selectedChain}
      onChange={(e) => {
        setSelectedChain(e.target.value as Chain)
        props.onSelect && props.onSelect(e.target.value as Chain)
      }}
      renderValue={(value) => {
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {getChainIcon(value as Chain)}
            {value === 'bsc' ? 'Binance' : _.capitalize(value)}
          </Box>
        )
      }}
    >
      {CHAINS.map((chain) => (
        <MenuItem key={chain} value={chain}>
          <ListItemIcon>{getChainIcon(chain)}</ListItemIcon>
          <ListItemText
            primary={chain === 'bsc' ? 'Binance' : _.capitalize(chain)}
          />
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectChains
