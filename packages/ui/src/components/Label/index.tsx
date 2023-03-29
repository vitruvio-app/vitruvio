import React from 'react'
import { Typography } from '@mui/material'

export interface Props {
  text: string
  variant?: 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'cation'
}

const Component = (props: Props): JSX.Element => {
  return <Typography variant={(props.variant as any) || 'subtitle1'}>{props.text}</Typography>
}

export default Component
