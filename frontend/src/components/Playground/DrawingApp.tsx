import { useEffect, useState } from 'react'
import { useOnDraw } from 'hooks/useOnDraw'
import { CanvasRenderingContext2D } from 'canvas'
import { EditMode, Point, StrokeStyle } from 'types'
import * as htmlToImage from 'html-to-image'
import FileSaver from 'file-saver'
import Canvas from './Canvas'

type Props = {
  strokeStyle: StrokeStyle
  image?: string
}

const DrawingApp = (props: Props) => {
  const { strokeStyle, image } = props
  const [restoreArray, setRestoreArray] = useState<ImageData[]>([])
  const [index, setIndex] = useState<number>(-1)

  const colour = strokeStyle.colour

  const onDraw = (
    ctx: CanvasRenderingContext2D,
    point: Point,
    prevPoint: Point
  ) => {
    if (
      strokeStyle.mode === EditMode.Draw ||
      strokeStyle.mode === EditMode.Erase
    )
      drawLine(prevPoint, point, ctx, strokeStyle.strokeWidth)
  }

  const onEndDraw = (ctx: CanvasRenderingContext2D) => {
    if (
      strokeStyle.mode === EditMode.Draw ||
      strokeStyle.mode === EditMode.Erase
    )
      endDraw(ctx)
  }

  const { setCanvasRef, onMouseDown, canvasRef } = useOnDraw(onDraw, onEndDraw)

  useEffect(() => {
    drawCanvas()
  }, [])

  const drawCanvas = () => {
    const canvas = canvasRef.current as HTMLCanvasElement

    if (canvas) {
      canvas.width = window.innerWidth * 0.7
      canvas.height = window.innerHeight * 0.7

      if (image) {
        const img = createImgElement(image)
        const { width, height, marginLeft, marginTop } =
          img.width && img.height
            ? getResizedDimensions(
                img.width,
                img.height,
                canvas.width,
                canvas.height
              )
            : {
                width: canvas.width,
                height: canvas.height,
                marginTop: 0,
                marginLeft: 0,
              }
        const ctx = canvas.getContext('2d')
        if (ctx && canvasRef.current) {
          ctx.rect(marginLeft, marginTop, width, height)
          const pat = ctx.createPattern(img, 'no-repeat')
          ctx.fillStyle = pat ? pat : 'rgba(255, 255, 255, 0)'
          ctx.fill()
          ctx.drawImage(img, marginLeft, marginTop, width, height)
          const imageData = ctx.getImageData(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          ) as ImageData
          const newArray = restoreArray.concat(imageData)
          setIndex(index + 1)
          setRestoreArray(newArray)
        }
      }
    }
  }

  const drawLine = (
    start: Point,
    end: Point,
    ctx: CanvasRenderingContext2D,
    width: number
  ) => {
    try {
      setMode(ctx, strokeStyle.mode)
      start = start ?? end
      ctx.beginPath()
      ctx.lineWidth = width
      ctx.strokeStyle = colour
      ctx.fillStyle = colour
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.moveTo(start.x, start.y)
      ctx.lineTo(end.x, end.y)
      ctx.stroke()
    } catch (e: any) {
      console.log(e.message)
    }
  }

  const setMode = (ctx: CanvasRenderingContext2D, mode: EditMode) => {
    switch (mode) {
      case EditMode.Draw:
        ctx.globalCompositeOperation = 'source-over'
        break
      case EditMode.Erase:
        ctx.globalCompositeOperation = 'destination-out'
        break
      case EditMode.Select:
        break
      default:
        break
    }
  }

  const endDraw = (ctx: CanvasRenderingContext2D) => {
    ctx.stroke()
    ctx.closePath()
    if (canvasRef.current && ctx) {
      const imageData = ctx.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      ) as ImageData
      const newArray = restoreArray.concat(imageData)
      setIndex(index + 1)
      setRestoreArray(newArray)
    }
  }

  const getImage = async () => {
    htmlToImage
      .toBlob(document.getElementById('canvas-area') as HTMLElement)
      .then(function (blob) {
        FileSaver.saveAs(blob as Blob, 'item.png')
      })
  }

  const createImgElement = (imgUrl: string): HTMLImageElement => {
    const img = document.createElement('img')
    img.src = imgUrl
    img.classList.add('canvas-image')
    img.id = 'created-img'
    img.crossOrigin = 'Anonymous'
    return img
  }

  const getResizedDimensions = (
    width: number,
    height: number,
    maxWidth: number,
    maxHeight: number
  ) => {
    let marginLeft = 0
    let marginTop = 0
    if (width > height) {
      if (width > maxWidth) {
        height = height * (maxWidth / width)
        width = maxWidth
        marginTop = Math.floor((maxHeight - height) / 2)
      }
    } else {
      if (height > maxHeight) {
        width = width * (maxHeight / height)
        height = maxHeight
        marginLeft = Math.floor((maxWidth - width) / 2)
      }
    }
    return { width, height, marginLeft, marginTop }
  }

  const clearCanvas = () => {
    if (canvasRef.current?.width && canvasRef.current.height) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.fillStyle = 'rgb(255, 255, 255, 0)'
        ctx.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height)
        ctx.fillRect(0, 0, canvasRef.current?.width, canvasRef.current?.height)

        setRestoreArray([])
        setIndex(-1)
        drawCanvas()
      }
    }
  }

  const undoLast = () => {
    const ctx = canvasRef.current
      ? canvasRef.current.getContext('2d', { willReadFrequently: true })
      : null
    if (index <= 0) {
      clearCanvas()
    } else {
      const newArray = restoreArray.slice(0, index)
      setRestoreArray(newArray)
      setIndex(index - 1)

      if (ctx) ctx.putImageData(restoreArray[index - 1], 0, 0)
    }
  }

  return (
    <>
      <div className="box">
        <div id="canvas-background" className="show">
          <div id="background-hider">
            <Canvas
              onMouseDown={onMouseDown}
              setCanvasRef={setCanvasRef}
              id="canvas-area"
            />
          </div>
        </div>
        <div className="playground-buttons">
          <button className="playground-btn" onClick={() => getImage()}>
            download
          </button>
          {/* <button className="playground-btn" onClick={undoLast}>
            Undo
          </button> */}
          <button className="playground-btn" onClick={clearCanvas}>
            Clear
          </button>
          <TogglerButton
            element={document.getElementById('background-hider') as HTMLElement}
          />
        </div>
      </div>
    </>
  )
}

const TogglerButton = (props: any) => {
  const [show, setShow] = useState(false)
  const element = props.element
  const toggleBackground = () => {
    if (element.style.background === 'white') {
      element.style.background = ''
      setShow(false)
    } else {
      element.style.background = 'white'
      setShow(true)
    }
  }
  const label = show ? 'Show transparency' : 'Hide transparency'

  return (
    <button className="playground-btn" onClick={toggleBackground}>
      {label}
    </button>
  )
}

export default DrawingApp
