package utils

import "example.com/gol/config"

func CalculateNbor(row int, col int, grid *Grid) int {
	var aliveCells int = 0

	numRows := len(grid)
	numCols := len(grid[0])
	neighbors := [][]int{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, {0, 1},
		{1, -1}, {1, 0}, {1, 1},
	}
	for _, neighbor := range neighbors {
		newRow, newCol := row+neighbor[0], col+neighbor[1]

		if newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols {
			aliveCells += grid[newRow][newCol]
		}
	}
	return aliveCells
}

func IsCellDeadOrAlive(row int, col int, grid *Grid) int {
	currentCell := grid[row][col]
	aliveCells := CalculateNbor(row, col, grid)

	switch currentCell {
	case config.LIVE:
		if aliveCells < 2 {
			return config.DEAD
		}

		if 2 == aliveCells || aliveCells == 3 {
			return config.LIVE
		}

		if aliveCells > 3 {
			return config.DEAD
		}

	case config.DEAD:
		if aliveCells == 3 {
			return config.LIVE
		}
	}
	return config.DEAD
}

func GenerateNextGeneration(grid *Grid) *Grid {
	var nextGen Grid
	for row := 0; row < len(grid); row++ {
		for col := 0; col < len(grid[row]); col++ {
			nextGen[row][col] = IsCellDeadOrAlive(row, col, grid)
		}
	}
	return &nextGen
}
