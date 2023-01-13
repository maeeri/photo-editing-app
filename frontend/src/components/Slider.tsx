type Props = {
  min: number
  max: number
  value: number
  handleChange: (target: any) => void
}

const Slider = (props: Props) => {
  const {min, max, value, handleChange} = props
  return (
    <div className="slider-container">
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default Slider
