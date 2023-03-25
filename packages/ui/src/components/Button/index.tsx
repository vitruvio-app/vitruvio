import { Button } from '@mui/material'
import React from 'react'

export interface Props {
  text: string
  loading?: boolean
  icon?: JSX.Element
  variant?: 'text' | 'outlined' | 'contained'
  onClick?: () => void
}

const ButtonComponent = ({ icon, text, loading, variant, onClick }: Props): JSX.Element => {
  return (
    <Button
      onClick={() => {
        onClick && onClick()
      }}
      variant={variant}
      startIcon={icon}
    >
      {loading ? 'Is loading' : text}
    </Button>
  )
}

export default ButtonComponent
