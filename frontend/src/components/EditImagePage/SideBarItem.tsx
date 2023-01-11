type Props = {
  name: string
  active: boolean
  handleClick: () => void
}

const SideBarItem = (props: Props) => {
  return (
    <button
      onClick={props.handleClick}
      className={`sidebar-item ${props.active ? 'active' : ''}`}
    >
      {props.name}
    </button>
  )
}

export default SideBarItem
