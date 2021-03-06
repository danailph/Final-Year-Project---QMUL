import { randomArray, randomGraph, getGrid } from "./utilties"

export const initialState = {
    data: randomArray(15),
    graph: randomGraph(12, 2),
    grid: getGrid(),
    isOverlayVisible: false,
    isVisualiserSplit: false,
    colors: {
        main: "#170fe6",
        invalid: "#bf0202",
        valid: "green",
        visited: "turquoise",
        path: "gold",
    }
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
        case 'setStateValue':
            return { ...state, ...payload }
        default:
            return { ...state }
    }
}


export const sortingVisualisationReducer = (state, { type, payload }) => {
    switch (type) {
        case "sortingGoToBeggining":
            return { ...state, isPaused: true, currentStep: 0, targetStep: 0 }
        case "sortingGoToEnd":
            return { ...state, isPaused: true, currentStep: state.animations.length, targetStep: state.animations.length }

        case "sortingGoBack":
            return { ...state, isPaused: true, targetStep: Math.max(0, state.currentStep - 1) }
        case "sortingGoForward":
            return { ...state, isPaused: true, targetStep: Math.min(state.animations.length, state.currentStep + 1) }

        case "sortingPlay":
            return { ...state, isPaused: false, targetStep: state.animations.length }
        case "sortingPause":
            return { ...state, isPaused: true }

        case "sortingSpeed":
            return { ...state, isPaused: true, speed: payload }
        case 'sortingSetValue':
            return { ...state, ...payload }
        default:
            return { ...state }
    }
}

export const pathFindingVisualisationReducer = (state, { type, payload }) => {
    switch (type) {
        case "pathFindingGoToBeggining":
            return { ...state, isPaused: true, currentStep: 0, targetStep: 0 }
        case "pathFindingGoToEnd":
            return { ...state, isPaused: true, currentStep: state.animations.length, targetStep: state.animations.length }

        case "pathFindingGoBack":
            return { ...state, isPaused: true, targetStep: Math.max(0, state.currentStep - 1) }
        case "pathFindingGoForward":
            return { ...state, isPaused: true, targetStep: Math.min(state.animations.length, state.currentStep + 1) }

        case "pathFindingPlay":
            return { ...state, isPaused: false, targetStep: state.animations.length }
        case "pathFindingPause":
            return { ...state, isPaused: true }

        case "pathFindingSpeed":
            return { ...state, isPaused: true, speed: payload }
        case 'pathFindingSetValue':
            return { ...state, ...payload }
        default:
            return { ...state }
    }
}

export const searchingVisualisationReducer = (state, { type, payload }) => {
    switch (type) {
        case "searchingGoToBeggining":
            return { ...state, isPaused: true, currentStep: 0, targetStep: 0 }
        case "searchingGoToEnd":
            return { ...state, isPaused: true, currentStep: state.animations.length, targetStep: state.animations.length }

        case "searchingGoBack":
            return { ...state, isPaused: true, targetStep: Math.max(0, state.currentStep - 1) }
        case "searchingGoForward":
            return { ...state, isPaused: true, targetStep: Math.min(state.animations.length, state.currentStep + 1) }

        case "searchingPlay":
            return { ...state, isPaused: false, targetStep: state.animations.length }
        case "searchingPause":
            return { ...state, isPaused: true }

        case "searchingSpeed":
            return { ...state, isPaused: true, speed: payload }
        case 'searchingSetValue':
            return { ...state, ...payload }
        default:
            return { ...state }
    }
}

export const graphVisualisationReducer = (state, { type, payload }) => {
    switch (type) {
        case "graphGoToBeggining":
            return { ...state, isPaused: true, currentStep: 0, targetStep: 0 }
        case "graphGoToEnd":
            return { ...state, isPaused: true, currentStep: state.animations.length, targetStep: state.animations.length }

        case "graphGoBack":
            return { ...state, isPaused: true, targetStep: Math.max(0, state.currentStep - 1) }
        case "graphGoForward":
            return { ...state, isPaused: true, targetStep: Math.min(state.animations.length, state.currentStep + 1) }

        case "graphPlay":
            return { ...state, isPaused: false, targetStep: state.animations.length }
        case "graphPause":
            return { ...state, isPaused: true }

        case "graphSpeed":
            return { ...state, isPaused: true, speed: payload }
        case 'graphSetValue':
            return { ...state, ...payload }
        default:
            return { ...state }
    }
}
