import { bubbleSort } from "./bubbleSort"
import { dijkstra } from "./dijkstra"


export const algorithms = {
    'bubble-sort': bubbleSort,
    'insertion-sort': () => ({}),
    'quick-sort': () => ({}),

    'dijkstra': dijkstra,

    undefined: () => ({})
}