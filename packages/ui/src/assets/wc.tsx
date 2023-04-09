import React from 'react'

interface Props {
  width?: string
  height?: string
  strokeWidth?: string
  color?: string
}

const WalletConnectIcon = (props: Props): JSX.Element => {
  return (
    <svg
      width={props.width || 25}
      height={props.height || 25}
      strokeWidth={props.strokeWidth || '2.58px'}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 64 64'
      fill='none'
      stroke={props.color || 'black'}
    >
      <path d='m44 34-6 6-6-6-6 6-6-6' />
      <path d='M23.51 27.51a12 12 0 0 1 17 0' />
      <circle cx='32' cy='32' r='24' />
    </svg>
  )
}

export default WalletConnectIcon
