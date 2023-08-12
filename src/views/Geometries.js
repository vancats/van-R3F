import { TransformControls, PivotControls, Html, MeshReflectorMaterial } from '@react-three/drei'
import { useRef } from 'react'
import { useControls, button } from 'leva'
import Plane from '../component/plane'

export default function Geometries() {

    const cubeRef = useRef()
    const sphereRef = useRef()

    // 可以通过引入 folder 来设置嵌套的 folder
    const { position, color, visible } = useControls('sphere', {
        position: {
            value: { x: -2, y: 0 },
            step: 0.01,
            joystick: 'invertY'
        },
        color: '#ff0000',
        visible: true,
        interval: {
            min: 0,
            max: 10,
            value: [4, 5],
        },
        clickMe: button(() => { console.log('ok') }),
        choice: { options: ['a', 'b', 'c'] }
    })

    return <>
        <Plane />

        <PivotControls
            anchor={[0, 0, 0]}
            depthTest={false}
            lineWidth={4}
            axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
            scale={1}
        // fixed={true}
        >
            <mesh ref={sphereRef} position={[position.x, position.y, 0]} visible={visible}>
                <sphereGeometry />
                <meshStandardMaterial color={color} />
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
        </PivotControls>

        <mesh ref={cubeRef} position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color='mediumpurple' />
        </mesh>
        <TransformControls object={cubeRef} mode='translate' />
    </>
}
