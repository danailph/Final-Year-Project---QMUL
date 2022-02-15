import { bubbleSort, bubbleSortE } from "./bubbleSort"
import { dijkstra } from "./dijkstra"


export const algorithms = {
    'bubble-sort': bubbleSort,
    'bubble-sort-e': bubbleSortE,
    'insertion-sort': () => ({}),
    'quick-sort': () => ({}),

    'dijkstra': dijkstra,

    undefined: () => ({})
}