import React, { useState, useRef, forwardRef, useEffect, useMemo, useReducer } from "react"
import { Player } from "components"
import { pathFindingVisualisationReducer } from 'config/reducer'
import { options } from 'config/constants'
import { pathFinding } from "config/actions"
import { useQuery } from 'hooks'
import { getGrid } from 'config/utilties'
import { algorithms } from "algorithms"
import "./styles.scss"

const PathFindingVisualiser = forwardRef(() => {
    const { tab, option } = useQuery()
    const optionLabel = useMemo(() => options[tab]?.find(({ value }) => value === option)?.label, [tab, option])
    const initialState = useMemo(() => ({ isPaused: true, currentStep: 0, targetStep: 0, speed: 5, ...algorithms[option](getGrid()) }), [option])
    const [visualisation, control] = useReducer(pathFindingVisualisationReducer, initialState)
    const { original, start, target, animations, isPaused, currentStep, targetStep, speed } = visualisation || {}

    const [isMousePresed, setIsMousePressed] = useState(false)
    const handleWall = (i, j) => {
        resetGrid()
        const newGrid = [...(original || [])]
        newGrid[i][j] = { ...newGrid[i][j], isWall: !newGrid[i][j].isWall }
        control(pathFinding.setValue({
            ...algorithms[option](newGrid, start, target),
            isPaused: true,
            currentStep: 0,
            targetStep: 0
        }))
    }

    const isPausedRef = useRef(isPaused)
    isPausedRef.current = isPaused


    const isFirstRender = useRef(true)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if ([0, currentStep].every(condition => condition === targetStep)) resetGrid()
        else if ([animations.length, currentStep].every(condition => condition === targetStep)) animations.forEach((animation) => updateNode(animation, true))
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetStep])

    const animate = async (toAnimate, isForward) => {
        for (let i = 0; i < toAnimate.length; i++) {
            try {
                await prepareAnimation({ toAnimate, isForward, i })
            } catch (error) {
                if (toAnimate.length > 1) control(pathFinding.setValue({
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
        updateNode(animation, isForward)
        control(pathFinding.setValue({
            currentStep: isForward ? Math.min(animations.length, currentStep + i + 1) : Math.max(0, currentStep + i - 1),
            isPaused: (i === toAnimate.length - 1) || undefined
        }))
        setTimeout(() => res(), (11 - (speed || 1)) * 1)
    })

    const updateNode = (animation, isForward) => {
        const { row, col, isPath } = animation || {}
        const node = document.getElementById(`node-${row}-${col}`)
        if (isForward) node?.classList?.add(isPath ? 'path' : 'visited')
        else node?.classList?.remove(isPath ? 'path' : 'visited')

    }

    const resetGrid = () => animations.forEach((animation) => updateNode(animation, false))

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
                                if (!isPaused) return
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
})

export default PathFindingVisualiser