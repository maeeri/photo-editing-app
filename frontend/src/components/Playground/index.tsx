import Canvas from './Canvas'
import 'css/playground.css'
import Sidebar from 'components/Sidebar'

const Playground = () => {
  return (
    <div className="container playground-container">
      <Canvas
        width={1200}
        height={1200}
        image="https://images.unsplash.com/photo-1673471879922-e31f84e27709?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
      />
      <div className='playground-sidebar'>
        <Sidebar options={[{name: 'test'}]} selectedOptionsIndex={0} setSelectedOptionsIndex={(n) => console.log(n)} />
        </div>
    </div>
  )
}

export default Playground
