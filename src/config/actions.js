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

const sortgingGoToBeggining = (payload) => ({ type: 'sortgingGoToBeggining', payload })
const sortgingGoBack = (payload) => ({ type: 'sortgingGoBack', payload })
const sortgingPlay = (payload) => ({ type: 'sortgingPlay', payload })
const sortgingPause = (payload) => ({ type: 'sortgingPause', payload })
const sortgingGoForward = (payload) => ({ type: 'sortgingGoForward', payload })
const sortgingGoToEnd = (payload) => ({ type: 'sortgingGoToEnd', payload })
const sortingSpeed = (payload) => ({ type: 'sortingSpeed', payload })
const sortingSetValue = (payload) => ({ type: 'sortingSetValue', payload })

export const sorting = {
    goToBeggining: sortgingGoToBeggining,
    goBack: sortgingGoBack,
    play: sortgingPlay,
    pause: sortgingPause,
    goForward: sortgingGoForward,
    goToEnd: sortgingGoToEnd,
    speed: sortingSpeed,
    setValue: sortingSetValue
}