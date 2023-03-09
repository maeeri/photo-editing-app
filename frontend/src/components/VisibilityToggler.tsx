type Props = {
  elementToShow: HTMLElement
  elementToHide?: HTMLElement
  id?: string
  label: string
}

const VisibilityToggler = (props: Props) => {
  const { elementToShow, elementToHide, id, label } = props
  console.log(elementToShow)
  const toggleVisibility = () => {
    if (elementToShow && elementToHide) {
      elementToShow.classList.remove('hide')
      elementToShow.classList.add('show')

      elementToHide.classList.remove('show')
      elementToHide.classList.add('hide')
    } else if (
      elementToShow &&
      elementToShow.classList.value.includes('hide')
    ) {
      elementToShow.classList.remove('hide')
      elementToShow.classList.add('show')
    } else if (elementToShow) {
      elementToShow.classList.remove('show')
      elementToShow.classList.add('hide')
    }
  }
  return (
    <button onClick={toggleVisibility} id={id} className="button">
      {label}
    </button>
  )
}

export default VisibilityToggler
