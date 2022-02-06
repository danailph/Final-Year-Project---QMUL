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