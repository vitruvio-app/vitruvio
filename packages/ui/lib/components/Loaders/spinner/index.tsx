import styled, { keyframes } from 'styled-components'
export interface Props {
  height?: string
  width?: string
  color?: string
  secondary?: string
  borderWidth?: string
}
// https://cssloaders.github.io/
const Spinner = (props: Props): JSX.Element => {
  const rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    `

  const Loader = styled.div`
    width: ${props.width || '25px'};
    height: ${props.height || '25px'};
    border: ${props.borderWidth} solid ${props.color};
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${rotation} 1s linear infinite;
  `
  return <Loader />
}

export default Spinner
