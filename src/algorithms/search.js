export const linearSearch = (data, value = 70) => {
    const animations = []
    for (let i = 0; i < data.length; i++) {
        animations.push({ index: i, color: 'red' })
        if (data[i] === value) {
            animations.push({ index: i, color: 'green' })
            return { data, animations }
        }
    }
    return { data, animations }
}

export const binarySearch = (dataParam, value) => {
    const data = [...dataParam].sort((a, b) => a - b)
    const animations = []

    let start = 0, end = data.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        animations.push({ index: mid, color: 'red' })
        if (data[mid] === value) {
            animations.push({ index: mid, color: 'green' })
            return { data, animations }
        }
        else if (data[mid] < value) {
            animations.push({ index: data.map((v, i) => i).slice(0, mid), color: 'red' })
            start = mid + 1;
        } else {
            animations.push({ index: data.map((v, i) => i).slice(mid), color: 'red' })
            end = mid - 1;
        }
    }
    return { data, animations };
}