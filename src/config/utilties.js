export const randomArray = (length = 10, max = 100) => Array.from({ length }, () => Math.floor(Math.random() * max))

export const scaleNumber = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}