import { useHelper, BakeShadows, softShadows, AccumulativeShadows, RandomizedLight, ContactShadows, Sky, Environment, Lightformer } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import * as THREE from 'three'

// 使 shadow 更柔和，但是性能影响较大，参数配置需要谨慎，并且不要使用 debug 工具去实时改变
// softShadows({
//     frustum: 3.75,
//     size: 0.005,
//     near: 9.5,
//     samples: 17,
//     rings: 11,
// })

export default function () {

    const directionalLight = useRef()
    // useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const { color, opacity, blur } = useControls('contact shadows', {
        color: '#000000',
        opacity: { value: 0.4, min: 0, max: 1 },
        blur: { value: 2.8, min: 0, max: 10 }
    })

    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [4, 4, 1] }
    })

    const { envMapHeight, envMapRadius, envMapScale } = useControls('environment map', {
        envMapHeight: { value: 7, min: 0, max: 100 },
        envMapRadius: { value: 20, min: 10, max: 1000 },
        envMapScale: { value: 100, min: 10, max: 1000 },
    })

    useFrame((state) => {
        directionalLight.current.position.z = state.camera.position.z + 1 - 4
        directionalLight.current.target.position.z = state.camera.position.z - 4
        // 因为这个 target 不存在于 scene 中，需要手动更新
        directionalLight.current.target.updateMatrixWorld()
    })

    return <>
        {/* <BakeShadows /> */}

        {/* 仅在 plane 上显示 */}
        {/* <AccumulativeShadows
            position={[0, 0, 0]}
            scale={10}
            color='#316d39'
            opacity={0.8}
            frames={Infinity} // 设置了这个会在首帧进行 x 次render导致卡死，当使用 Infinity 时，会只混合最后的 20 帧，此时使用 blend 优化
            temporal // 设置了这个之后，阴影会慢慢显示，但是会和 Helper 有冲突从而产生奇怪的图形
            blend={100}
        >
            <RandomizedLight
                amount={8}
                radius={1}
                ambient={0.5}
                intensity={1}
                position={[1, 2, 3]}
                bias={0.001}
            />
        </AccumulativeShadows> */}

        {/*  */}
        {/*
            仅在 plane 上显示，canvas 上可以不加 shadows 参数
            1. 仅会在 plane 正面产生投影
            2. 不是物理准确的
            3. 无论距离多远，都会模糊阴影
            4. 性能消耗大
        */}
        {/* <ContactShadows
            position={[0, 0, 0]}
            scale={10}
            resolution={512}
            far={5}
            color={color}
            opacity={opacity}
            blur={blur}
            frames={1} // 此时只会取第一帧，也就是 bake shadow
        /> */}

        <ambientLight intensity={0.5} />
        <directionalLight
            ref={directionalLight}
            castShadow
            position={sunPosition}
            intensity={1.5}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-left={-5}
            shadow-normalBias={0.04}
        />

        {/* <Sky sunPosition={sunPosition} /> */}

        {/* <Environment
            // background
            ground={{
                height: envMapHeight,
                radius: envMapRadius,
                scale: envMapScale,
            }}
            // files={[
            //     './textures/environmentMaps/0/nx.jpg',
            //     './textures/environmentMaps/0/px.jpg',
            //     './textures/environmentMaps/0/ny.jpg',
            //     './textures/environmentMaps/0/py.jpg',
            //     './textures/environmentMaps/0/nz.jpg',
            //     './textures/environmentMaps/0/pz.jpg'
            // ]}
            files='./textures/environmentMaps/the_sky_is_on_fire_2k.hdr'
        // preset='night' // https://github.com/pmndrs/drei/blob/master/src/helpers/environment-assets.ts
        // resolution={32} // 当只想照亮物体时，关闭 background 属性并且设置很小的 resolution 值是个好方法
        >
            <color args={['#000000']} attach='background' />
            <Lightformer
                position-z={-5}
                scale={10}
                color='red'
                intensity={10}
                form={'ring'}
            />
        </Environment> */}
    </>
}
