import { fabric } from 'fabric'
import { useEffect, useRef } from 'react'
import { useOnDraw } from 'hooks/useOnDraw'
import { Context } from 'vm'
import { CanvasRenderingContext2D } from 'canvas'
import { Point } from 'types'

type Props = {
  image: string
  width?: number
  height?: number
}

const Canvas = (props: Props) => {
  const { image, height, width } = props

  const onDraw = (
    ctx: CanvasRenderingContext2D,
    point: Point,
    prevPoint: Point
  ) => {
    drawLine(prevPoint, point, ctx, '#000000', 5)
  }

  const drawLine = (
    start: Point,
    end: Point,
    ctx: CanvasRenderingContext2D,
    colour: string,
    width: number
  ) => {
    start = start ?? end
    ctx.beginPath()
    ctx.lineWidth = width
    ctx.strokeStyle = colour
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()

    ctx.fillStyle = colour
    ctx.beginPath()
    ctx.arc(end.x, end.y, width / 2, 0, 2 * Math.PI)
    ctx.fill()
  }

  const { setCanvasRef, onMouseDown } = useOnDraw(onDraw)

  return (
    <canvas
      className="draw-canvas"
      width={width ? width : 300}
      height={height ? height : 300}
      onMouseDown={onMouseDown}
      ref={setCanvasRef}
    />
  )
}

export default Canvas
