type Props = {
  id?: string
  onMouseDown: () => void
  setCanvasRef: (ref: any) => void
  style: {
    filter: string
  }
}

const Canvas = (props: Props) => {
  const { id, onMouseDown, setCanvasRef, style } = props
  return (
    <canvas
      style={style}
      className="show main-img"
      id={id}
      onMouseDown={onMouseDown}
      ref={setCanvasRef}
    />
  )
}

export default Canvas
