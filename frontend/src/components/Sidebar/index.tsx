import SideBarItem from './SideBarItem'

type Props = {
  options: {
      name: string
    }[]
  selectedOptionsIndex: number
  setSelectedOptionsIndex: (n: number) => void
}

const Sidebar = (props: Props) => {
    const {options, selectedOptionsIndex, setSelectedOptionsIndex} = props
  return (
    <div className="sidebar">
      {options.map((o, i) => (
        <SideBarItem
          key={i}
          name={o.name}
          active={i === selectedOptionsIndex}
          handleClick={() => setSelectedOptionsIndex(i)}
        />
      ))}
    </div>
  )
}

export default Sidebar
