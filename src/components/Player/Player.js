import { Slider } from 'components'
import "./styles.scss"

const Player = ({ isPlaying, controls: { goToBeggining, goBack, play, pause, goForward, goToEnd }, slider }) => {
    return <div className="player-container">
        <div className="player-speed">
            <div className="row">
                <p>Slow</p>
                <p>Fast</p>
            </div>
            <Slider value={slider?.value} onChange={slider?.onChange} />
        </div>
        <div className="player-controls row">
            {[
                { value: 'start', onClick: goToBeggining },
                { value: 'back', onClick: goBack },
                { value: isPlaying ? 'pause' : "play", onClick: isPlaying ? pause : play },
                { value: 'forward', onClick: goForward },
                { value: 'end', onClick: goToEnd },
            ].map(({ value, onClick }) => <div
                key={value}
                className={`icon icon-${value}`}
                onClick={onClick}
            />
            )}
        </div>
    </div>
}

export default Player