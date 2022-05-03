export const tabs = [
    { label: 'Data Structures', value: 'data-structures' },
    { label: 'Sorting', value: 'sorting' },
    { label: 'Searching', value: 'searching' },
    { label: 'Graph', value: 'graph' },
    { label: 'Path Finding', value: 'path-finding' },
]

export const options = {
    "data-structures": [
        { label: 'Linked List', value: 'linked-list' },
        { label: 'Stack', value: 'stack' },
        { label: 'Queue', value: 'queue' }
    ],
    "sorting": [
        { label: 'Bubble Sort', value: 'bubble-sort' },
        { label: 'Bubble Sort E', value: 'bubble-sort-e' },
    ],
    "searching": [
        { label: 'Linear Search', value: 'linear-search' },
        { label: 'Binary Search', value: 'binary-search' },
    ],
    "path-finding": [
        { label: "Dijkstra's Algorithm", value: 'dijkstra' }
    ],
    graph: [
        { label: "Breadth First Search", value: 'bfs' },
        { label: "Depth First Search", value: 'dfs' }
    ],
    null: [],
    undefined: [],
}

export const colorsPalletes = [
    ["#170fe6", "#bf0202", "green", "turquoise", "gold"],
    ["#A85CF9", '#FF6363', '#446A46', '#6FDFDF', '#F8B400',],
]

export const descriptions = {
    "data-structures": {
        'linked-list': `A Linked List is a sequence of zero or more elements called nodes. Each node stores two pieces of information – some data (called a value) and a reference to the next node in a list (called a pointer). A special pointer called “null” is used to indicate the absence of a node’s successor i.e. the end of the linked list. 
Contrastingly to an array, does not have a fixed size and can be extended / shortened dynamically by applying manipulations on it:
The main operations on a linked list include:
    -	Accessing an element – start with the first node in the linked list and follow the pointers until the particular node is reached or the end of the list is reached.
    -	Insertion – add a node that points to the next one and set the pointer of previous node to this one. 
    -	Deletion – set the pointer of the previous node to the next node in the list. 
`,
        'stack': `A Stack is essentially a linked list where insertions and deletions can be done only at the end. It operates in a last-in-first-out approach and is usually visualised horizontally. It has two main operations:
    -	Pushing on the stack – adding a new item on the end. 
    -	Popping from the stack – removing the last item that has been added at the end. 

The Stack data structure is indispensable for implementing recursive algorithms where the order of operations is very important. 
`,
        'queue': `A Queue is another special variation on a linked list. It operates in a first-in-first-out approach just like a real-world queue hence its name. Items are added at the end of the queue and taken out from the front. The two main operations are:
    -	Enqueueing – adding and item on the end. 
    -	Dequeuing – removing an item from the front. 

The Queue data structure is widely used in algorithms including graph traversals which would be explored in-depth in a subsequent paragraph.  
`
    },
    "sorting": {
        'bubble-sort': `Bubble sort is one of the simplest sorting algorithms and arguably the first one thought to students in universities. It starts from the first value in a list and compares it to the next one. It the initial value is larger, the two are swapped. Then the next two values are considered and compared. This process is repeated iteratively throughout the list until the biggest value is at the end. The process is then repeated n-1 time for an input of size n. This assures the after every pass the next greatest value is positioned correctly. 
The time complexity of Bubble sort if square – O(n2) – which means its efficiency is considerably impacted by the size of the input data set. For the algorithm to complete it need to do n passes of n comparisons. 
`,
        'bubble-sort-e': `A second more efficient version of the same algorithm is implemented. After each pass i, the program can be sure that the n-i+1 value is sorted, therefore, it does not need to do that comparison. For example, on its last pass though the list it only needs to compare the first two values as the rest of the data is already sorted. This results in less computations and highly increases the efficiency of the algorithm.`
    },
    "searching": {
        'linear-search': `Linear Search is the most basic algorithm present. It is straightforward and sequentially looks for the key by checking every value in a data set until a match is found or not. 
The algorithm has a linear time and space complexity and grows proportionally with the number of items thus is not effective when operating on a large scale. However, the it is extremally simple to implement and does not require any pre-conditions. 
`,
        'binary-search': `Binary Search is a more advance algorithm that is very efficient. It uses a “divide and conquer” approach compared to a “brute force” one which means that complete parts of the data set that are irrelevant to the problem at hand are ignored. 
However, a pre-condition of the algorithm is that the data must be sorted before it is operated on it. This could result in more computation depending on how the data is structured.
When looking for the key the algorithm starts at the middle of the data set instead of at the beginning. If the key is smaller than the middle value the whole right part of the data is ignored and vice versa if the key is bigger, the whole left part is ignored. This process is repeated either iteratively or recursively until the key is found or only one item is left in the data set. 
The algorithm closely resembles how a person would search in a dictionary. Instead of looking through every word starting from “A”, one adjusts by skipping pages left or right depending on the particular letter they are looking for. 
Binary Search has on average a logarithmic time complexity which is much faster than linear especially when operating on large data sets. This makes it a preferred solution in many situations. However, its effectiveness is balanced by the underlying data structure being searched. 
`
    },
    "path-finding": {
        'dijkstra': `Another common problem of Graph theory is finding the shortest path between two nodes. Some of its applications are in transportation networks (e.g. Google maps navigation), network packets routing, etc…
For the purposes of this project Dijkstra’s algorithm is implemented and visualised on a grid. In order to make the visualisation more dynamic and interactive the user is able to draw walls that obstruct the path. For simplicity reasons all distances between nodes are equal.
`
    },
    "graph": {
        'bfs': `Contrastingly, Breath-First-Search explores all adjacent nodes to the initial one before proceeding deeper into the graph. Then it visits all nodes that are 2 edges away from the first one and so on until all nodes are reached.
This algorithm relies on a Queue data structures to trace its operation. On each iteration, the algorithm identifies all unvisited nodes that are adjacent to the front node, marks them as visited, and adds them to the queue; after that, the front node is removed from the queue. 
`,
        'dfs': `The Depth-First-Search algorithm starts from a selected node (Node 0 in the project) by marking it as visited. The process is iterative and on each step the algorithm proceeds to an unvisited node that is adjacent to the one it is currently in. The process is continued until a dead-end is reached – i.e. there are no unvisited adjacent nodes. At a dead end, the algorithm backs up one edge to the vertex it came from and tries to continue visiting unvisited vertices from there. The algorithm eventually halts after backing up to the starting vertex, with the latter being a dead end. By then, all the vertices in the same connected component as the starting vertex have been visited. 
This algorithm uses a Stack data structure to keep track of nodes being explored. A node is pushed onto the Stack when it is visited for the first time and popped of the Stack when it becomes a dead end.
In other words, the algorithm goes as deeply in the graph – or a branch of it – as possible before returning “home” and exploring the next adjacent node. 
`,
    },
}
export const codes = {
    "data-structures": {
        'linked-list': `class Node {
  constructor(element, next = null) {
    this.element = element;
    this.next = next;
  }
}

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
`,
        'stack': `const [stack, setStack] = useState([])

const push = (element) => setStack((stack) => [...stack, element])

const size = () => stack.length

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
}`,
        'queue': `const [queue, setQueue] = useState([])

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
}`
    },
    "sorting": {
        'bubble-sort': `const bubbleSort = (arr) => {
    const sorted = [...arr]
    if (!sorted.length) return sorted
    for (let i = 0; i < sorted.length - 1; i++) {
        for (let j = 0; j <= sorted.length - 2; j++) {
            const swap = sorted[j] > sorted[j + 1]
            if (swap) { [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]] }
        }
    }
    return { original: arr, animations, sorted }
}
`,
        'bubble-sort-e': `const bubbleSortE = (arr) => {
    const sorted = [...arr]
    if (!sorted.length) return sorted
    for (let i = 0; i < sorted.length - 1; i++) {
        for (let j = 0; j <= sorted.length - i - 2; j++) {
            const swap = sorted[j] > sorted[j + 1]
            if (swap) { [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]] }
        }
    }
    return { original: arr, sorted }`
    },
    "searching": {
        'linear-search': `const linearSearch = (data, value) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i] === value) {
            return data[i]
        }
    }
    return return -1;
}`,
        'binary-search': `const binarySearch = (dataParam, value) => {
    const data = [...dataParam].sort((a, b) => a - b)

    let start = 0, end = data.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (data[mid] === value) {
            return data[mid]
        }
        else if (data[mid] < value) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return -1;
}`
    },
    "path-finding": {
        'dijkstra': `const dijkstra = (original) => {
    const grid = original.map(row => row.reduce((acc, cur) => [...acc, { ...cur }], []))
    const nodes = flatten(grid)
    const start = nodes.find(({ isStart }) => isStart)
    const target = nodes.find(({ isTarget }) => isTarget)
    start.distance = 0;
    while (!!nodes.length) {
        nodes.sort((a, b) => a.distance - b.distance)
        const currentNode = nodes.shift();
        const { col, row, isWall, distance } = currentNode || {};
        if (isWall) continue;
        if (distance === Infinity) break
        currentNode.isVisited = true;
        if (currentNode === target) break

        const neighbors = []
        if (row > 0) neighbors.push(grid[row - 1][col]);
        if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
        if (col > 0) neighbors.push(grid[row][col - 1]);
        if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

        const unvisited = neighbors.filter(({ isVisited, isWall }) => !isVisited || isWall)
        unvisited.forEach((node) => {
            node.distance = distance + 1;
            node.previousNode = currentNode;
        })
    }
    let pathNode = target
    while (pathNode) {
        pathNode = pathNode.previousNode
    }

    return { original, start, target };
}`
    },
    "graph": {
        'bfs': `const bfs = (adjacencyList, start = 0) => {
    const queue = [start];
    const result = [];
    const visited = {};
    visited[start] = true;
    let currentVertex;
    while (queue.length) {
        currentVertex = queue.shift();
        result.push(currentVertex)
        adjacencyList[currentVertex].at(1).forEach(neighbor => {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        });
    }
    return { result, original: adjacencyList };
}`,
        'dfs': `const dfs = (adjacencyList, start = 0) => {
    const result = [];
    const stack = [start];
    const visited = {};
    visited[start] = true;
    let currentVertex;
    while (stack.length) {
        currentVertex = stack.pop();
        result.push(currentVertex);
        [...adjacencyList[currentVertex].at(1)].reverse().forEach(neighbor => {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                stack.push(neighbor);
            }
        });
    }
    return { result, original: adjacencyList };

}`,
    },
}