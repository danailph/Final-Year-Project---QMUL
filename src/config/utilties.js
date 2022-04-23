export const randomArray = (length = 10, max = 100) => Array.from({ length }, () => Math.floor(Math.random() * (max - 1)) + 1)
export const randomNumber = (max = 100, min = 1) => Math.floor(Math.random() * (max - 1)) + 1

export const scaleNumber = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

export const getGrid = ({ rows = 10, cols = 30, start = { row: 5, col: 10 }, target = { row: 5, col: 20 } } = {}) => Array.from({ length: rows }, (_, row) => Array.from({ length: cols }, (_, col) => ({
    row,
    col,
    isStart: row === start.row && col === start.col,
    isTarget: row === target.row && col === target.col,
    distance: Infinity,
    isVisited: false,
    isWall: col === 15 && ![1, 2,].includes(row),
    previousNode: null,
})))