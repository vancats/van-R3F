import { MeshReflectorMaterial } from '@react-three/drei'

export default function Plane({ envMapIntensity }) {
    return <>
        <mesh
            receiveShadow // AccumulativeShadows 时不需要，其他时候需要
            position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial
                color='greenyellow'
                envMapIntensity={envMapIntensity}
                metalness={0}
                roughness={0}
            />
            {/* <MeshReflectorMaterial
                // 只适用于平面的 mesh
                color='greenyellow'
                resolution={512} // 分辨率
                blur={[1000, 1000]}
                mixBlur={0.5}
                mirror={0.75}
            /> */}
        </mesh>
    </>
}
