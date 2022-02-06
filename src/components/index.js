import SortignVisualiser from './SortignVisualiser'
import PathFindingVisualiser from "./PathFindingVisualiser"

export { default as Header } from './Header'
export { default as Overlay } from './Overlay'
export { default as Player } from './Player'
export { default as Slider } from './Slider'
export const Visulisers = {
    sorting: SortignVisualiser,
    "data-structures": () => <div className=""></div>,
    "searching": () => <div className=""></div>,
    "path-finding": PathFindingVisualiser,
    undefined: () => <div className=""></div>
}
