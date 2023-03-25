import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'

export interface Props {
  height: string
  width: string
}

const VitruvioLoader = (props: Props): JSX.Element => {
  return (
    <Player
      autoplay
      loop
      src='https://lottie.host/8d3728e2-c1a5-44fd-a324-4f03d17e6fcd/8oVos9HkGK.json'
      style={{ height: props.height, width: props.width }}
    ></Player>
  )
}

export default VitruvioLoader
