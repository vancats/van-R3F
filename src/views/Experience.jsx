import { useControls } from 'leva'

import OrbitControl from './OrbitControl'
import Environment from './Environment'
import Texts from './Texts'
import Geometries from './Geometries'
import Performance from './Performance'
import Plane from '../component/Plane'
import Model from './Model'
import { Suspense } from 'react'
import PlaceHolder from '../component/PlaceHolder'
import Portal from './Portal'
import PostProcessing from './PostProcessing'
import Portfolio from './Portfolio'

export default function Experience() {

    const { envMapIntensity } = useControls('environment map', {
        envMapIntensity: { value: 3.5, min: 0, max: 12 },
    })

    return <>

        <Performance />

        <OrbitControl />

        <Environment />

        <Plane envMapIntensity={envMapIntensity} />

        <Geometries envMapIntensity={envMapIntensity} />

        {/* <Texts /> */}

        {/* <Suspense fallback={<PlaceHolder position-y={0.5} scale={[2, 3, 2]} />}>
            <Model />
        </Suspense> */}

        {/* <Portal /> */}

        {/* <PostProcessing /> */}

        {/* <Portfolio /> */}
    </>
}
