export const tabs = [
    { label: 'Data Structures', value: 'data-structures' },
    { label: 'Sorting', value: 'sorting' },
    { label: 'Searching', value: 'searching' },
    { label: 'Graph', value: 'graph' },
    { label: 'Path Finding', value: 'path-finding' },
]

export const options = {
    "data-structures": [{ label: 'a', value: 'a' }, { label: 'b', value: 'b' }],
    "sorting": [
        { label: 'Bubble Sort', value: 'bubble-sort' },
        { label: 'Bubble Sort E', value: 'bubble-sort-e' },
        // { label: 'Insertion Sort', value: 'insertion-sort' },
        // { label: 'Quick Sort', value: 'quick-sort' },
    ],
    "searching": [{ label: 'Linear Search', value: 'linear-search' }, { label: 'Binary Search', value: 'binary-search' },],
    "path-finding": [{ label: "Dijkstra's Algorithm", value: 'dijkstra' }],
    graph: [
        { label: "Breadth First Search", value: 'bfs' },
        { label: "Depth First Search", value: 'dfs' }
    ],
    null: [],
    undefined: [],
}