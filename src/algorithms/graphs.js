export const bfs = (adjacencyList, start = 0) => {
    const queue = [start];
    const result = [];
    const visited = {};
    visited[start] = true;
    let currentVertex;
    while (queue.length) {
        currentVertex = queue.shift();
        result.push(currentVertex)
        adjacencyList[currentVertex].at(1).forEach(neighbor => {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        });
    }
    return { animations: result, original: adjacencyList };
}
export const dfs = (adjacencyList, start = 0) => {
    const result = [];
    const stack = [start];
    const visited = {};
    visited[start] = true;
    let currentVertex;
    while (stack.length) {
        currentVertex = stack.pop();
        result.push(currentVertex);
        [...adjacencyList[currentVertex].at(1)].reverse().forEach(neighbor => {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                stack.push(neighbor);
            }
        });
    }
    return { animations: result, original: adjacencyList };

}