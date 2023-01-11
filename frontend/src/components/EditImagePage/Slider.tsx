type Props = {
  min: number
  max: number
  value: number
  handleChange: (target: any) => void
}

const Slider = (props: Props) => {
  return (
    <div className="slider-container">
      <input
        type="range"
        className="slider"
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  )
}

export default Slider
