import { useGLTF, Clone } from "@react-three/drei"
import Hamburger from "../component/models/Hamburger"
import Fox from "../component/models/Fox"

export default function Model() {
    return <>
        <Hamburger scale={1} position-x={-2} />
        <Fox />
    </>
}
