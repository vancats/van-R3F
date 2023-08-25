import { Center, Sparkles, useGLTF, useTexture, shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import portalVertexShader from '../shaders/portal/vertex.js'
import portalFragmentShader from '../shaders/portal/fragment.js'

// 优点：可以被重复使用，并且值更新更简便
const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#FFFFFF'),
        uColorEnd: new THREE.Color('#000000'),
    },
    portalVertexShader,
    portalFragmentShader,
)

extend({ PortalMaterial })

export default function Portal() {

    const { nodes } = useGLTF('./models/Portal/portal.glb')
    const bakedTexture = useTexture('./models/Portal/baked.jpg')
    bakedTexture.flipY = false

    const portalMaterial = useRef()
    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta
    })

    return <>
        <color args={['#201919']} attach='background' />

        <Center>
            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture}
                // map-flipY={false} // 这里也可以设置，但是建议设置在 texture 上
                />
            </mesh>

            <mesh
                geometry={nodes.poleLightA.geometry}
                position={nodes.poleLightA.position}
            >
                <meshBasicMaterial color='#ffffe5' />
            </mesh>

            <mesh
                geometry={nodes.poleLightB.geometry}
                position={nodes.poleLightB.position}
            >
                <meshBasicMaterial color='#ffffe5' />
            </mesh>

            <mesh
                geometry={nodes.portalLight.geometry}
                position={nodes.portalLight.position}
                rotation={nodes.portalLight.rotation}
            >
                <portalMaterial ref={portalMaterial} />
                {/* <shaderMaterial
                    vertexShader={portalVertexShader}
                    fragmentShader={portalFragmentShader}
                    uniforms={{
                        uTime: { value: 0 },
                        uColorStart: { value: new THREE.Color('#FFFFFF') },
                        uColorEnd: { value: new THREE.Color('#000000') },
                    }}
                /> */}
            </mesh>

            <Sparkles
                size={6}
                scale={[4, 2, 4]}
                position-y={1}
                speed={0.4}
                count={40}
            />
        </Center>
    </>
}
