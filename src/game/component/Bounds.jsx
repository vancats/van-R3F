import { CuboidCollider, RigidBody } from "@react-three/rapier"
import { boxGeometry, wallMaterial } from "./assets"

export default function Bounds({ length = 1 }) {
    return <>
        <RigidBody type="fixed" restitution={0.2} friction={0}>
            <mesh
                geometry={boxGeometry}
                material={wallMaterial}
                position={[2.15, 0.75, length * -2 + 2]}
                scale={[0.3, 1.5, length * 4]}
                receiveShadow
            />
            <mesh
                geometry={boxGeometry}
                material={wallMaterial}
                position={[-2.15, 0.75, length * -2 + 2]}
                scale={[0.3, 1.5, length * 4]}
                receiveShadow
            />
            <mesh
                geometry={boxGeometry}
                material={wallMaterial}
                position={[0, 0.75, length * -4 + 2]}
                scale={[4, 1.5, 0.3]}
                receiveShadow
            />
            <CuboidCollider
                args={[2, 0.1, length * 2]}
                position={[0, -0.1, length * -2 + 2]}
                restitution={0.2}
                friction={1}
            />
        </RigidBody>
    </>
}
