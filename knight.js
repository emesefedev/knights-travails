const possibleMoves = [[2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2]]

function validMoves(origin) {
    const [posX, posY] = origin
    const positions = possibleMoves.map((possibleMove) => {
        const [x, y] = possibleMove
        return [posX + x, posY + y]
    })

    const validPositions = positions.filter((position) => {
        const [x, y] = position
        return (x >= 0 && x <= 7) && (y >= 0 && y <= 7)
    })

    return validPositions
}

function buildMovesGraph() {
    const graph = {}
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            graph[`[${i}, ${j}]`] = validMoves([i, j])
        }   
    }

    return graph
}

const graph = buildMovesGraph()
console.log(graph)