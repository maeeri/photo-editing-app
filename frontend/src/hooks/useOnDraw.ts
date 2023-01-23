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

  const touchStartListenerRef = useRef<Function | null | any>(null)
  const touchEndListenerRef = useRef<Function | null | any>(null)
  const touchMoveListenerRef = useRef<Function | null | any>(null)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D

    initMouseMoveListener(ctx)
    initTouchStartListener(ctx)
    initTouchMoveListener(ctx)
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
    if (touchStartListenerRef.current) {
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

  const initEndDrawListener = (ctx: CanvasRenderingContext2D) => {
    const listener = () => {
      onEndDraw(ctx)
      isDrawingRef.current = false
      prevPointRef.current = null
    }
    endDrawListenerRef.current = listener
    canvasRef.current?.addEventListener('mouseup', listener)
    canvasRef.current?.addEventListener('touchend', listener)
  }

  const initTouchStartListener = (ctx: CanvasRenderingContext2D) => {
    const touchStartListener = (e: any) => {
      if (isDrawingRef && ctx) {
        e.preventDefault()
        isDrawingRef.current = true
        const point = computePointInCanvas(
          e.touches[0].clientX,
          e.touches[0].clientY
        )
        if (onDraw) onDraw(ctx, point, prevPointRef.current)
        prevPointRef.current = point
      }
    }
    touchStartListenerRef.current = touchStartListener
    canvasRef.current?.addEventListener('touchstart', touchStartListener, false)
  }

  const initTouchMoveListener = (ctx: CanvasRenderingContext2D) => {
    const listener = (e: any) => {
      e.preventDefault()
      const touches = Object.values(e.touches)
      touches.forEach((touch: any) => {
        const point = computePointInCanvas(
          touch.clientX,
          touch.clientY
        ) as Point
        if (isDrawingRef.current) {
          if (onDraw) onDraw(ctx, point, prevPointRef.current)
        }
        prevPointRef.current = point
      })
    }
    touchMoveListenerRef.current = listener
    canvasRef.current?.addEventListener('touchmove', listener)
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
