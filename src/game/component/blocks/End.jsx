import { useGLTF, Float, Text, Text3D } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import Floor from "../Floor"
import { floor1Material } from "../assets"

export default function BlockEnd({ position = [0, 0, 0] }) {

    const hamburger = useGLTF('./models/Hamburger/hamburger-class.glb')

    hamburger.scene.children.forEach(mesh => {
        mesh.castShadow = true
    })

    return <group position={position}>

        <Float floatIntensity={0.25} rotationIntensity={0.25}>
            <Text
                font='./fonts/bebas-neue-v9-latin-regular.woff'
                scale={8}
                position={[0, 2.25, 2]}
            >
                FINISH
                <meshBasicMaterial toneMapped={false} />
            </Text>
        </Float>

        <Floor floorMaterial={floor1Material} position={[0, 0, 0]} />
        <RigidBody
            type='fixed'
            colliders='hull'
            restitution={0.2}
            friction={0}
            position={[0, 0.25, 0]}
        >
            <primitive object={hamburger.scene} scale={0.2} />
        </RigidBody>
    </group>
}

