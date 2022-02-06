export const bubbleSort = (arr) => {
    const animations = [], sorted = [...arr]
    if (!sorted.length) return sorted
    for (let i = 0; i < sorted.length - 1; i++) {
        for (let j = 0; j <= sorted.length - i - 1; j++) {
            animations.push({ color: 'red', index: j })
            const swap = sorted[j] > sorted[j + 1]
            if (swap) { [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]] }
            animations.push({ index: j, newValue: sorted[j], oldValue: sorted[j + 1], swap })
            animations.push({ color: 'turquoise', index: j })
        }
    }
    return { original: arr, animations, sorted }
}