import { Container, Image } from 'react-bootstrap'

interface Props {
  imgUrls: Array<string>
}

const ShowArea = (props: Props) => {
  return <Container className='show-area'>
    {props.imgUrls.map((url) => <Image className='generated-img' key={url} src={url} />)}
  </Container>
}

export default ShowArea
