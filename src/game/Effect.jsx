import { DepthOfField, EffectComposer, SSR } from "@react-three/postprocessing"
import { useControls } from "leva"

export default function Effect() {


    const ssrProps = useControls('SSR Effect', {
        temporalResolve: true,
        STRETCH_MISSED_RAYS: true,
        USE_MRT: true,
        USE_NORMALMAP: true,
        USE_ROUGHNESSMAP: true,
        ENABLE_JITTERING: true,
        ENABLE_BLUR: true,
        temporalResolveMix: { value: 0.9, min: 0, max: 1 },
        temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
        maxSamples: { value: 0, min: 0, max: 1 },
        resolutionScale: { value: 1, min: 0, max: 1 },
        blurMix: { value: 0.5, min: 0, max: 1 },
        blurKernelSize: { value: 8, min: 0, max: 8 },
        blurSharpness: { value: 0.5, min: 0, max: 1 },
        rayStep: { value: 0.3, min: 0, max: 1 },
        intensity: { value: 1, min: 0, max: 5 },
        maxRoughness: { value: 0.1, min: 0, max: 1 },
        jitter: { value: 0.7, min: 0, max: 5 },
        jitterSpread: { value: 0.45, min: 0, max: 1 },
        jitterRough: { value: 0.1, min: 0, max: 1 },
        roughnessFadeOut: { value: 1, min: 0, max: 1 },
        rayFadeOut: { value: 0, min: 0, max: 1 },
        MAX_STEPS: { value: 20, min: 0, max: 20 },
        NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
        maxDepthDifference: { value: 3, min: 0, max: 10 },
        maxDepth: { value: 1, min: 0, max: 1 },
        thickness: { value: 10, min: 0, max: 10 },
        ior: { value: 1.45, min: 0, max: 2 }
    })

    return <EffectComposer>
        <DepthOfField
            focusDistance={0.01}
            focalLength={0.2}
            bokehScale={3}
        />

        <SSR
            {...ssrProps}
        // intensity={0.45}
        // exponent={1}
        // distance={10}
        // fade={10}
        // roughnessFade={1}
        // thickness={10}
        // ior={0.45}
        // maxRoughness={1}
        // maxDepthDifference={10}
        // blend={0.95}
        // correction={1}
        // correctionRadius={1}
        // blur={0}
        // blurKernel={1}
        // blurSharpness={10}
        // jitter={0.75}
        // jitterRoughness={0.2}
        // steps={40}
        // refineSteps={5}
        // missedRays={true}
        // useNormalMap={true}
        // useRoughnessMap={true}
        // resolutionScale={1}
        // velocityResolutionScale={1}
        />
    </EffectComposer>
}
