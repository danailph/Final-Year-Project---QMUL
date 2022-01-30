import { Slider } from 'components'
import "./styles.scss"

const Player = () => {
    return <div className="player-container">
        <div className="player-speed">
            <div className="row">
                <p>Slow</p>
                <p>Fast</p>
            </div>
            <Slider />
        </div>
        <div className="player-controls row">
            {[
                { value: 'start' },
                { value: 'back' },
                { value: 'pause' },
                { value: 'forward' },
                { value: 'end' },
            ].map(({ value }) => <div
                key={value}
                className={`icon icon-${value}`} />
            )}
        </div>
    </div>
}

export default Player