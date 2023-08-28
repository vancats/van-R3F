import { TransformControls, PivotControls, Html, MeshReflectorMaterial, Stage, meshBounds } from '@react-three/drei'
import { useRef } from 'react'
import { useControls, button } from 'leva'
import { useFrame } from '@react-three/fiber'
import Plane from '../component/Plane'

export default function Geometries() {

    const cubeRef = useRef()
    const sphereRef = useRef()

    // 可以通过引入 folder 来设置嵌套的 folder
    const { position, color, visible } = useControls('sphere', {
        position: {
            value: { x: -2, y: 2 },
            step: 0.01,
            joystick: 'invertY'
        },
        color: '#ff0000',
        visible: true,
        interval: { min: 0, max: 10, value: [4, 5] },
        clickMe: button(() => { console.log('ok') }),
        choice: { options: ['a', 'b', 'c'] }
    })

    const { envMapIntensity } = useControls('environment map', {
        envMapIntensity: { value: 3.5, min: 0, max: 12 },
    })

    useFrame((state, delta) => {
        // const time = state.clock.elapsedTime
        // cubeRef.current.position.x = 2 + Math.sin(time)
        cubeRef.current.rotation.y += delta
    })

    const eventHandler = (e) => {
        cubeRef.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        // 即使有遮挡关系，也会触发事件，需要在其他物体上禁止传播
    }


    return <>
        <Plane envMapIntensity={envMapIntensity} />

        {/* <PivotControls
            anchor={[0, 0, 0]}
            depthTest={false}
            lineWidth={4}
            axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
            scale={1}
        // fixed={true}
        > */}
        <mesh ref={sphereRef} castShadow position={[position.x, position.y, 0]} visible={visible} onClick={e => e.stopPropagation()}>
            <sphereGeometry />
            <meshStandardMaterial color={color} envMapIntensity={envMapIntensity} />
            <Html
                position={[1, 1, 0]}
                wrapperClass='label'
                center
                distanceFactor={6} // 增加透视效果
                occlude={[sphereRef, cubeRef]} // 遮挡位置
            >
                That's a sphere!
            </Html>
        </mesh>
        {/* </PivotControls> */}

        {/* <Stage
            contactShadow={{ opacity: 0.2, blur: 3 }}
            environment='sunset'
            preset='portrait'
            intensity={0.5}
        > */}
        <mesh
            ref={cubeRef}
            // 会创建一个边界，可以优化点击事件，但是不太准确
            raycast={meshBounds}
            castShadow
            position-x={2}
            scale={1.5}
            onClick={eventHandler}
            // drei 有 useCursor
            onPointerEnter={() => document.body.style.cursor = 'pointer'}
            onPointerLeave={() => document.body.style.cursor = 'default'}
        >
            <boxGeometry />
            <meshStandardMaterial
                // meshBasicMaterial
                // meshStandMaterial 会有不同明暗，用 meshBasicMaterial 加 color 整个物体将会同个亮度
                // color={[5, 2, 1]}
                color='mediumpurple'
                // emissive='orange'
                // emissiveIntensity={2}
                toneMapped={false}
                envMapIntensity={envMapIntensity}
            />
        </mesh>
        {/* <TransformControls object={cubeRef} mode='translate' /> */}
        {/* </Stage> */}
    </>
}

/**
 * onContextMenu
 * onPointMissed 在外部点击
 * 对非常复杂的几何做事件，可以考虑使用 useBVH
 */
