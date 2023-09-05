import { Float, Text, Text3D } from "@react-three/drei"
import Floor from "../Floor"
import { floor1Material } from "../assets"

export default function BlockStart({ position = [0, 0, 0] }) {
    return <group position={position}>
        <Float floatIntensity={0.25} rotationIntensity={0.25}>
            <Text
                font='./fonts/bebas-neue-v9-latin-regular.woff'
                scale={4}
                maxWidth={0.25}
                lineHeight={0.75}
                textAlign='right'
                position={[0.75, 0.65, 0]}
                rotation-y={-0.25}
            >
                Marble Race
                <meshBasicMaterial toneMapped={false} />
            </Text>
        </Float>
        <Floor floorMaterial={floor1Material} />
    </group>
}
