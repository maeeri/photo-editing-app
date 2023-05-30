import * as htmlToImage from 'html-to-image'
import FileSaver from 'file-saver'
import DrawingApp from './DrawingApp'
import { StrokeStyle, EditMode } from 'types'
import { useState } from 'react'

type Props = {
  item: {
    image: string
  }
  style: {
    filter: string
  }
  resetOptions: () => void
  strokeStyle: StrokeStyle
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
      <div id="img" className="main-img-container">
        <DrawingApp resetOptions={resetOptions} style={style} strokeStyle={props.strokeStyle} image={item.image} />
      </div>
    </>
  )
}

export default ImageArea
