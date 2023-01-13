import * as htmlToImage from 'html-to-image'
import FileSaver from 'file-saver'

type Props = {
  item: {
    image: string
  }
  style: {
    filter: string
  }
  resetOptions: () => void
}

const ImageArea = (props: Props) => {
  const { item, style, resetOptions } = props
  const img = document.getElementById('img')
  const downloadImage = async () => {
    if (img) {
      const res = await htmlToImage.toPng(img)
      if (res !== null) FileSaver.saveAs(res)
    }
  }

  return (
    <>
      <div className="main-img-container">
        <img
          className="main-img"
          id="img"
          src={item.image}
          alt="editable"
          style={style}
        />
      </div>
      <div className="open-img-btn">
        <button className="edit-area-btn" onClick={downloadImage}>
          download image
        </button>
        <button className="edit-area-btn" onClick={resetOptions}>
          reset
        </button>
      </div>
    </>
  )
}

export default ImageArea
