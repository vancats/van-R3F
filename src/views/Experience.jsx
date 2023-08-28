import { useControls } from 'leva'

import OrbitControl from './OrbitControl'
import Environment from './Environment'
import Texts from './Texts'
import Geometries from './Geometries'
import Performance from './Performance'
import Model from './Model'
import { Suspense } from 'react'
import PlaceHolder from '../component/PlaceHolder'
import Portal from './Portal'
import PostProcessing from './PostProcessing'
import Portfolio from './Portfolio'
import Physics from './Physics'

export default function Experience() {


    return <>

        <Performance />

        <OrbitControl />

        <Environment />

        {/* <Geometries /> */}

        {/* <Texts /> */}

        {/* <Suspense fallback={<PlaceHolder position-y={0.5} scale={[2, 3, 2]} />}>
            <Model />
        </Suspense> */}

        {/* <Portal /> */}

        {/* <PostProcessing /> */}

        {/* <Portfolio /> */}

        <Physics />
    </>
}
