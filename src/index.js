import './styles/index.css'
import { createRoot } from 'react-dom/client'
import { Leva } from 'leva'
import Canvas from './views'

const root = createRoot(document.querySelector('#root'))

root.render(<>
    <Leva collapsed />
    <Canvas />
</>)

