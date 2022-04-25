
import { useRef } from 'react'
import { toggleOverlay } from 'config/actions'
import { useOnClickOutside, useCollapsable } from 'hooks'
import "./styles.scss"

const Overlay = ({ state, dispatch }) => {
    const { isOverlayVisible, overlayProps } = state || {}
    const { onUpload = () => { } } = overlayProps || {}

    const containerRef = useRef()
    const hide = () => dispatch(toggleOverlay())
    useOnClickOutside(containerRef, () => hide(), isOverlayVisible)

    const collapsableRefAbout = useRef(null)
    const collapsableRefTheme = useRef(null)
    const collapsableRefCode = useRef(null)
    const [isExpandedAbout, setExpandedAbout] = useCollapsable(collapsableRefAbout)
    const [isExpandedTheme, setExpandedTheme] = useCollapsable(collapsableRefTheme)
    const [isExpandedCode, setExpandedCode] = useCollapsable(collapsableRefCode, true)


    return <div className={`overlay-container ${isOverlayVisible && 'open'}`}>
        <div className="overlay-inner-container" ref={containerRef}>
            <div className="">
                <div className="row">
                    <h2>Settings</h2>
                </div>
                <span>Upload csv file</span>
                <div className="" onClick={() => onUpload()}>Upload</div>
            </div>

            <div className="row row-expand" onClick={() => setExpandedAbout(!isExpandedAbout)} style={{ cursor: 'pointer' }}>
                <h3>About Algorithmius</h3>
                <div className={`icon icon-arrow-down ${isExpandedAbout && 'rotate'}`} />
            </div>
            <div className="row-collapse" ref={collapsableRefAbout}>
                djiioawjdoiawjdoi
            </div>

            <div className="row row-expand" onClick={() => setExpandedTheme(!isExpandedTheme)} style={{ cursor: 'pointer' }}>
                <h3>Color theme</h3>
                <div className={`icon icon-arrow-down ${isExpandedTheme && 'rotate'}`} />
            </div>
            <div className="row-collapse" ref={collapsableRefTheme}>
                djiioawjdoiawjdoi
            </div>

            <div className="row row-expand" onClick={() => setExpandedCode(!isExpandedCode)} style={{ cursor: 'pointer' }}>
                <h3>Code information</h3>
                <div className={`icon icon-arrow-down ${isExpandedCode && 'rotate'}`} />
            </div>
            <div className="row-collapse active" ref={collapsableRefCode}>
                djiioawjdoiawjdoi
            </div>

        </div>
    </div>
}

export default Overlay