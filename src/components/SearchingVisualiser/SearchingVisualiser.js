/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useMemo, useEffect, useReducer, useRef, useImperativeHandle, useState } from "react"
import Popup from 'reactjs-popup'
import { Player } from "components"
import { searchingVisualisationReducer } from 'config/reducer'
import { toggleVisualiserSplit, searching } from "config/actions"
import { options } from "config/constants"
import { algorithms } from "algorithms"
import { useQuery } from "hooks"
import "./styles.scss"
import { isArray } from "lodash"


const SearchingVisualiser = forwardRef(({ state, dispatch, isSplitInstance, splitControls }, ref) => {
    const { data, isVisualiserSplit } = state || {}
    let { tab, option } = useQuery()
    if (isSplitInstance) option = isVisualiserSplit?.value
    const optionLabel = useMemo(() => options[tab]?.find(({ value }) => value === option)?.label, [tab, option])
    const initialState = useMemo(() => ({ isPaused: true, currentStep: 0, targetStep: 0, speed: 5, ...algorithms[option](data) }), [])
    const [visualisation, control] = useReducer(searchingVisualisationReducer, initialState)
    const { data: original, animations, isPaused, currentStep, targetStep, speed } = visualisation || {}

    const isPausedRef = useRef(isPaused)
    isPausedRef.current = isPaused

    const isFirstRender = useRef(true)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if ([0, currentStep].every(condition => condition === targetStep)) original.forEach((value, index) => updateBox({ index, color: '#170fe6' }))
        else if ([animations.length, currentStep].every(condition => condition === targetStep)) animations.forEach(({ color, index }) => updateBox({ index, color }))
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
                if (toAnimate.length > 1) control(searching.setValue({
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
        let { color, index } = animation
        if (!isForward) color = color === 'red' ? "#170fe6" : color === "green" ? "red" : color;
        updateBox({ index, color })
        control(searching.setValue({
            currentStep: isForward ? Math.min(animations.length, currentStep + i + 1) : Math.max(0, currentStep + i - 1),
            isPaused: (i === toAnimate.length - 1) || undefined
        }))
        setTimeout(() => res(), (11 - (speed || 1)) * 50)
    })


    const boxes = useRef([])
    const updateBox = ({ index, color }) => {
        if (isArray(index)) {
            index.forEach(i => updateBox({ color, index: i }))
        }
        const box = boxes.current[index]
        if (!box) return
        if (color) box.style.backgroundColor = color
    }


    useImperativeHandle(ref, () => ({ controls }))
    const controls = {
        goToBeggining: () => control(searching.goToBeggining()),
        goBack: () => control(searching.goBack()),
        play: () => control(searching.play()),
        pause: () => control(searching.pause()),
        goForward: () => control(searching.goForward()),
        goToEnd: () => control(searching.goToEnd())
    }

    const [search, setSeatch] = useState("")
    useEffect(() => {
        console.log('r');
        control(searching.setValue({
            isPaused: true,
            currentStep: 0,
            targetStep: 0,
            speed: 5,
            ...algorithms[option](data, Number(search))
        }))
    }, [search])


    return <div className="searching-visualiser-container col">
        <div className="searching-visualiser-inner-container">
            <div className="searching-visualiser-header row">
                <h2>{isSplitInstance ? isVisualiserSplit?.label : optionLabel}</h2>
                <span>Searching For</span>
                <input className="invalid" value={search} onChange={({ target: { value } }) => setSeatch(value)} />
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
            <div className="searching-visualiser-content row">
                {original?.map((box, i) => <div
                    key={`box-${i}`}
                    className="box row"
                    ref={(ref) => boxes.current[i] = ref}
                >{box}</div>)}
            </div>
        </div>
        <Player
            controls={controls}
            splitControls={splitControls}
            isPlaying={!isPaused}
            slider={{ value: speed, onChange: (value) => control(searching.speed(value)) }}
        />
    </div>
})

export default SearchingVisualiser