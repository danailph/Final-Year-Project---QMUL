export const toggleOverlay = () => ({
    type: 'toggleOverlay'
})

export const toggleVisualiserSplit = (payload) => ({
    type: 'toggleVisualiserSplit',
    payload
})

export const resetState = () => ({
    type: 'resetState'
})

export const setStateValue = (payload) => ({
    type: 'setStateValue',
    payload
})

const sortingGoToBeggining = (payload) => ({ type: 'sortingGoToBeggining', payload })
const sortingGoBack = (payload) => ({ type: 'sortingGoBack', payload })
const sortingPlay = (payload) => ({ type: 'sortingPlay', payload })
const sortingPause = (payload) => ({ type: 'sortingPause', payload })
const sortingGoForward = (payload) => ({ type: 'sortingGoForward', payload })
const sortingGoToEnd = (payload) => ({ type: 'sortingGoToEnd', payload })
const sortingSpeed = (payload) => ({ type: 'sortingSpeed', payload })
const sortingSetValue = (payload) => ({ type: 'sortingSetValue', payload })

export const sorting = {
    goToBeggining: sortingGoToBeggining,
    goBack: sortingGoBack,
    play: sortingPlay,
    pause: sortingPause,
    goForward: sortingGoForward,
    goToEnd: sortingGoToEnd,
    speed: sortingSpeed,
    setValue: sortingSetValue
}


const pathFindingGoToBeggining = (payload) => ({ type: 'pathFindingGoToBeggining', payload })
const pathFindingGoBack = (payload) => ({ type: 'pathFindingGoBack', payload })
const pathFindingPlay = (payload) => ({ type: 'pathFindingPlay', payload })
const pathFindingPause = (payload) => ({ type: 'pathFindingPause', payload })
const pathFindingGoForward = (payload) => ({ type: 'pathFindingGoForward', payload })
const pathFindingGoToEnd = (payload) => ({ type: 'pathFindingGoToEnd', payload })
const pathFindingSpeed = (payload) => ({ type: 'pathFindingSpeed', payload })
const pathFindingSetValue = (payload) => ({ type: 'pathFindingSetValue', payload })

export const pathFinding = {
    goToBeggining: pathFindingGoToBeggining,
    goBack: pathFindingGoBack,
    play: pathFindingPlay,
    pause: pathFindingPause,
    goForward: pathFindingGoForward,
    goToEnd: pathFindingGoToEnd,
    speed: pathFindingSpeed,
    setValue: pathFindingSetValue
}

const searchingGoToBeggining = (payload) => ({ type: 'searchingGoToBeggining', payload })
const searchingGoBack = (payload) => ({ type: 'searchingGoBack', payload })
const searchingPlay = (payload) => ({ type: 'searchingPlay', payload })
const searchingPause = (payload) => ({ type: 'searchingPause', payload })
const searchingGoForward = (payload) => ({ type: 'searchingGoForward', payload })
const searchingGoToEnd = (payload) => ({ type: 'searchingGoToEnd', payload })
const searchingSpeed = (payload) => ({ type: 'searchingSpeed', payload })
const searchingSetValue = (payload) => ({ type: 'searchingSetValue', payload })

export const searching = {
    goToBeggining: searchingGoToBeggining,
    goBack: searchingGoBack,
    play: searchingPlay,
    pause: searchingPause,
    goForward: searchingGoForward,
    goToEnd: searchingGoToEnd,
    speed: searchingSpeed,
    setValue: searchingSetValue
}

const graphGoToBeggining = (payload) => ({ type: 'graphGoToBeggining', payload })
const graphGoBack = (payload) => ({ type: 'graphGoBack', payload })
const graphPlay = (payload) => ({ type: 'graphPlay', payload })
const graphPause = (payload) => ({ type: 'graphPause', payload })
const graphGoForward = (payload) => ({ type: 'graphGoForward', payload })
const graphGoToEnd = (payload) => ({ type: 'graphGoToEnd', payload })
const graphSpeed = (payload) => ({ type: 'graphSpeed', payload })
const graphSetValue = (payload) => ({ type: 'graphSetValue', payload })

export const graphActions = {
    goToBeggining: graphGoToBeggining,
    goBack: graphGoBack,
    play: graphPlay,
    pause: graphPause,
    goForward: graphGoForward,
    goToEnd: graphGoToEnd,
    speed: graphSpeed,
    setValue: graphSetValue
}