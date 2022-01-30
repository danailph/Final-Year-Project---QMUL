
import { useRef } from 'react'
import { toggleOverlay } from 'config/actions'
import { useOnClickOutside } from 'hooks'
import "./styles.scss"

const Overlay = ({ state, dispatch }) => {
    const { isOverlayVisible } = state || {}

    const containerRef = useRef()
    const hide = () => dispatch(toggleOverlay())
    useOnClickOutside(containerRef, () => hide(), isOverlayVisible)

    return <div className={`overlay-container ${isOverlayVisible && 'open'}`}>
        <div className="overlay-inner-container" ref={containerRef}>
            gyuygyu
        </div>
    </div>
}

export default Overlay