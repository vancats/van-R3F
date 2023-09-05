import { Debug, Physics } from '@react-three/rapier'
import Level from './Level'
import Player from './Player'
import useGame from '../stores/useGame'
import Effect from './Effect'


export default function Game() {

    const blocksCount = useGame(state => state.blocksCount)
    const blocksSeed = useGame(state => state.blocksSeed)

    return <>
        <color args={['#252731']} attach='background' />
        <Physics>
            {/* <Debug /> */}
            <Level count={blocksCount} seed={blocksSeed} />
            <Player />
        </Physics>
        <Effect />
    </>
}
