
import { useRef } from 'react'
import { setStateValue, toggleOverlay } from 'config/actions'
import { useOnClickOutside, useCollapsable, useQuery } from 'hooks'
import "./styles.scss"

const Overlay = ({ state, dispatch }) => {
    const { tab } = useQuery()
    const { isOverlayVisible } = state || {}

    const uploadInputRef = useRef(null)

    const containerRef = useRef()
    const hide = () => dispatch(toggleOverlay())
    useOnClickOutside(containerRef, () => hide(), isOverlayVisible)

    const collapsableRefAbout = useRef(null)
    const collapsableRefTheme = useRef(null)
    const collapsableRefCode = useRef(null)
    const [isExpandedAbout, setExpandedAbout] = useCollapsable(collapsableRefAbout)
    const [isExpandedTheme, setExpandedTheme] = useCollapsable(collapsableRefTheme)
    const [isExpandedCode, setExpandedCode] = useCollapsable(collapsableRefCode, true)


    const onUpload = ({ target: { files } }) => {
        var fr = new FileReader();
        fr.onload = function () {
            if (['sorting', 'searching'].includes(tab)) dispatch(setStateValue({ data: fr.result.split(",").map(n => Number(n)) }))
            if (['graph'].includes(tab)) dispatch(setStateValue({ graph: fr.result.split("\n").map((node, i) => [i, node.split(",").map(n => Number(n))]) }))
            if (['path-finding'].includes(tab)) dispatch(setStateValue({
                grid: fr.result.split("\n").map((row, i) => row.split(",").map((value, j) => ({
                    row: i,
                    col: j,
                    isStart: value === "1",
                    isTarget: value === "2",
                    distance: Infinity,
                    isVisited: false,
                    isWall: value === "3",
                    previousNode: null,
                })))
            }))
        }
        fr.readAsText(files[0]);
    }

    return <div className={`overlay-container ${isOverlayVisible && 'open'}`}>
        <div className="overlay-inner-container" ref={containerRef}>
            <div className="overlay-header">
                <div className="row">
                    <h2>Settings</h2>
                </div>
                {['sorting', 'searching', 'graph', 'path-finding'].includes(tab) && <>
                    <h3>Upload csv file</h3>
                    <div className="btn-upload" onClick={() => uploadInputRef.current.click()}>Upload</div>
                    <input
                        ref={uploadInputRef}
                        style={{ display: "none" }}
                        type="file"
                        accept=".txt"
                        onChange={onUpload}
                    />
                </>}
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
                {[["#170fe6", "#bf0202", "green", "turquoise", "gold"],
                ["#A85CF9", '#6FDFDF', '#446A46', '#F8B400', '#FF6363'],
                ].map((pallete, i) => <div
                    key={`pallate-${i}`}
                    className="row"
                    onClick={() => {
                        const keys = ["main", "invalid", "valid", "visited", "path"]
                        dispatch(setStateValue({ colors: keys.reduce((acc, key, j) => ({ ...acc, [key]: pallete[j] }), {}) }))
                        const container = document.getElementById('algorithmic-visualiser-container')
                        keys.forEach((key, j) => {
                            container.style.setProperty(`--color-${key}`, pallete[j]);

                        })
                    }}
                >
                    {pallete.map((color, n) => <div key={`color-${n}`} style={{ width: 30, height: 10, backgroundColor: color }} className=""></div>)}
                </div>)}
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