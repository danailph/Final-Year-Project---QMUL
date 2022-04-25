import React, { useState } from "react"
import "./styles.scss"

const Queue = () => {
  const [queue, setQueue] = useState([])

  const push = (element) => setQueue((queue) => [...queue, element])
  const isEmpty = () => queue.length === 0
  const clear = () => setQueue([])
  const peek = () => queue[0]
  const pop = () => {
    if (isEmpty()) return undefined
    else {
      const removed = peek()
      setQueue((queue) => queue.slice(1))
      return removed
    }
  }

  return <div className="queue-container">
    <div className="queue-content col">{queue.map(el => <div className="">
      {el}
    </div>)}</div>
    <div className="queue-controls row">
      <div className="button" onClick={() => {
        const value = prompt('Enter a number')
        if (value) push(Number(value))
      }}>Add</div>
      <div className="button" onClick={() => alert(peek())}>Peek</div>
      <div className="button" onClick={pop}>Pop</div>
      <div className="button" onClick={clear}>Clear</div>
    </div>
  </div>
}

export default Queue