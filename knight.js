const knightMoves = [[2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2]]
const boardSize = 8

const BoardPosition = class {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.predecessor
    }

    getPredecessor() {
        return this.predecessor
    }

    setPredecessor(newPredecessor) {
        this.predecessor = newPredecessor
    }

    getName() {
        return `[${this.x},${this.y}]`
    }

    equals(otherPosition) {
        return this.x === otherPosition.x && this.y === otherPosition.y
    }

    isValid() {
        return (this.x >= 0 && this.x < boardSize) && (this.y >= 0 && this.y < boardSize)
    }
}

function getValidKnightBoardPositionsFromPosition(position) {
    const [x, y] = position
    
    const boardPositions = knightMoves.map((possibleMove) => {
        const [offsetX, offsetY] = possibleMove
        return new BoardPosition(x + offsetX, y + offsetY)
    })

    const validBoardPositions = boardPositions.filter((boardPosition) => {
        return boardPosition.isValid()
    })

    return validBoardPositions
}

function buildMovesGraph() {
    const graph = new Map()
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            graph.set(`[${i},${j}]`, getValidKnightBoardPositionsFromPosition([i, j]))
        }   
    }

    return graph
}

function knightTravails(origin, destination) {

    const start = new BoardPosition(...origin)
    const target = new BoardPosition(...destination)
    
    const queue = [start]

    while (!includesBoardPosition(queue, target)) {
        const boardPosition = queue.shift()

        for (const possibleMove of graph.get(boardPosition.getName())) {
            possibleMove.setPredecessor(boardPosition)
            queue.push(possibleMove)
        }
    }

    const path = [queue[findBoardPosition(queue, target)]]
    while (!includesBoardPosition(path, start)) {
        const predecessor = path[0].getPredecessor()
        path.unshift(predecessor)
    }

    console.log(`The shortest path was ${path.length - 1} moves!`)
    console.log(`The moves were: `)
    for (const boardPosition of path) {
        console.log(boardPosition.getName())
    }
}

function includesBoardPosition(array, value) {
    return array.some((boardPosition) => {
        return boardPosition.equals(value)
    })
}

function findBoardPosition(array, value) {
    return array.findIndex((boardPosition) => {
        return boardPosition.equals(value)
    })
}

const graph = buildMovesGraph()
knightTravails([3, 3], [4, 2])