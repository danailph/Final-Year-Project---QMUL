import { bubbleSort, bubbleSortE } from "./bubbleSort"
import { dijkstra } from "./dijkstra"
import { linearSearch, binarySearch } from "./search"
import { dfs, bfs } from './graphs'


export const algorithms = {
    'bubble-sort': bubbleSort,
    'bubble-sort-e': bubbleSortE,
    'insertion-sort': () => ({}),
    'quick-sort': () => ({}),
    'linear-search': linearSearch,
    'binary-search': binarySearch,
    dijkstra,
    dfs,
    bfs,

    undefined: () => ({})
}