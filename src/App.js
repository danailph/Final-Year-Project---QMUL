import { useEffect, useReducer, useRef, useState } from 'react'
import { toggleOverlay, resetState } from 'config/actions'
import { reducer, initialState } from 'config/reducer'
import { Header, Overlay, Visulisers } from 'components'
import { useQuery } from 'hooks'
import 'styles.scss'

const App = () => {
    const { tab, option } = useQuery()
    const Visualiser = Visulisers[tab]

    const [state, dispatch] = useReducer(reducer, initialState)
    const { isVisualiserSplit } = state || {}

    const props = { state, dispatch }

    useEffect(() => {
        dispatch(resetState())
    }, [option])

    const vis1 = useRef()
    const vis2 = useRef()
    const [controls2, setControls2] = useState({})
    useEffect(() => {
        setControls2(vis2?.current?.controls || {})
    }, [isVisualiserSplit])

    return <div className="algorithmic-visualiser-container">
        <Header toggleOverlay={() => dispatch(toggleOverlay())} />
        <div className="algorithmic-visualiser-content row">

            <Visualiser ref={vis1} splitControls={controls2} {...props} />
            {isVisualiserSplit &&
                <>
                    <div className="spacer" />
                    <Visualiser ref={vis2} isSplitInstance splitControls={vis1?.current?.controls} {...props} />
                </>
            }
        </div>
        <Overlay dispatch={dispatch} state={state} />
    </div>
}


export default App;
