import React, { useState } from "react"
import "./styles.scss"

class Node {
  constructor(element, next = null) {
    this.element = element;
    this.next = next;
  }
}

const LinkedList = () => {
  const [linkedList, setLinkedList] = useState({ head: null, count: 0 })

  const push = (element) => {
    let current;
    const node = new Node(element);
    if (linkedList.head === null) {
      setLinkedList((linkedList) => ({ ...linkedList, head: node }))
    } else {
      current = linkedList.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
    setLinkedList((linkedList) => ({ ...linkedList, count: linkedList.count + 1 }))
    return node;
  }

  const removeAt = (index) => {
    if (index < 0 || index >= linkedList.count) return undefined;
    let current = linkedList.head;
    if (index === 0) setLinkedList((linkedList) => ({ ...linkedList, head: current.next }))
    else {
      const previous = getElementAt(index - 1);
      current = previous.next;
      previous.next = current.next;
    }
    setLinkedList((linkedList) => ({ ...linkedList, count: linkedList.count - 1 }))
    return current;
  }

  const getElementAt = (index) => {
    if (index < 0 || index >= linkedList.count) return undefined;
    let current = linkedList.head;
    for (let i = 0; i < index && current !== null; i++) {
      current = current.next;
    }
    return current;
  }

  const insertAt = (element, index) => {
    if (index < 0 || index >= linkedList.count) return undefined;

    const node = new Node(element);
    if (index === 0) {
      const current = linkedList.head;
      node.next = current;
      setLinkedList((linkedList) => ({ ...linkedList, head: node }))
    } else {
      const previous = getElementAt(index - 1);
      const current = previous.next;
      node.next = current;
      previous.next = node;
    }
    setLinkedList((linkedList) => ({ ...linkedList, count: linkedList.count + 1 }))
    return node;
  }

  const indexOf = (element) => {
    let current = linkedList.head;
    console.log(element, current);
    for (let i = 0; i < linkedList.count && current !== null; i++) {
      if (element === current.element) return i;
      current = current.next;
    }
    return -1;
  }

  const remove = (element) => {
    const index = indexOf(element);
    return removeAt(index);
  }

  const clear = () => setLinkedList({ head: null, count: 0 })

  const toArray = () => {
    if (!linkedList.count) return [];

    const linkedListArr = [];
    let current = linkedList.head;
    for (let i = 0; i < linkedList.count && current !== null; i++) {
      linkedListArr.push(current.element);
      current = current.next;
    }
    return linkedListArr;
  }
  console.log(toString());
  return <div className="linked-list-container col">
    <div className="linked-list-content row">
      <h2>Head</h2>
      <div className="arrow" />
      <div className="scroll-container row">
        {toArray()?.map((el, i) => <div className="single-element row">
          {i !== 0 && <div className="arrow" />}
          <p>{el}</p>
        </div>)}
      </div>
      <div className="arrow" />
      <h2>null</h2>
    </div>
    <div className="linked-list-controls row">
      <div className="button" onClick={() => {
        const value = prompt('Enter a number')
        if (value) push(Number(value))
      }}>Add</div>
      <div className="button" onClick={() => {
        const value = prompt('Enter an element')
        if (value) remove(Number(value))
      }}>Remove an element</div>
      <div className="button" onClick={() => {
        const value = prompt('Enter an index')
        if (value) removeAt(Number(value))
      }}>Remove at index</div>
      <div className="button" onClick={() => {
        const value = prompt('Enter an index')
        if (value) alert(`Element at ${value}: ${getElementAt(Number(value)).element}`)
      }}>Get element at</div>
      <div className="button" onClick={() => {
        const value = prompt('Enter a number')
        const index = prompt('Enter an index')
        if (value && index) insertAt(Number(value), Number(index))
      }}>Insert at</div>
      <div className="button" onClick={() => {
        const value = prompt('Enter an element')
        if (value) alert(indexOf(Number(value)) >= 0 ? `Index of ${value}: ${indexOf(Number(value))}` : 'Item not found')
      }}>Index of</div>
      <div className="button" onClick={clear}>Clear</div>
    </div>
  </div>
}

export default LinkedList