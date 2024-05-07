#include <stdlib.h>

#include <raylib.h>

#define WIDTH      800
#define HEIGHT     600
#define CELL_SIZE  5
#define LIVE       1
#define DEAD       0
#define TITLE "Game of Life"

void create_grid(int (*grid)[WIDTH]) {
    srand(time(NULL));
    for (int i = 0; i < HEIGHT; i++) {
        for (int j = 0; j < WIDTH; j++) {
            int r = rand() % 2;
            grid[i][j] = r;
        }
    }
    return;
}

void draw_cells(int (*grid)[WIDTH]) {
    for (int i = 0; i < HEIGHT; i++) {
        for (int j = 0; j < WIDTH; j++) {
            Color current_color = BLACK;

            if (grid[i][j] == LIVE) {
                current_color = RED;
            }
            DrawRectangle(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE, current_color);
        }
    }
}

int is_cell_alive(int cell, int (*grid)[WIDTH]) {
    int nbors = calculate_nbors(grid);
    switch(nbors) {
        case LIVE:
            if (nbors < 2 || nbors > 3) {
                return DEAD;
            }
            return LIVE;
        case DEAD:
            if (nbors == 3) {
                return LIVE;
            }
            return DEAD;
    }
}

int calculate_nbors(int (*grid)[WIDTH]) {
    int ROWS = 8;
	int aliveCells = 0;
	int neighbors[][2] = {
		{-1, -1}, 
        {-1, 0}, 
        {-1, 1},
		{0, -1}, 
        {0, 1},
		{1, -1}, 
        {1, 0}, 
        {1, 1},
	};
    for (int row = 0; row < ROWS; row++) {
        int newRow = row + neighbors[row][0];
        int newCol = row + neighbors[row][1];
        if (newRow >= 0 && newRow < HEIGHT && newCol >= 0 && newCol < WIDTH) {
            aliveCells += grid[newRow][newCol];
        }
    }
	return aliveCells;
}

void generate_new_grid(int (*grid)[WIDTH]) {
    for (int i = 0; i < HEIGHT; i++) {
        for (int j = 0; j < WIDTH; j++) {
            int current_cell = is_cell_alive(grid[i][j], grid);
            grid[i][j] = current_cell;
        }
    }
}

int main(void) {
    InitWindow(WIDTH, HEIGHT, TITLE);

    int grid[HEIGHT][WIDTH] = {0};
    create_grid(grid);

    while(!WindowShouldClose()) {
        BeginDrawing();
        ClearBackground(BLACK);

        draw_cells(grid);
        generate_new_grid(grid);

        EndDrawing();
    }

    CloseWindow();

    return 0;
}
