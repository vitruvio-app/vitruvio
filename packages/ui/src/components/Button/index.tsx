import { Button } from '@mui/material'
import React from 'react'

export interface Props {
  text: string
  loading?: boolean
  disabled?: boolean
  loadingText?: string
  loadingIcon?: JSX.Element
  icon?: JSX.Element
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'inherit'
  onClick?: () => void
}

const ButtonComponent = ({ icon, text, loading, variant, color, disabled, onClick }: Props): JSX.Element => {
  return (
    <Button
      color={color}
      disabled={disabled}
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
