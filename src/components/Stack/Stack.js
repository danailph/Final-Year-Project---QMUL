import React, { useState } from "react"
import "./styles.scss"

const Stack = () => {
  const [stack, setStack] = useState([])

  const push = (element) => setStack((stack) => [...stack, element])
  // const size = () => stack.length
  const isEmpty = () => stack.length === 0
  const clear = () => setStack([])
  const peek = () => stack[stack.length - 1]
  const pop = () => {
    if (isEmpty()) return undefined
    else {
      const removed = peek()
      setStack((stack) => stack.slice(0, stack.length - 1))
      return removed
    }
  }

  return <div className="stack-container">
    <div className="stack-content col">{stack.map(el => <div className="">
      {el}
    </div>)}</div>
    <div className="stack-controls row">
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

export default Stack