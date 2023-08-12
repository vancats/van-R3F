import OrbitControl from './OrbitControl'
import Environment from './Environment'
import WelcomeText from './WelcomeText'
import Geometries from './Geometries'
import Performance from './Performance'

export default function Experience() {

    return <>
        <Performance />

        <OrbitControl />

        <Environment />

        <Geometries />

        <WelcomeText />
    </>
}
