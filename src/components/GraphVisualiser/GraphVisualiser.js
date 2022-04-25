/* eslint-disable react-hooks/exhaustive-deps */
import { algorithms } from "algorithms"
import Player from "components/Player"
import { graphActions, toggleVisualiserSplit } from "config/actions"
import { options } from "config/constants"
import { graphVisualisationReducer } from "config/reducer"
import { useQuery } from "hooks"
import React, { useState, useMemo, useEffect, forwardRef, useRef, useCallback, useReducer, useImperativeHandle } from "react"
import Popup from "reactjs-popup"
import "./styles.scss"

const GraphVisualiser = forwardRef(({ state, dispatch, isSplitInstance, splitControls }, ref) => {
    const { graph, isVisualiserSplit } = state || {}
    let { tab, option } = useQuery()
    if (isSplitInstance) option = isVisualiserSplit?.value
    const optionLabel = useMemo(() => options[tab]?.find(({ value }) => value === option)?.label, [tab, option])
    const initialState = useMemo(() => ({
        isPaused: true,
        currentStep: 0,
        targetStep: 0,
        speed: 5, ...algorithms[option](graph)
    }), [algorithms, option, graph])
    const [visualisation, control] = useReducer(graphVisualisationReducer, initialState)
    const { original, animations, isPaused, currentStep, targetStep, speed } = visualisation || {}

    useEffect(() => {
        control(graphActions.setValue({ ...initialState }))
    }, [initialState])

    const graphRef = useRef(null)
    const getPoints = (arr) => {
        console.log(graphRef);
        return arr.map((n, i) => ({
            y: Math.floor(i / 3) * 150 + 80,
            x: i % 3 * 200 + (graphRef.current.getBoundingClientRect().width / 2 - 200)
        }))
    }
    const [points, setPoints] = useState()
    useEffect(() => {
        setPoints(getPoints(original))
    }, [isVisualiserSplit])

    const connect = useCallback((div1, div2) => {
        if (!points) return
        const x1 = points[div1].x
        const y1 = points[div1].y
        const x2 = points[div2].x
        const y2 = points[div2].y
        const length = Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
        const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI) + 180;
        const current = document.getElementById(`line-${option}-${div1}-${div2}`)
        if (current) {
            current.style.top = `${y1}px`
            current.style.left = `${x1}px`
            current.style.width = `${length}px`
            current.style.transform = `rotate(${angle}deg)`
        } else {
            const el = document.createElement('div')
            el.classList.add('line', `line-${option}-${div1}-${div2}`)
            el.setAttribute('id', `line-${option}-${div1}-${div2}`)
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
        original.forEach(([node, edges]) => edges.forEach((edge) => connect(node, edge)))
    }, [connect, original])


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

    const isPausedRef = useRef(isPaused)
    isPausedRef.current = isPaused
    const isFirstRender = useRef(true)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if ([0, currentStep].every(condition => condition === targetStep)) original.forEach((value, index) => updateNode({ index, color: '#170fe6' }))
        else if ([animations.length, currentStep].every(condition => condition === targetStep)) animations.forEach((index) => updateNode({ index, color: 'red' }))
        else if (targetStep === currentStep) return
        else {
            let toAnimate = [...(animations || [])]
            if (currentStep > targetStep) {
                toAnimate = toAnimate.slice(targetStep, currentStep)
                toAnimate.reverse()
            }
            else toAnimate = toAnimate.slice(currentStep, targetStep)
            animate(toAnimate, targetStep > currentStep)
        }
    }, [targetStep])


    const animate = async (toAnimate, isForward) => {
        for (let i = 0; i < toAnimate.length; i++) {
            try {
                await prepareAnimation({ toAnimate, isForward, i })
            } catch (error) {
                if (toAnimate.length > 1) control(graphActions.setValue({
                    currentStep: currentStep + i + 1,
                    targetStep: currentStep + i + 1,
                }))
                break
            }
        }
    }

    const prepareAnimation = ({ toAnimate, isForward, i }) => new Promise((res, rej) => {
        if (isPausedRef.current) rej()
        const animation = toAnimate[i]
        let index = animation
        updateNode({ index, color: isForward ? 'red' : "#170fe6" })
        control(graphActions.setValue({
            currentStep: isForward ? Math.min(animations.length, currentStep + i + 1) : Math.max(0, currentStep + i - 1),
            isPaused: (i === toAnimate.length - 1) || undefined
        }))
        setTimeout(() => res(), (11 - (speed || 1)) * 50)
    })
    // console.log(animations);

    const nodesRef = useRef({})
    const updateNode = ({ index, color }) => {
        const node = nodesRef.current[index]
        if (!node) return
        node.style.backgroundColor = color
    }

    useImperativeHandle(ref, () => ({ controls }))
    const controls = {
        goToBeggining: () => control(graphActions.goToBeggining()),
        goBack: () => control(graphActions.goBack()),
        play: () => control(graphActions.play()),
        pause: () => control(graphActions.pause()),
        goForward: () => control(graphActions.goForward()),
        goToEnd: () => control(graphActions.goToEnd())
    }



    return <div className="graph-visualiser-container col">
        <div className="graph-visualiser-inner-container">
            <div className="graph-visualiser-header row">
                <h2>{isSplitInstance ? isVisualiserSplit?.label : optionLabel}</h2>
                {isVisualiserSplit
                    ? <div className="icon icon-combine" onClick={() => dispatch(toggleVisualiserSplit(null))} />
                    : <Popup
                        trigger={<div className="icon icon-split" />}
                        position="left top"
                    >   <div className="sorting-visualiser-split-options-container">
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
            <div className="graph-visualiser-content" ref={graphRef}>
                {original.map(([node]) =>
                    <div
                        key={`node-${node}`}
                        ref={ref => nodesRef.current[node] = ref}
                        className="node row"
                        style={{ top: points?.[node].y, left: points?.[node].x }}
                        onMouseDown={(e) => {
                            setIsDraging(node)
                            setOffset([e.target.offsetLeft - e.clientX, e.target.offsetTop - e.clientY])
                        }}
                    >{node}</div>)}
            </div>
        </div>
        <Player
            controls={controls}
            splitControls={splitControls}
            isPlaying={!isPaused}
            slider={{ value: speed, onChange: (value) => control(graphActions.speed(value)) }}
        />
    </div >
})

export default GraphVisualiser