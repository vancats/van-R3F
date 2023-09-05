import { boxGeometry } from "./assets"


export default function Floor({ floorMaterial, position = [0, -0.1, 0] }) {
    return <mesh
        geometry={boxGeometry} material={floorMaterial}
        position={position}
        scale={[4, 0.2, 4]}
        receiveShadow
    />
}
