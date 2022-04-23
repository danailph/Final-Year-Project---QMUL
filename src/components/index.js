import SortignVisualiser from './SortignVisualiser'
import PathFindingVisualiser from "./PathFindingVisualiser"
import SearchingVisualiser from "./SearchingVisualiser"

export { default as Header } from './Header'
export { default as Overlay } from './Overlay'
export { default as Player } from './Player'
export { default as Slider } from './Slider'
export const Visulisers = {
    sorting: SortignVisualiser,
    searching: SearchingVisualiser,
    "path-finding": PathFindingVisualiser,
    "data-structures": () => <div className=""></div>,
    undefined: () => <div className=""></div>
}
