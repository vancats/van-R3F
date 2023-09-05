import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) => {
    return {
        blocksCount: 10,
        blocksSeed: 0,
        startTime: 0,
        endTime: 0,
        phase: 'ready',
        changePhase(phase) {
            set((state) => {
                if (state.phase !== phase) {
                    const res = { phase }
                    if (phase === 'ready') {
                        res.blocksSeed = Math.random()
                    }
                    if (phase === 'playing') {
                        res.startTime = Date.now()
                    }
                    if (phase === 'ended') {
                        res.endTime = Date.now()
                    }
                    return res
                }
                return {}
            })
        }
    }
}))
