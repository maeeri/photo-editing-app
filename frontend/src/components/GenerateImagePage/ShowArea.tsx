import { Container, Image } from 'react-bootstrap'

interface Props {
  imgUrls: Array<string>
}

const ShowArea = (props: Props) => {
  return (
    <Container>
      {props.imgUrls.map((url) => (
        <span key={url} title="open in a new tab">
          <a href={url} target="_blank" rel="noreferrer">
            <Image alt="generated image" className="generated-img" src={url} />
          </a>
        </span>
      ))}
    </Container>
  )
}

export default ShowArea
