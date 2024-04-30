const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

if (!ctx) {
  throw new Error('No context was founded');
}

const WIDTH = 800;
const HEIGHT = 600;
const cell_size = 10;
const LIVE = 1;
const DEAD = 0;

const base_width = WIDTH / cell_size;
const base_height = HEIGHT / cell_size;

canvas.width = WIDTH;
canvas.height = HEIGHT;

/**
 * @returns { number[][] }
 */
function create_cells() {
  const grid = [];
  for (let row = 0; row < base_height; row++) {
    grid[row] = [];
    for (let col = 0; col < base_width; col++) {
      const isAlive = Math.round(Math.random());
      grid[row][col] = isAlive;
    }
  }
  return grid;
}

/**
 * @param { number[][] } grid
 * @return { void }
 */
function fill_cells(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      ctx.fillStyle = '#000';
      if (grid[row][col]) {
        ctx.fillStyle = 'rgb(70,0,0)';
      }
      ctx.fillRect(col * cell_size, row * cell_size, cell_size, cell_size);
    }
  }
}

// Grid
function create_grid() {
  ctx.fillStyle = '#303030';
  ctx.strokeStyle = '1px solid #000';
  for (let row = 0; row < HEIGHT; row += cell_size) {
    for (let col = 0; col < WIDTH; col += cell_size) {
      ctx.strokeRect(col, row, cell_size, cell_size);
    }
  }
}

/**
 * @param { number } row
 * @param { number } col
 * @param { number[][] } grid
 * @return { number }
 */
function calculate_neighboors(row, col, grid) {
  const nbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [1, 0],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let aliveCells = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  for (let neightboor of nbors) {
    const newRow = row + neightboor[0];
    const newCol = col + neightboor[1];

    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      aliveCells += grid[newRow][newCol];
    }
  }

  return aliveCells;
}

/**
 * @param { number } row
 * @param { number } col
 * @param { number[][] } grid
 * @return { number }
 */
function is_cell_dead_or_alive(row, col, grid) {
  const aliveNbors = calculate_neighboors(row, col, grid);
  const currentCell = grid[row][col];

  switch (currentCell) {
    case LIVE: {
      if (aliveNbors < 2 || aliveNbors > 3) {
        return DEAD;
      }
      return LIVE;
    }

    case DEAD: {
      if (aliveNbors === 3) {
        return LIVE;
      }
      return DEAD;
    }

    default:
      return DEAD;
  }
}

/**
 * @param {number[][]} grid
 * @returns { number[][] }
 */
function next_generation(grid) {
  const nextGen = [];
  for (let row = 0; row < base_height; row++) {
    nextGen[row] = [];
    for (let col = 0; col < base_width; col++) {
      nextGen[row][col] = is_cell_dead_or_alive(row, col, grid);
    }
  }
  return nextGen;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  let cells = create_cells();
  create_grid();

    while(true) {
        fill_cells(cells);
        await sleep(100)

        const new_cells = next_generation(cells);
        cells = new_cells
    }
}

main();
