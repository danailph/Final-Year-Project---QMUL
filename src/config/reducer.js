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


export const sortingVisualisationReducer = (state, { type, payload }) => {
    console.log(type, payload);
    switch (type) {
        case "sortgingGoToBeggining":
            return { ...state, isPaused: true, currentStep: 0, targetStep: 0 }
        case "sortgingGoToEnd":
            return { ...state, isPaused: true, currentStep: state.animations.length, targetStep: state.animations.length }

        case "sortgingGoBack":
            return { ...state, isPaused: true, targetStep: Math.max(0, state.currentStep - 1) }
        case "sortgingGoForward":
            return { ...state, isPaused: true, targetStep: Math.min(state.animations.length, state.currentStep + 1) }

        case "sortgingPlay":
            return { ...state, isPaused: false, targetStep: state.animations.length }
        case "sortgingPause":
            return { ...state, isPaused: true }

        case "sortingSpeed":
            return { ...state, isPaused: true, speed: payload }
        case 'sortingSetValue':
            return { ...state, ...payload }
        default:
            return { ...state }
    }
}