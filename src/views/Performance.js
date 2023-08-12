import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

export default function Performance() {
    const { perfVisible } = useControls('perf', {
        perfVisible: false,
    })
    return <>
        {perfVisible && <Perf position='top-left' />}
    </>
}
