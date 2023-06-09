import React from 'react'
interface Props {
  width?: string
  height?: string
  strokeWidth?: string
  color?: string
}
const PolygonIcon = (props: Props): JSX.Element => {
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
        <path d='M40 20v28l8 4 8-4V20l-8-4-8 4z' />
        <path d='M40 28 16 16l-8 4v28l8 4 8-4V36' />
        <path d='m56 20-8 4-8-4' />
        <path d='M48 52V24' />
        <path d='M16 52V32l16 8 8-4' />
        <path d='m40 28-8 4L8 20' />
        <path d='M32 32v8' />
      </svg>
    </>
  )
}

export default PolygonIcon
