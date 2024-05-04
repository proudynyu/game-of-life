package utils

import (
	"math"
	"math/rand"

	"example.com/gol/config"
)

type Grid [config.HEIGHT][config.WIDTH]int

func GenerateGrid() Grid {
	var grid Grid
	for i := 0; i < config.HEIGHT; i++ {
		for j := 0; j < config.WIDTH; j++ {
			gen := math.Floor(rand.Float64() * 2)

			if gen == 1 {
				grid[i][j] = config.LIVE
			} else {
				grid[i][j] = config.DEAD
			}
		}
	}
	return grid
}
