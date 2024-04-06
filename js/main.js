const canvas = document.getElementById('root');
const ctx = canvas.getContext('2d');

const RED = "#550000"
const BLACK = "#0f0f0f"

const WIDTH = 800;
const HEIGHT = 600;
const C_WIDTH = 200;
const C_HEIGHT = 200;

const ROWS = WIDTH / C_WIDTH;
const COLS = HEIGHT / C_HEIGHT;
const DEAD = 0
const LIVE = 1
const SECONDS = 0.5

canvas.width = WIDTH;
canvas.height = HEIGHT;

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve,ms))
}

function populateGrid(grid) {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            grid[row][col] = Math.round(Math.random())
        }
    }
}

function generateGrid() {
    return new Array(ROWS).fill(new Array(COLS).map(() => Math.round(Math.random())))
}

function calculateNeigthboors(row, col, currentCell, grid) {
    const nbors = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],  [1, 0],
        [1, -1],  [1, 0],  [1, 1]
    ]

    let aliveCells = 0
    const rows = grid.length
    const cols = grid[0].length

    for (let neightboor of nbors) {
        const newRow = row + neightboor[0]
        const newCol = col + neightboor[1]

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            aliveCells += grid[newRow][newCol]
        }
    }

    return aliveCells
}

function isCellDeadOrAlive(row, col, grid) {
    const currentCell = grid[row][col]
    const aliveNbors = calculateNeigthboors(row, col, currentCell, grid)
    
    switch (currentCell) {
        case LIVE: {
            
        }

        case DEAD: {

        }

        default:
            return DEAD
    }

    return DEAD
}

function nextGeneration(grid) {
    let nextGen = generateGrid()

    for (let row = 0; row < nextGen.length; row++) {
        for (let col = 0; col < nextGen[0].length; col++) {
            nextGen = isCellDeadOrAlive(row, col, grid)
        }
    }

    return nextGen
}

function renderCell(row, col, grid) {
    let y = (row / C_WIDTH) 
    let x = (col / C_HEIGHT)

    const isAlive=grid[y][x] === LIVE
    console.log({ y, row }, { x, col }, grid[y][x], isAlive)

    ctx.fillStyle = BLACK
    if (isAlive) {
        ctx.fillStyle = RED
    }
    ctx.fillRect(row, row, C_WIDTH, C_HEIGHT)
}

function initialGrid() {
    let grid = generateGrid()
    // populateGrid(grid)
    return grid
}

function renderGrid(grid) {
    ctx.fillStyle = BLACK
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    console.log(grid)

    for (let row = 0; row < WIDTH; row += C_WIDTH) {
        for (let col = 0; col < HEIGHT; col += C_HEIGHT) {
            renderCell(col, row, grid)
        }
    }

}

async function main() {
    let grid = initialGrid()
    renderGrid(grid)

    // while(true) {
    //     await sleep(SECONDS)
    //
    //     const next = nextGeneration(grid)
    //     renderGrid(next)
    //     grid = next
    // }
}

main()
