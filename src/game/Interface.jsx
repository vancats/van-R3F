import { useKeyboardControls } from "@react-three/drei"
import useGame from "../stores/useGame"
import { useEffect, useRef } from "react"
import { addEffect } from "@react-three/fiber"

export default function Interface() {

    const forward = useKeyboardControls(state => state.forward)
    const backward = useKeyboardControls(state => state.backward)
    const leftward = useKeyboardControls(state => state.leftward)
    const rightward = useKeyboardControls(state => state.rightward)
    const jump = useKeyboardControls(state => state.jump)

    const phase = useGame(state => state.phase)
    const changePhase = useGame(state => state.changePhase)

    const time = useRef()
    useEffect(() => {
        // 可以通过 addEffect 添加每帧的回调
        const unsubscribeEffect = addEffect(() => {
            const state = useGame.getState()

            let elapsedTime = 0
            if (state.phase === 'playing') {
                elapsedTime = Date.now() - state.startTime
            }
            if (state.phase === 'ended') {
                elapsedTime = state.endTime - state.startTime
            }
            if (time.current) {
                time.current.textContent = (elapsedTime / 1000).toFixed(2)
            }
        })
        return () => unsubscribeEffect()
    }, [])

    return <div className='interface'>
        <div ref={time} className="time">0.00</div>

        {phase === 'ended' && <div className="restart" onClick={() => changePhase('ready')}>Restart</div>}

        <div className="controls">
            <div className="raw">
                <div className={`key ${forward && 'active'}`}></div>
            </div>
            <div className="raw">
                <div className={`key ${leftward && 'active'}`}></div>
                <div className={`key ${backward && 'active'}`}></div>
                <div className={`key ${rightward && 'active'}`}></div>
            </div>
            <div className="raw">
                <div className={`key large ${jump && 'active'}`}></div>
            </div>
        </div>
    </div >
}
