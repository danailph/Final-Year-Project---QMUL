import SortignVisualiser from './SortignVisualiser'
import PathFindingVisualiser from "./PathFindingVisualiser"
import SearchingVisualiser from "./SearchingVisualiser"
import DataStructuresVisualiser from "./DataStructuresVisualiser"
import GraphVisualiser from "./GraphVisualiser"

export { default as Header } from './Header'
export { default as Overlay } from './Overlay'
export { default as Player } from './Player'
export { default as Slider } from './Slider'

export { default as LinkedList } from './LinkedList'
export { default as Stack } from './Stack'
export { default as Queue } from './Queue'

export const Visulisers = {
    sorting: SortignVisualiser,
    graph: GraphVisualiser,
    searching: SearchingVisualiser,
    "path-finding": PathFindingVisualiser,
    "data-structures": DataStructuresVisualiser,
    undefined: () => <div />
}
