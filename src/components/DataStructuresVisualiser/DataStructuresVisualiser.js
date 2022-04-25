import { options } from "config/constants"
import { useQuery } from "hooks"
import React, { useMemo, forwardRef } from "react"
import { LinkedList, Stack, Queue } from '../'
import "./styles.scss"

const DataStructuresVisualiser = forwardRef((props, ref) => {
    const { tab, option } = useQuery()
    const optionLabel = useMemo(() => options[tab]?.find(({ value }) => value === option)?.label, [tab, option])
    const render = {
        "linked-list": < LinkedList />,
        "stack": <Stack />,
        "queue": <Queue />,
    }

    return <div className="data-structures-visualiser-container">
        <div className="data-structures-visualiser-inner-container">
            <div className="data-structures-visualiser-header">
                <h2>{optionLabel}</h2>
            </div>
            <div className="data-structures-visualiser-content">{render[option]}</div>
        </div>
    </div>
})

export default DataStructuresVisualiser