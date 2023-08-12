import { CineonToneMapping, ACESFilmicToneMapping, LinearSRGBColorSpace, SRGBColorSpace } from 'three'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'

export default function () {
    return <Canvas
        dpr={[1, 2]} // 使得分辨率在 1-2 之间，这个也是默认值
        flat
        gl={{
            antialias: true,
            toneMapping: ACESFilmicToneMapping,
            // outputColorSpace: LinearSRGBColorSpace,
        }}
        // orthographic // 是否为正交
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [3, 2, 6],
            // zoom: 100 // 给正交使用
        }}
    >
        <Experience />
    </Canvas>
}
// 分辨率 采样 色调映射 颜色输出 正交投影矩阵 背景色
