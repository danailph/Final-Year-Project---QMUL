import { bubbleSort, bubbleSortE } from "./bubbleSort"
import { dijkstra } from "./dijkstra"
import { linearSearch, binarySearch } from "./search"


export const algorithms = {
    'bubble-sort': bubbleSort,
    'bubble-sort-e': bubbleSortE,
    'insertion-sort': () => ({}),
    'quick-sort': () => ({}),
    'linear-search': linearSearch,
    'binary-search': binarySearch,
    'dijkstra': dijkstra,

    undefined: () => ({})
}