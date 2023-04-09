import React from 'react'
interface Props {
  width?: string
  height?: string
  strokeWidth?: string
  color?: string
}
const FantomIcon = (props: Props): JSX.Element => {
  return (
    <>
      <svg
        width={props.width || 64}
        height={props.height || 64}
        strokeWidth={props.strokeWidth || '2.58px'}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 64 64'
        fill='none'
        stroke={props.color || 'black'}
      >
        <path d='m48 32-13.55 7.62a5 5 0 0 1-4.9 0L16 32' />
        <path d='m48 32-13.55-7.62a5 5 0 0 0-4.9 0L16 32' />
        <path d='M16 20v24' />
        <path d='m16 48 13.55 7.62a5 5 0 0 0 4.9 0l11-6.19A5 5 0 0 0 48 45.08V18.92a5 5 0 0 0-2.55-4.35l-11-6.19a5 5 0 0 0-4.9 0L16 16' />
        <path d='M11.6 56C9.19 54.54 8 54 8 50.34' />
        <path d='M52.4 8c2.41 1.46 3.6 2 3.6 5.66' />
      </svg>
    </>
  )
}

export default FantomIcon
