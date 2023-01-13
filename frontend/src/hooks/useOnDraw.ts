import { useRef, useEffect } from 'react'
import { Point } from 'types'

export const useOnDraw = (
  onDraw: (ctx: any, point: any, prevPoint: any) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef<boolean>(false)
  const prevPointRef = useRef<Point | null>(null)

  const mouseMoveListenerRef = useRef<Function | null | any>(null)
  const mouseUpListenerRef = useRef<Function | null | any>(null)

  useEffect(() => {
    const initMouseMoveListener = () => {
      const mouseMoveListener = (e: any) => {
        if (isDrawingRef.current) {
          const point = computePointInCanvas(e.clientX, e.clientY)
          const ctx = canvasRef.current?.getContext('2d')
          if (onDraw) onDraw(ctx, point, prevPointRef.current)
          prevPointRef.current = point
        }
      }
      mouseMoveListenerRef.current = mouseMoveListener
      window.addEventListener('mousemove', mouseMoveListener)
    }

    const initMouseUpListener = () => {
      if (!canvasRef.current) return
      const listener = () => {
        isDrawingRef.current = false
        prevPointRef.current = null
      }
      mouseUpListenerRef.current = listener
      window.addEventListener('mouseup', listener)
    }

    const removeListeners = () => {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener('mousemove', mouseMoveListenerRef.current)
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener('mouseup', mouseUpListenerRef.current)
      }
    }

    initMouseMoveListener()
    initMouseUpListener()

    return () => {
      removeListeners()
    }
  }, [onDraw])

  const computePointInCanvas = (
    clientX: number,
    clientY: number
  ): Point | null => {
    if (!canvasRef.current) return null

    const boundingRect = canvasRef.current.getBoundingClientRect()
    const x = clientX - boundingRect.left
    const y = clientY - boundingRect.top

    return {
      x: x,
      y: y,
    }
  }

  const setCanvasRef = (ref: any) => {
    canvasRef.current = ref
  }

  const onMouseDown = () => {
    isDrawingRef.current = true
  }

  return { setCanvasRef, onMouseDown }
}
