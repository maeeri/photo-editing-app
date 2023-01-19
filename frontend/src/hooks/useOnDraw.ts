import { useRef, useEffect } from 'react'
import { Point } from 'types'

export const useOnDraw = (
  onDraw: (ctx: any, point: any, prevPoint: any) => void,
  onEndDraw: (ctx: any) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef<boolean>(false)
  const prevPointRef = useRef<Point | null>(null)

  const mouseMoveListenerRef = useRef<Function | null | any>(null)
  const mouseUpListenerRef = useRef<Function | null | any>(null)
  const endDrawListenerRef = useRef<Function | null | any>(null)

  const touchDownListenerRef = useRef<Function | null | any>(null)
  const touchEndListenerRef = useRef<Function | null | any>(null)
  const touchMoveListenerRef = useRef<Function | null | any>(null)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d', {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D

    initMouseMoveListener(ctx)
    initMouseUpListener()
    initTouchStartListener(ctx)
    initTouchMoveListener(ctx)
    initTouchEndListener()
    initEndDrawListener(ctx)

    return () => {
      removeListeners()
    }
  }, [onDraw])

  const removeListeners = () => {
    if (mouseMoveListenerRef.current) {
      window.removeEventListener('mousemove', mouseMoveListenerRef.current)
    }
    if (mouseUpListenerRef.current) {
      window.removeEventListener('mouseup', mouseUpListenerRef.current)
    }
    if (touchDownListenerRef.current) {
      window.removeEventListener('touchdown', mouseUpListenerRef.current)
    }
    if (touchMoveListenerRef.current) {
      window.removeEventListener('touchmove', mouseUpListenerRef.current)
    }
    if (touchEndListenerRef.current) {
      window.removeEventListener('touchend', mouseUpListenerRef.current)
    }
    if (endDrawListenerRef.current) {
      window.removeEventListener('mouseup', endDrawListenerRef.current)
    }
  }

  const initMouseMoveListener = (ctx: CanvasRenderingContext2D) => {
    const mouseMoveListener = (e: any) => {
      if (isDrawingRef.current) {
        const point = computePointInCanvas(e.clientX, e.clientY)
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

  const initEndDrawListener = (ctx: CanvasRenderingContext2D) => {
    const listener = () => {
      onEndDraw(ctx)
    }
    endDrawListenerRef.current = listener
    canvasRef.current?.addEventListener('mouseup', listener)
  }

  const initTouchStartListener = (ctx: CanvasRenderingContext2D) => {
    const touchStartListener = (e: any) => {
      if (isDrawingRef && ctx) {
        e.preventDefault()
        isDrawingRef.current = true
        // ctx.beginPath()
        const { x, y } = computePointInCanvas(e.clientX, e.clientY) as Point
        ctx.moveTo(x, y)
      }
    }
    touchStartListener.current = touchStartListener
    canvasRef.current?.addEventListener('touchstart', touchStartListener, false)
  }

  //does not yet work, prevPointRef has issues, seems to be setting itself to current point before onDraw
  const initTouchMoveListener = (ctx: CanvasRenderingContext2D) => {
    const touchMoveListener = (e: any) => {
      if (isDrawingRef.current) {
        const point = computePointInCanvas(
          e.touches[0].clientX,
          e.touches[0].clientY
        ) as Point

        if (onDraw) onDraw(ctx, point, prevPointRef.current)
        prevPointRef.current = point
      }
    }
    touchMoveListenerRef.current = touchMoveListener
    window.addEventListener('touchmove', touchMoveListener, false)
  }

  const initTouchEndListener = () => {
    if (!canvasRef.current) return
    const listener = () => {
      isDrawingRef.current = false
      prevPointRef.current = null
    }
    touchEndListenerRef.current = listener
    window.addEventListener('touchend', listener)
  }

  const computePointInCanvas = (
    clientX: number,
    clientY: number
  ): Point | null => {
    if (!canvasRef.current) return null
    return {
      x: clientX - canvasRef.current.offsetLeft,
      y: clientY - canvasRef.current.offsetTop,
    }
  }

  const setCanvasRef = (ref: any) => {
    canvasRef.current = ref
  }

  const onMouseDown = () => {
    isDrawingRef.current = true
  }

  return { setCanvasRef, onMouseDown, canvasRef }
}
