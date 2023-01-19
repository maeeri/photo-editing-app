import GeneratedImage from './GeneratedImage'

interface Props {
  imgUrls: Array<string>
  token: string
  saveImageToDb: (img: any, width: number, height: number) => void
}

const ShowArea = (props: Props) => {
  const { imgUrls, token, saveImageToDb } = props
  return (
    <div>
      {imgUrls.map((url, i) => (
        <GeneratedImage key={i} imageUrl={url} index={i} token={token} saveImageToDb={saveImageToDb} />
      ))}
    </div>
  )
}

export default ShowArea
