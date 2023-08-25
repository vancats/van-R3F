import { CineonToneMapping, ACESFilmicToneMapping, LinearSRGBColorSpace, SRGBColorSpace, sRGBEncoding } from 'three'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import Experience from './Experience'

export default function () {

    const created = (state) => {
        // state.gl.setClearColor('#0000FF', 0.1)
        // state.scene.background = new THREE.Color('#0000FF')
    }

    return <Canvas
        shadows={true}
        dpr={[1, 2]} // 使得分辨率在 1-2 之间，默认值
        flat // R3F 的默认配置是 toneMapping，flat 会设置成 NoToneMapping，toneMapping 会保证色调在 0-1 之间，如果有类似 Bloom 等需要超出范围的，要关闭它
        gl={{
            antialias: true,
            toneMapping: ACESFilmicToneMapping,
            // outputColorSpace: SRGBColorSpace,
        }}
        // orthographic // 是否为正交
        camera={{
            fov: 60,
            near: 0.1,
            far: 200,
            position: [3, 2, 6],
            // zoom: 100 // 给正交使用
        }}
        onCreated={created}
        onPointerMissed={() => console.log('You missed!')}
    >
        <color args={['ivory']} attach='background' />
        <Experience />
    </Canvas>
}
// 分辨率 采样 色调映射 颜色输出 正交投影矩阵 背景色


/**
 ** 设置颜色
 *  1. css 设置
 *  2. setClearColor
 *  3. scene.background
 *  4. 使用 <color>
 */

/**
 ** Shadows
 * 1. Canvas 设置
 * 2. geometry and light add castShadow
 * 3. plane add receiveShadow
 */
