import "./styles.scss"

const Slider = ({ value, onChange }) => {
    return <input type="range" min="0" max="10" value={value} className="slider-container" onChange={({ target: { value } }) => onChange(value)} />
}

export default Slider