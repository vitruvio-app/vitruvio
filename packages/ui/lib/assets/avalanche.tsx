interface Props {
  width?: string
  height?: string
  strokeWidth?: string
  color?: string
}
const AvalancheIcon = (props: Props): JSX.Element => {
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
        <path d='M36.71 26.17 28.16 41a2 2 0 0 1-1.73 1h-6a2 2 0 0 1-1.73-3l11.57-20a2 2 0 0 1 3.46 0l3 5.16a2 2 0 0 1-.02 2.01z' />
        <path d='M43.54 42H38a2 2 0 0 1-1.73-3L39 34.17a2 2 0 0 1 3.46 0L45.27 39a2 2 0 0 1-1.73 3z' />
        <circle cx='32' cy='32' r='24' />
      </svg>
    </>
  )
}

export default AvalancheIcon
