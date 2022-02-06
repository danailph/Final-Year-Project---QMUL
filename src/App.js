import { useEffect, useReducer } from 'react'
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

    return <div className="algorithmic-visualiser-container">
        <Header toggleOverlay={() => dispatch(toggleOverlay())} />
        <div className="algorithmic-visualiser-content row">

            <Visualiser  {...props} />
            {isVisualiserSplit &&
                <>
                    <div className="spacer" />
                    <Visualiser {...props} />
                </>
            }
        </div>
        <Overlay dispatch={dispatch} state={state} />
    </div>
}


export default App;
