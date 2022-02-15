import { useRef, forwardRef, useImperativeHandle, useEffect, useMemo, useReducer } from 'react'
import Popup from 'reactjs-popup'
import { Player } from "components"
import { sortingVisualisationReducer } from 'config/reducer'
import { scaleNumber } from "config/utilties"
import { toggleVisualiserSplit, sorting } from "config/actions"
import { options } from 'config/constants'
import { useQuery } from 'hooks'
import { algorithms } from 'algorithms'
import "./styles.scss"

const SortignVisualiser = forwardRef(({ state, dispatch, splitControls }, ref) => {
    const { data, isVisualiserSplit } = state || {}
    const { tab, option } = useQuery()
    const optionLabel = useMemo(() => options[tab]?.find(({ value }) => value === option)?.label, [tab, option])
    const [visualisation, control] = useReducer(sortingVisualisationReducer, { isPaused: true, currentStep: 0, targetStep: 0, speed: 5, ...algorithms[isVisualiserSplit?.value || option](data) })
    const { original, sorted, animations, isPaused, currentStep, targetStep, speed } = visualisation || {}

    const isPausedRef = useRef(isPaused)
    isPausedRef.current = isPaused

    const isFirstRender = useRef(true)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if ([0, currentStep].every(condition => condition === targetStep)) original.forEach((value, index) => updateBar({ index, value, swap: true, color: '#170fe6' }))
        else if ([animations.length, currentStep].every(condition => condition === targetStep)) sorted.forEach((value, index) => updateBar({ index, value, swap: true, color: 'turquoise' }))
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
                if (toAnimate.length > 1) control(sorting.setValue({
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
        let { color, index, oldValue, newValue, swap } = animation
        if (!isForward) {
            color = color === 'red' ? "#170fe6" : color === "turquoise" ? "red" : color;
            [oldValue, newValue] = [newValue, oldValue]
        }
        updateBar({ index, color, swap, value: newValue })
        updateBar({ index: index + 1, color, swap, value: oldValue })

        control(sorting.setValue({
            currentStep: isForward ? Math.min(animations.length, currentStep + i + 1) : Math.max(0, currentStep + i - 1),
            isPaused: (i === toAnimate.length - 1) || undefined
        }))
        setTimeout(() => res(), (11 - (speed || 1)) * 50)
    })

    const bars = useRef([])
    const updateBar = ({ index, color, value, swap }) => {
        const bar = bars.current[index]
        if (!bar) return
        if (color) bar.style.backgroundColor = color
        if (value && swap) {
            bar.innerHTML = `<p>${value}</p>`
            bar.style.height = `${scaleNumber(value, 0, 100, 0, 100)}%`
        }
    }

    useImperativeHandle(ref, () => ({ controls }))

    const controls = {
        goToBeggining: () => control(sorting.goToBeggining()),
        goBack: () => control(sorting.goBack()),
        play: () => control(sorting.play()),
        pause: () => control(sorting.pause()),
        goForward: () => control(sorting.goForward()),
        goToEnd: () => control(sorting.goToEnd())
    }

    return <div className="sorting-visualiser-container col">
        <div className="sorting-visualiser-inner-container">
            <div className="row sorting-visualiser-header" >
                <h2>{isVisualiserSplit?.label || optionLabel}</h2>
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
            <div className="row row-bars">
                {original?.map((bar, i) => <div key={`bar-${i}`} className="col">
                    <div
                        ref={(ref) => bars.current[i] = ref}
                        className="bar"
                        style={{ height: `${scaleNumber(bar, 0, 100, 0, 100)}%` }}
                    >
                        <p>{bar}</p>
                    </div>
                </div>
                )}
            </div>
        </div>
        <Player
            controls={controls}
            splitControls={splitControls}
            isPlaying={!isPaused}
            slider={{ value: speed, onChange: (value) => control(sorting.speed(value)) }}
        />
    </div >
})

export default SortignVisualiser