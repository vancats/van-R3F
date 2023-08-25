import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect } from 'react'
import { useControls } from 'leva'

export default function Fox(props) {

    const fox = useGLTF('./models/Fox/glTF/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)

    const { animationName } = useControls('fox', {
        animationName: { options: ['Survey', 'Walk', 'Run'] }
    })

    useEffect(() => {
        // const { Run, Walk, Survey } = animations.actions
        // Run?.play()
        // setTimeout(() => {
        //     Walk?.play()
        //     Walk.crossFadeFrom(Run, 1)
        // }, 2000)

        // fadeIn fadeOut 使得动画退出，不然动画会叠加
        const action = animations.actions[animationName]
        action.reset().fadeIn(0.5).play()
        return () => {
            action.fadeOut(0.5)
        }
    }, [animationName])


    return <primitive
        object={fox.scene}
        scale={0.02}
        position={[0, 0, 0]}
        rotation-y={0.3}
    />
}
