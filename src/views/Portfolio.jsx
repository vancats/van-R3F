import { Float, useGLTF, PresentationControls, ContactShadows, Html, Text } from '@react-three/drei'

export default function Portfolio() {

    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')

    // const computer = useGLTF('./models/Computer/computer.gltf')

    return <>
        <color args={['#695b5b']} attach='background' />

        <PresentationControls
            global
            rotation={[0.13, 0.1, 0]}
            polar={[-0.4, 0.2]} // 垂直
            azimuth={[-1, 0.75]} // 水平
            config={{ mass: 2, tension: 400 }} // 会有抖动的效果
            snap={{ mass: 4, tension: 400 }} // 会有弹性的恢复效果
        >
            <Float rotationIntensity={0.4}>
                <rectAreaLight
                    width={2.5}
                    height={1.65}
                    intensity={65}
                    color={'#ff6900'}
                    rotation={[-0.1, Math.PI, 0]}
                    position={[0, 0.55, -1.15]}
                />

                <primitive
                    object={computer.scene}
                    position-y={-1.2}
                    scale={1.5}
                >
                    <Html
                        transform
                        wrapperClass='htmlScreen'
                        distanceFactor={1.17}
                        position={[0, 1.56, -1.4]}
                        rotation-x={-0.256}
                    >
                        This is going to be an iframe.
                        <iframe src='https:/bruno-simon.com/html' />
                    </Html>
                </primitive>


                <Text
                    font='./fonts/bangers-v20-latin-regular.woff'
                    fontSize={1}
                    position={[-2, 0.75, 1.5]}
                    rotation-y={1.25}
                    maxWidth={1}
                    textAlign='center'
                    children={'Hello\nVancats'}
                >Hi Vancats</Text>
            </Float >
        </PresentationControls>

        <ContactShadows
            position-y={-1.4}
            opacity={0.4}
            scale={5}
            blur={2.4}
        />
    </>
}
