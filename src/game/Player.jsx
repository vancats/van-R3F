import { useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { RigidBody, useRapier } from "@react-three/rapier"
import { useEffect, useRef, useState } from "react"
import * as THREE from 'three'
import useGame from "../stores/useGame"

export default function Player() {

    const ball = useRef()
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const { rapier, world } = useRapier()
    const rapierWorld = world.raw()
    const changePhase = useGame(state => state.changePhase)
    const blocksCount = useGame(state => state.blocksCount)

    useFrame((state, delta) => {
        const { forward, backward, leftward, rightward } = getKeys()
        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = delta * 0.6
        const torqueStrength = delta * 0.2

        if (forward) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }

        if (backward) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }

        if (leftward) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }

        if (rightward) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        ball.current.applyImpulse(impulse)
        ball.current.applyTorqueImpulse(torque)
    })

    const jump = () => {
        const origin = ball.current.translation()
        origin.y -= 0.31
        const direction = { x: 0, y: -1, z: 0 }
        const ray = new rapier.Ray(origin, direction)
        const hit = rapierWorld.castRay(ray, 10, true)

        if (hit.toi < 0.15) {
            ball.current.applyImpulse({ x: 0, y: 0.5, z: 0 })
        }
    }

    useEffect(() => {
        const unsubscribeJump = subscribeKeys(
            state => state.jump,
            value => value && jump()
        )

        const unsubscribeAny = subscribeKeys(() => changePhase('playing'))

        const unsubscribeReset = useGame.subscribe(
            state => state.phase,
            value => {
                if (value === 'ready') {
                    reset()
                }
            }
        )
        return () => {
            unsubscribeJump()
            unsubscribeAny()
        }
    }, [])

    const [smoothCameraPosition] = useState(new THREE.Vector3(10, 10, 10))
    const [smoothCameraTarget] = useState(new THREE.Vector3())

    useFrame((state, delta) => {
        const ballPosition = ball.current.translation()

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(ballPosition)
        cameraPosition.z += 2.25
        cameraPosition.y += 0.65

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(ballPosition)
        cameraPosition.z += 0.25

        smoothCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothCameraPosition)
        state.camera.lookAt(smoothCameraTarget)


        if (ballPosition.z < - (blocksCount * 4 + 2)) {
            changePhase('ended')
        }
        if (ballPosition.y < -4) {
            changePhase('ready')
        }
    })

    const reset = () => {
        ball.current.setTranslation({ x: 0, y: 1, z: 0 })
        ball.current.setLinvel({ x: 0, y: 0, z: 0 })
        ball.current.setAngvel({ x: 0, y: 0, z: 0 })
    }

    return <RigidBody
        ref={ball}
        colliders='ball'
        position={[0, 1, 0]}
        restitution={0.2}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
    >
        <mesh castShadow>
            <icosahedronGeometry args={[0.3, 1]} />
            <meshStandardMaterial flatShading color='mediumpurple' />
        </mesh>
    </RigidBody>
}
