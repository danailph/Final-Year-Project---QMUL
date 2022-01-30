import { randomArray } from "./utilties"

export const initialState = {
    data: randomArray(10),
    isOverlayVisible: false,
    isVisualiserSplit: false
}

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case "toggleOverlay":
            return { ...state, isOverlayVisible: !state.isOverlayVisible }
        case 'toggleVisualiserSplit':
            return { ...state, isVisualiserSplit: payload }
        case 'resetState': {
            return { ...state, isVisualiserSplit: null }
        }
        default:
            return { ...state }
    }
}
