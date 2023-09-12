interface Props {
  width?: string
  height?: string
  strokeWidth?: string
  color?: string
}
const EthereumIcon = (props: Props): JSX.Element => {
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
        <path d='M32 56 16 32 32 8l16 24-16 24z' />
        <path d='m16 32 16 8 16-8' />
        <path d='M32 8v48' />
      </svg>
    </>
  )
}

export default EthereumIcon
