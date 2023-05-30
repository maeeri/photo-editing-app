import { useEffect, useState } from 'react'
import { useOnDraw } from 'hooks/useOnDraw'
import { CanvasRenderingContext2D } from 'canvas'
import { EditMode, Point, StrokeStyle } from 'types'
import * as htmlToImage from 'html-to-image'
import FileSaver from 'file-saver'
import Canvas from './Canvas'

type Props = {
  strokeStyle: StrokeStyle
  image: string
  style: {
    filter: string
  }
  resetOptions: () => void
}

const DrawingApp = (props: Props) => {
  const { strokeStyle, image, style, resetOptions } = props
  const [restoreArray, setRestoreArray] = useState<ImageData[]>([])
  const [index, setIndex] = useState<number>(-1)

  const colour = strokeStyle.draw.colour

  const onDraw = (
    ctx: CanvasRenderingContext2D,
    point: Point,
    prevPoint: Point
  ) => {
    if (strokeStyle.mode === EditMode.Draw) {
      drawLine(prevPoint, point, ctx, strokeStyle.draw.strokeWidth)
    } else if (strokeStyle.mode === EditMode.Erase) {
      drawLine(prevPoint, point, ctx, strokeStyle.erase.strokeWidth)
    }
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

  const drawCanvas = async () => {
    const canvas = canvasRef.current as HTMLCanvasElement

    if (canvas) {
      canvas.width = window.innerWidth * 0.7
      canvas.height = window.innerHeight * 0.7

      if (canvas && image) {
        const img = await createImgElement(image)

        if (img.width > canvas.width) img.width = canvas.width
        else canvas.width = img.width

        if (img.height > canvas.height) img.height = canvas.height
        else canvas.height = img.height

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
      if (colour) {
        ctx.strokeStyle = colour
        ctx.fillStyle = colour
      }
      setMode(ctx, strokeStyle.mode)
      start = start ?? end
      ctx.beginPath()
      ctx.lineWidth = width
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

  // const undoDraw = () => {
  //   const ctx = canvasRef.current?.getContext('2d')
  //   const newArray = restoreArray.slice(0, -1)
  //   setRestoreArray(newArray)
  //   console.log(restoreArray)
  // }

  const createImgElement = async (imgUrl: string) => {
    const img = await document.createElement('img')
    img.src = imgUrl
    img.classList.add('canvas-image')
    img.classList.add('main-img')
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
    resetOptions()
    if (canvasRef.current?.width && canvasRef.current.height) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        setRestoreArray([])
        setIndex(-1)
        drawCanvas()
      }
    }
  }

  return (
    <>
      <div className="box">
        <div id="canvas-background" className="show">
          <div id="background-hider">
            <Canvas
              style={style}
              onMouseDown={onMouseDown}
              setCanvasRef={setCanvasRef}
              id="canvas-area"
            />
          </div>
        </div>
        <div className="open-img-btn">
          <button className="playground-btn" onClick={() => getImage()}>
            download
          </button>
          {/* <button className="edit-area-btn" onClick={undoDraw}>
            undo
          </button> */}
          <button className="edit-area-btn" onClick={clearCanvas}>
            reset
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
  const label = show ? 'show transparency' : 'hide transparency'

  return (
    <button className="playground-btn" onClick={toggleBackground}>
      {label}
    </button>
  )
}

export default DrawingApp
