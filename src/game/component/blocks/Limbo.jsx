import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import Floor from '../Floor'
import { floor2Material, boxGeometry, obstacleMaterial } from "../assets"

export default function BlockLimbo({ position = [0, 0, 0] }) {
    const obstacle = useRef()
    const [timeOffset] = useState(Math.random() * Math.PI * 2)

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const y = Math.sin(time * timeOffset) + 1.15
        obstacle.current.setNextKinematicTranslation({ x: position[0], y: position[1] + y, z: position[2] })
    })

    return <group position={position}>
        <Floor floorMaterial={floor2Material} />
        <RigidBody
            ref={obstacle}
            type='kinematicPosition'
            position={[0, 0.3, 0]}
            restitution={0.2}
            friction={0}
        >
            <mesh
                geometry={boxGeometry} material={obstacleMaterial}
                scale={[3.5, 0.3, 0.3]}
                receiveShadow castShadow
            />
        </RigidBody>
    </group >
}

