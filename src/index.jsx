import './styles/index.css'
import { createRoot } from 'react-dom/client'
import { Leva } from 'leva'
import Canvas from './views'
import { KeyboardControls } from '@react-three/drei'
import { keyboardMapping } from './utils'
import Interface from './game/Interface'

const root = createRoot(document.querySelector('#root'))
root.render(<>
    <Leva collapsed hidden={location.hash !== '#debug'} />
    <KeyboardControls map={keyboardMapping}    >
        <Canvas />
        <Interface />
    </KeyboardControls>
</>)

