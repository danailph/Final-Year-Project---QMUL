import { options } from "config/constants"
import { randomNumber } from "config/utilties"
import { useQuery } from "hooks"
import React, { useState, useMemo, useEffect, forwardRef, useRef, useCallback } from "react"
import "./styles.scss"

const GraphVisualiser = forwardRef((props, ref) => {
    const { tab, option } = useQuery()
    const optionLabel = useMemo(() => options[tab]?.find(({ value }) => value === option)?.label, [tab, option])

    const graph = useMemo(() => Array(20).fill(0).map((el, i) => [i, Array(randomNumber(2, 1)).fill(0).map(() => randomNumber(20))]), [])
    const [points, setPoints] = useState(() => graph.map(() => ({ x: randomNumber(800, 50), y: randomNumber(400, 50) })))
    const graphRef = useRef(null)

    const connect = useCallback((div1, div2) => {
        const x1 = points[div1].x
        const y1 = points[div1].y
        const x2 = points[div2].x
        const y2 = points[div2].y
        const length = Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
        const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI) + 180;
        const current = document.getElementById(`line-${div1}-${div2}`)
        if (current) {
            current.style.top = `${y1}px`
            current.style.left = `${x1}px`
            current.style.width = `${length}px`
            current.style.transform = `rotate(${angle}deg)`
        } else {
            const el = document.createElement('div')
            el.classList.add('line', `line-${div1}-${div2}`)
            el.setAttribute('id', `line-${div1}-${div2}`)
            el.style.top = `${y1}px`
            el.style.left = `${x1}px`
            el.style.width = `${length}px`
            el.style.transform = `rotate(${angle}deg)`
            graphRef.current.appendChild(el)
        }
    }, [points])

    const [isDragging, setIsDraging] = useState(null)
    const [offset, setOffset] = useState(null)

    useEffect(() => {
        graph.forEach(([node, edges]) => edges.forEach((edge) => connect(node, edge)))
    }, [connect, graph])


    useEffect(() => {
        const stopDrag = () => setIsDraging(null)
        const handleMouseMove = (event) => {
            if (isDragging !== null) setPoints(point => point.map((point, index) => {
                return index === isDragging ? { x: event.clientX + offset[0], y: event.clientY + offset[1] } : point
            }))
        }
        document.addEventListener('mouseup', stopDrag)
        document.addEventListener('mousemove', handleMouseMove)
        return () => {
            document.removeEventListener('mouseup', stopDrag)
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [isDragging, offset])


    return <div className="graph-visualiser-container">
        <div className="graph-visualiser-inner-container">
            <div className="graph-visualiser-container">
                <div className="graph-visualiser-header">

                    <h2>{optionLabel}</h2>
                </div>

                <div className="graph-visualiser-content" ref={graphRef}>
                    {graph.map(([node]) =>
                        <div
                            key={`node-${node}`}
                            id={`node-${node}`}
                            className="node row"
                            style={{ top: points[node].y, left: points[node].x }}
                            onMouseDown={(e) => {
                                setIsDraging(node)
                                setOffset([e.target.offsetLeft - e.clientX, e.target.offsetTop - e.clientY])
                            }}
                        >{node}</div>)}
                </div>
            </div>
        </div>
    </div >
})

export default GraphVisualiser