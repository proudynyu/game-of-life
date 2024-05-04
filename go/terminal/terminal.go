package terminal

import (
	"fmt"
	"time"

	"example.com/gol/config"
	"example.com/gol/utils"
)

func Render() {
	fmt.Print("\033[H")
	grid := utils.GenerateGrid()
	RenderGridOnTerminal(&grid)

	for {
		time.Sleep(time.Second * config.SECONDS / 2)
		fmt.Print("\033[H")
		next := utils.GenerateNextGeneration(&grid)
		RenderGridOnTerminal(next)
		grid = *next
	}

}

func RenderGridOnTerminal(grid *utils.Grid) {
	for row := 0; row < len(grid); row++ {
		for col := 0; col < len(grid[row]); col++ {
			if grid[row][col] == config.LIVE {
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
