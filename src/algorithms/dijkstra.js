import { flatten } from 'lodash'

export const dijkstra = (grid) => {
    console.log("a");
    const nodes = flatten(grid), animations = []
    const start = nodes.find(({ isStart }) => isStart)
    const target = nodes.find(({ isTarget }) => isTarget)
    start.distance = 0;
    while (!!nodes.length) {
        nodes.sort((a, b) => a.distance - b.distance)
        const currentNode = nodes.shift();
        const { col, row, isWall, distance } = currentNode || {};
        console.log({ col, row });
        console.log(isWall, distance);
        if (isWall) continue;
        if (distance === Infinity) break
        currentNode.isVisited = true;
        animations.push(currentNode)
        if (currentNode === target) break

        const neighbors = []
        if (row > 0) neighbors.push(grid[row - 1][col]);
        if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
        if (col > 0) neighbors.push(grid[row][col - 1]);
        if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

        const unvisited = neighbors.filter(({ isVisited, isWall }) => !isVisited || isWall)
        console.log(unvisited.length);
        unvisited.forEach((node) => {
            node.distance = distance + 1;
            node.previousNode = currentNode;
        })
    }
    let pathNode = target
    while (pathNode) {
        animations.push({ ...pathNode, isPath: true })
        pathNode = pathNode.previousNode
    }

    return { original: grid, start, target, animations };
}