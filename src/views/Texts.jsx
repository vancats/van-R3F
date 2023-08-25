import { Center, Float, Text, Text3D, useMatcapTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'

const torusGeometry = new THREE.TorusBufferGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

// Default font: Roboto.   Supports: woff ttf otf
export default function Texts() {

    // https://github.com/nidorx/matcaps/blob/master/PAGE-17.md#7b5254_e9dcc7_b19986_c8ac91
    const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

    // 使用 setRef 来获得实例
    // const [torusGeometry, setTorusGeometry] = useState()
    // const [material, setMaterial] = useState()

    useEffect(() => {
        // 在使用<material />时会自动设置，这里需要手动设置
        matcapTexture.encoding = THREE.sRGBEncoding
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    }, [])

    // 使用 group 的方式控制循环的子元素
    // const donutsGroup = useRef()

    // 使用元素自身的 ref 回调
    const donuts = useRef([])

    useFrame((state, delta) => {
        // for (const donut of donutsGroup.current.children) {
        for (const donut of donuts.current) {
            donut.rotation.y += delta * 0.3
        }
    })

    return <>

        {/* <Float speed={5} floatIntensity={2}>
            <Text
                font='./fonts/bangers-v20-latin-regular.woff'
                fontSize={1}
                color='salmon'
                position-y={2}
                maxWidth={2}
                textAlign='center'
            >
                I Love R3F!
                <meshNormalMaterial />
            </Text>
        </Float> */}

        {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
        <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

        <Center>
            <Text3D
                material={material}
                font='./fonts/helvetiker_regular.typeface.json'
                size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                HELLO R3F
            </Text3D>
        </Center>

        {/* <group ref={donutsGroup}> */}
        {
            Array.from({ length: 100 }).map((_, index) => {
                return <mesh
                    key={index}
                    ref={(ele) => donuts.current[index] = ele}
                    geometry={torusGeometry}
                    material={material}
                    position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                    ]}
                    scale={0.2 + Math.random() * 0.2}
                    rotation={[
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        0,
                    ]}
                />
            })
        }
        {/* </group> */}
    </>
}
