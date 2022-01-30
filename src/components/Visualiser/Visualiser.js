import { useMemo } from 'react';
import Popup from 'reactjs-popup';
import { Player } from "components"
import { scaleNumber } from "config/utilties"
import { toggleVisualiserSplit } from "config/actions"
import { options } from 'config/constants';
import { useQuery } from 'hooks';
import "./styles.scss"

const Visualiser = ({ state, dispatch }) => {
    const { data, isVisualiserSplit } = state || {}
    const { tab, option } = useQuery()
    const optionLabel = useMemo(() => options[tab]?.find(({ value }) => value === option)?.label, [tab, option])


    return <div className="visualiser-container col">
        <div className="visualiser-inner-container">
            <div className="row visualiser-header" >
                <h2>{isVisualiserSplit?.label || optionLabel}</h2>
                {isVisualiserSplit
                    ? <div className="icon icon-combine" onClick={() => dispatch(toggleVisualiserSplit(null))} />
                    : <Popup
                        trigger={<div className="icon icon-split" />}
                        position="left top"
                    >   <div className="visualiser-split-options-container">
                            {options[tab]
                                .filter(({ value }) => value !== option)
                                ?.map((option) => (
                                    <p
                                        key={option.value}
                                        className=""
                                        onClick={() => dispatch(toggleVisualiserSplit(option))}
                                    >
                                        {option.label}
                                    </p>
                                ))}
                        </div>

                    </Popup>

                }
            </div>
            <div className="row row-bars">
                {data.map(bar => <div className="col">
                    <div
                        className="bar"
                        style={{ height: `${scaleNumber(bar, 0, 100, 0, 100)}%` }}
                    >

                    </div>
                    {bar}
                </div>

                )}
            </div>
        </div>
        <Player />
    </div >
}

export default Visualiser