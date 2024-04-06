package main

import (
	"fmt"
	"math"
	"math/rand"
	"time"
)

const (
	WIDTH   int           = 120
	HEIGHT  int           = 30
	LIVE    int           = 1
	DEAD    int           = 0
	SECONDS time.Duration = 1
)

type Grid [HEIGHT][WIDTH]int

func generateGrid() Grid {
	var grid Grid
	for i := 0; i < HEIGHT; i++ {
		for j := 0; j < WIDTH; j++ {
			gen := math.Floor(rand.Float64() * 2)

			if gen == 1 {
				grid[i][j] = LIVE
			} else {
				grid[i][j] = DEAD
			}
		}
	}

	return grid
}

func renderGrid(grid *Grid) {
	for row := 0; row < len(grid); row++ {
		for col := 0; col < len(grid[row]); col++ {
			if grid[row][col] == LIVE {
				fmt.Print("#")
			} else {
				fmt.Print(" ")
			}

			if col == len(grid[row])-1 {
				fmt.Println()
			}
		}
	}
}

func calculateNbor(row int, col int, grid *Grid) int {
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

func isCellDeadOrAlive(row int, col int, grid *Grid) int {
	currentCell := grid[row][col]
	aliveCells := calculateNbor(row, col, grid)

	switch currentCell {
	case LIVE:
		if aliveCells < 2 {
			return DEAD
		}

		if 2 == aliveCells || aliveCells == 3 {
			return LIVE
		}

		if aliveCells > 3 {
			return DEAD
		}

	case DEAD:
		if aliveCells == 3 {
			return LIVE
		}
	}

	return DEAD
}

func generateNextGeneration(grid *Grid) *Grid {
	var nextGen Grid

	for row := 0; row < len(grid); row++ {
		for col := 0; col < len(grid[row]); col++ {
			nextGen[row][col] = isCellDeadOrAlive(row, col, grid)
		}
	}

	return &nextGen
}

func main() {
	fmt.Print("\033[H")
	grid := generateGrid()
	renderGrid(&grid)

	for {
		time.Sleep(time.Second * SECONDS / 2)
		fmt.Print("\033[H")
		next := generateNextGeneration(&grid)
		renderGrid(next)
		grid = *next
	}
}
