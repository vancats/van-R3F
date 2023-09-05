import { useMemo } from 'react'
import * as THREE from 'three'
import BlockStart from './component/blocks/Start'
import BlockEnd from './component/blocks/End'
import BlockLimbo from './component/blocks/Limbo'
import BlockSpinner from './component/blocks/Spinner'
import BlockAxe from './component/blocks/Axe'
import Bounds from './component/Bounds'

export default function Level({ count = 5, seed = 0, types = [BlockSpinner, BlockLimbo, BlockAxe] }) {

    const blocks = useMemo(() => {
        const blocks = []
        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)]
            blocks.push(type)
        }
        return blocks
    }, [count, types, seed])

    return <>
        <BlockStart position={[0, 0, 0]} />
        {blocks.map((Block, index) => <Block key={index} position={[0, 0, -4 * (index + 1)]} />)}
        <BlockEnd position={[0, 0, -4 * (count + 1)]} />

        <Bounds length={count + 2} />
    </>
}
