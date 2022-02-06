import React, { useState, useRef, useEffect, useMemo, useReducer } from "react"
import { Player } from "components"
import { pathFindingVisualisationReducer } from 'config/reducer'
import { options } from 'config/constants'
import { pathFinding } from "config/actions"
import { useQuery } from 'hooks'
import { getGrid } from 'config/utilties'
import { algorithms } from "algorithms"
import "./styles.scss"
import { update } from "lodash"

const PathFindingVisualiser = () => {
    const { tab, option } = useQuery()
    const optionLabel = useMemo(() => options[tab]?.find(({ value }) => value === option)?.label, [tab, option])
    const initialState = useMemo(() => ({ isPaused: true, currentStep: 0, targetStep: 0, speed: 5, ...algorithms[option](getGrid()) }), [option])
    const [visualisation, control] = useReducer(pathFindingVisualisationReducer, initialState)
    const { original, start, target, animations, isPaused, currentStep, targetStep, speed } = visualisation || {}

    const [isMousePresed, setIsMousePressed] = useState(false)
    const handleWall = (i, j) => {
        const newGrid = [...(original || [])]
        newGrid[i][j] = { ...newGrid[i][j], isWall: !newGrid[i][j].isWall }
        control(pathFinding.setValue({ ...algorithms[option](newGrid, start, target,) }))
    }

    const isPausedRef = useRef(isPaused)
    isPausedRef.current = isPaused


    const isFirstRender = useRef(true)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if ([0, currentStep].every(condition => condition === targetStep)) return
        else if ([animations.length, currentStep].every(condition => condition === targetStep)) original.forEach(updateNode)
        else if (targetStep === currentStep) animations.forEach(updateNode)
        else {
            let toAnimate = [...(animations || [])]
            if (currentStep > targetStep) {
                toAnimate = toAnimate.slice(targetStep, currentStep)
                toAnimate.reverse()
            }
            else toAnimate = toAnimate.slice(currentStep, targetStep)
            animate(toAnimate, targetStep > currentStep)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetStep])

    const animate = async (toAnimate, isForward) => {
        for (let i = 0; i < toAnimate.length; i++) {
            try {
                await prepareAnimation({ animation: toAnimate[i], isForward })
            } catch (error) {
                console.log(error);
                if (toAnimate.length > 1) control(pathFinding.setValue({
                    currentStep: currentStep + i + 1,
                    targetStep: currentStep + i + 1,
                }))
                break
            }
        }
    }

    const prepareAnimation = ({ animation, isForward }) => new Promise((res, rej) => {
        console.log(animation);
        if (isPausedRef.current) rej()
        updateNode(animation)
        control(pathFinding.setValue({ currentStep: isForward ? Math.min(animations.length, currentStep + 1) : Math.max(0, currentStep - 1) }))
        setTimeout(() => res(), (11 - (speed || 1)) * 10)
    })

    const updateNode = (node) => {
        const { row, col, isPath } = node || {}
        document.getElementById(`node-${row}-${col}`)?.classList?.toggle(isPath ? 'path' : 'visited')
    }

    return <div className="path-finding-visualiser-container col">
        <div className="path-finding-visualiser-inner-container">
            <div className="path-finding-visualiser-header">
                <h2>{optionLabel}</h2>
            </div>
            <div className="path-finding-visualiser-content">
                <div
                    className="grid-container"
                    style={{
                        gridTemplateRows: `repeat(${original?.length}, 1fr)`,
                        gridTemplateColumns: `repeat(${original?.at(0)?.length}, 1fr)`
                    }}
                >
                    {original?.map((row, i) => row.map(({ isTarget, isStart, isWall }, j) => (
                        <div
                            key={`node-${j}`}
                            id={`node-${i}-${j}`}
                            className={`node-container ${isTarget ? 'target' : isStart ? 'start' : isWall ? 'wall' : ''}`}
                            onMouseDown={() => {
                                setIsMousePressed(true)
                                handleWall(i, j)
                            }}
                            onMouseEnter={() => {
                                if (!isMousePresed) return
                                handleWall(i, j)
                            }}
                            onMouseUp={() => setIsMousePressed(false)}
                        >
                        </div>
                    )))}
                </div>
            </div>
        </div>
        <Player
            controls={{
                goToBeggining: () => control(pathFinding.goToBeggining()),
                goBack: () => control(pathFinding.goBack()),
                play: () => control(pathFinding.play()),
                pause: () => control(pathFinding.pause()),
                goForward: () => control(pathFinding.goForward()),
                goToEnd: () => control(pathFinding.goToEnd())
            }}
            isPlaying={!isPaused}
            slider={{ value: speed, onChange: (value) => control(pathFinding.speed(value)) }}
        />
    </div >
}

export default PathFindingVisualiser