import { Watch } from 'react-loader-spinner'

type Props = {
  show: boolean
}

const Loader = ({ show }: Props) => {
  const style = { display: show ? 'inline-block' : 'none' }
  return (
    <div id="overlay" style={style}>
      <div id="loader">
        <Watch
          height="80"
          width="80"
          radius="48"
          color="#4fa94d"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
        />
      </div>
    </div>
  )
}

export default Loader
