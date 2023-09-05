import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import Floor from '../Floor'
import { floor2Material, boxGeometry, obstacleMaterial } from "../assets"

export default function BlockSpinner({ position = [0, 0, 0] }) {

    const obstacle = useRef()
    const [speed] = useState((Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1))

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        obstacle.current.setNextKinematicRotation(rotation)
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
