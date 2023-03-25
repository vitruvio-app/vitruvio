import React from 'react'
import { Typography } from '@mui/material'

export interface Props {
  text: string
}

const Component = (props: Props): JSX.Element => {
  return <Typography variant='h1'>{props.text}</Typography>
}

export default Component
