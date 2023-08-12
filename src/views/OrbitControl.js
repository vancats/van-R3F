import { OrbitControls } from '@react-three/drei'

export default function OrbitControl() {

    return <OrbitControls
        makeDefault // 默认的 control，优先级会低于其他 control，避免冲突
    // enableDamping={false}
    />
}
