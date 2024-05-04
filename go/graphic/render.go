package graphic

import (
	"example.com/gol/config"
	"example.com/gol/utils"
	rl "github.com/gen2brain/raylib-go/raylib"
)

func CellPos(pos int) int32 {
	return int32(pos * config.CELL_SIZE)
}

func RenderGrid(grid *utils.Grid) {
	for i := 0; i < len(grid); i++ {
		for j := 0; j < len(grid[0]); j++ {
			color := rl.Red
			if grid[i][j] == config.DEAD {
				color = rl.Black
			}
			rl.DrawRectangle(CellPos(j), CellPos(i), int32(config.CELL_SIZE), int32(config.CELL_SIZE), color)
		}
	}
}

func Render() {
	rl.InitWindow(int32(config.WIDTH), int32(config.HEIGHT), config.TITLE)
	grid := utils.GenerateGrid()

	for !rl.WindowShouldClose() {
		rl.BeginDrawing()
		rl.ClearBackground(rl.Black)

		RenderGrid(&grid)
		grid = *utils.GenerateNextGeneration(&grid)

		rl.EndDrawing()
	}

	rl.CloseWindow()
}
