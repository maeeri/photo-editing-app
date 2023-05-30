import { Image } from 'react-bootstrap'

type Props = {
  imageUrl: string
  index: number
  token: string
  saveImageToDb: (img: any, width: number, height: number) => void
}

interface ImageHtml extends HTMLElement {
  src?: string
  height?: number
  width?: number
  crossOrigin?: string
}

const GeneratedImage = (props: Props) => {
  const { imageUrl, index } = props
  const idString = `list-img-${index}`

  const saveImage = async () => {
    const img: ImageHtml | null = document.getElementById(idString)
    if (img && img.height && img.width) {
    //   await saveImageToDb(img, img.width, img.height)
    }
  }

  return (
    <span onClick={saveImage} title="save image">
      <Image
        id={idString}
        alt="generated image"
        className="generated-img"
        src={imageUrl}
      />
    </span>
  )
}

export default GeneratedImage
