import { useFrame } from '@react-three/fiber'
import {
    Physics, RigidBody, Debug,
    CuboidCollider, BallCollider, CylinderCollider, InstancedRigidBodies,
} from '@react-three/rapier'
import * as THREE from 'three'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

export default function () {

    const cube = useRef()
    const cubeJump = () => {
        console.log(cube.current)

        const mass = cube.current.mass()

        cube.current.applyImpulse({
            x: 0,
            y: 5,
            z: 0
        })
        cube.current.applyTorqueImpulse({
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
            z: Math.random() - 0.5
        })
    }

    const twister = useRef()
    useFrame((state, delta) => {
        // rotation
        const time = state.clock.getElapsedTime()
        const eulerRotation = new THREE.Euler(0, time * 3, 0)
        const quaternionRotation = new THREE.Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        twister.current.setNextKinematicRotation(quaternionRotation)

        // position
        const angle = time * 0.5
        const x = Math.cos(angle)
        const z = Math.sin(angle)
        twister.current.setNextKinematicTranslation({ x, y: -0.8, z })
    })

    const [hitSound] = useState(() => new Audio('./video/hit.mp3'))
    const collisionEnter = () => {
        console.log('collision')
        // hitSound.currentTime = 0
        // hitSound.volume = Math.random()
        // hitSound.play()
    }

    const hamburger = useGLTF('./models/Hamburger/hamburger-class.glb')

    const cubesCount = 300
    const cubes = useRef()
    const cubesTransforms = useMemo(() => {
        const positions = []
        const rotations = []
        const scales = []

        for (let i = 0; i < cubesCount; i++) {
            positions.push([
                (Math.random() - 0.5) * 8,
                6 + i * 0.2,
                (Math.random() - 0.5) * 8,
            ])
            rotations.push([
                Math.random(),
                Math.random(),
                Math.random(),
            ])

            const scale = 0.2 + Math.random() * 0.8
            scales.push([scale, scale, scale])
        }

        return { positions, rotations, scales }
    })

    // useEffect(() => {
    //     for (let i = 0; i < cubesCount; i++) {
    //         const matrix = new THREE.Matrix4()
    //         matrix.compose(
    //             new THREE.Vector3(i * 2, 0, 0),
    //             new THREE.Quaternion(),
    //             new THREE.Vector3(1, 1, 1),
    //         )
    //         cubes.current.setMatrixAt(i, matrix)
    //     }
    // }, [])

    return <Physics gravity={[0, -9.08, 0]}>
        <Debug />

        {/* Floor */}
        <RigidBody
            type='fixed'
            position-y={-1.25}
            restitution={0}
            friction={0.7}
        >
            <mesh receiveShadow>
                <boxGeometry args={[10, 0.5, 10]} />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </RigidBody>

        {/* Sphere */}
        <RigidBody colliders='ball' position={[-2, 2, 0]}>
            <mesh castShadow >
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
        </RigidBody>

        {/* Box */}
        <RigidBody
            ref={cube}
            position={[2, 2, 0]}
            gravityScale={1}
            restitution={0}
            friction={0}
            colliders={false}
            onCollisionEnter={collisionEnter}
        // onCollisionExit={() => console.log('exit')}
        // onSleep={() => console.log('sleep')}
        // onWake={() => console.log('wake')}
        >
            <mesh castShadow onClick={cubeJump}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            <CuboidCollider
                args={[0.5, 0.5, 0.5]}
                mass={0.5}
            />
        </RigidBody>

        {/* Torus */}
        {/* <RigidBody colliders='trimesh'> */}
        {/* <RigidBody colliders={false} position={[0, 1, 0]} rotation={[Math.PI * 0.5, 0, 0]} >
            <CuboidCollider args={[1.5, 1.5, 0.5]} />
            <CuboidCollider args={[1, 1, 1]} />
            <BallCollider args={[1.5]} />
            <mesh castShadow >
                <torusGeometry args={[1, 0.5, 16, 32]} />
                <meshStandardMaterial color='mediumpurple' />
            </mesh>
        </RigidBody> */}

        {/* Pole */}
        <RigidBody
            ref={twister}
            position={[0, -0.8, 0]}
            friction={0}
            type='kinematicPosition'
        >
            <mesh castShadow scale={[0.4, 0.4, 3]}>
                <boxGeometry />
                <meshStandardMaterial color='red' />
            </mesh>
        </RigidBody>

        {/* Model */}
        {/* <RigidBody
            colliders={false}
            // colliders='trimesh'
            position={[0, 4, 0]}
        >
            <primitive object={hamburger.scene} scale={0.25} />
            <CylinderCollider args={[0.5, 1.25]} />
        </RigidBody> */}

        {/* Walls */}
        <RigidBody type='fixed'>
            <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
            <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
            <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
            <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>

        <InstancedRigidBodies
            positions={cubesTransforms.positions}
            rotations={cubesTransforms.rotations}
            scales={cubesTransforms.scales}
        >
            <instancedMesh ref={cubes} castShadow args={[null, null, cubesCount]}>
                <boxGeometry />
                <meshStandardMaterial color='tomato' />
            </instancedMesh>
        </InstancedRigidBodies>
    </Physics >
}
/*
 * hull 这种船体实际上应该被称为凸船体。这就像在物体周围放了一层弹性膜
 * trimesh triangle mesh 不能用于动态的RigidBody，生成的碰撞器内部是空的，这使得碰撞检测更复杂，更容易产生bug，快速的物体可能会穿过网格或最终卡在其表面上
 */

/*
 * addForce / applyImpulse
 * addTorque / applyTorqueImpulse
 */

/**
 * 1. gravity
 * 2. restitution 弹性，会使用两个物体的平均值，如果想转化为其他规则比如最大值，需要在 Collider 中修改
 * 3. fiction 默认值 0.7，也是两个值的平均
 * 4. mass
 */
