import { useEffect, useState } from 'react'
import { useOnDraw } from 'hooks/useOnDraw'
import { CanvasRenderingContext2D } from 'canvas'
import { EditMode, Point, StrokeStyle } from 'types'
import * as htmlToImage from 'html-to-image'
import FileSaver from 'file-saver'

type Props = {
  id?: string
  onMouseDown: () => void
  setCanvasRef: (ref: any) => void
}

const Canvas = (props: Props) => {
  const { id, onMouseDown, setCanvasRef } = props
  return (
    <canvas
      className="show"
      id={id}
      onMouseDown={onMouseDown}
      ref={setCanvasRef}
    />
  )
}

export default Canvas
