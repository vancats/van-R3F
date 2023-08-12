import { Float, Text } from '@react-three/drei'

// Default font: Roboto. Supports: woff ttf otf
export default function WelcomeText() {
    return <>
        <Float speed={5} floatIntensity={2}>
            <Text
                font='./bangers-v20-latin-regular.woff'
                fontSize={1}
                color='salmon'
                position-y={2}
                maxWidth={2}
                textAlign='center'
            >
                I Love R3F!
                <meshNormalMaterial />
            </Text>
        </Float>
    </>
}
