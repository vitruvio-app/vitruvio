interface Props {
  width?: string
  height?: string
  strokeWidth?: string
  color?: string
}
const BinanceChainIcon = (props: Props): JSX.Element => {
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
        <path d='m12 36-4-4 4-4' />
        <path d='m52 28 4 4-4 4' />
        <path d='m24 32 7.998-7.997L39.995 32l-7.997 7.997z' />
        <path d='M44 44 32 56 20 44' />
        <path d='M44 20 32 8 20 20' />
      </svg>
    </>
  )
}

export default BinanceChainIcon
