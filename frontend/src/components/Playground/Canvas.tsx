import { fabric } from 'fabric'
import { useEffect, useRef } from 'react'

type Props = {
  image: string
  width?: number
  height?: number
}

const Canvas = (props: Props) => {
  const { image, height, width } = props

  const style = {
    height: height ? `${height}px` : '',
    width: width ? `${width}px` : '',
  }

  return (
    <div className="canvas-container" style={style}>
      <canvas className='draw-canvas' width={width ? width : 300} height={height ? height : 300} />
    </div>
  )
}

export default Canvas
