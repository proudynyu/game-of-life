#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <raylib.h>

#define WIDTH      5
#define HEIGHT     5
#define CELL_SIZE  5
#define LIVE       1
#define DEAD       0
#define TITLE      "Game of Life"

void create_grid(int (*grid)[WIDTH]) {
    srand(time(NULL));
    for (int i = 0; i < HEIGHT; i++) {
        for (int j = 0; j < WIDTH; j++) {
            int r = rand() % 2;
            grid[i][j] = r;
        }
    }
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

int calculate_nbors(int (*grid)[WIDTH], int row, int col) {
    int neighbors[8][2] = {
        {-1, -1}, {-1, 0}, {-1, 1},
        {0, -1},           {0, 1},
        {1, -1}, {1, 0}, {1, 1}
    };
    int aliveCells = 0;
    for (int i = 0; i < 8; i++) {
        int newRow = row + neighbors[i][0];
        int newCol = col + neighbors[i][1];

        if (newRow >= 0 && newRow < HEIGHT && newCol >= 0 && newCol < WIDTH) {
            if (grid[newRow][newCol] == LIVE) {
                aliveCells += grid[row][col];
            }
        }
    }
    return aliveCells;
}

int is_cell_alive(int (*grid)[WIDTH], int row, int col) {
    int cell = grid[row][col];
    int nbors = calculate_nbors(grid, row, col);
    printf("cell: %i, nbors: %i", cell,nbors);
    printf("\n");

    switch(cell) {
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
        default:
            return DEAD;
    }
}

void generate_new_grid(int (*grid)[WIDTH]) {
    for (int row = 0; row < HEIGHT; row++) {
        for (int col = 0; col < WIDTH; col++) {
            int current_cell = is_cell_alive(grid, row, col);
            grid[row][col] = current_cell;
        }
    }
}

void update_gol(int (*grid)[HEIGHT]) {
    draw_cells(grid);
    generate_new_grid(grid);
}

void printGrid(int grid[][WIDTH]) {
    for (int i = 0; i < HEIGHT; i++) {
        for (int j = 0; j < WIDTH; j++) {
            printf("%d ", grid[i][j]);
        }
        printf("\n");
    }
}

int main(void) {
    // InitWindow(WIDTH, HEIGHT, TITLE);
    // SetTargetFPS(60);

    int grid[HEIGHT][WIDTH] = {0};
    create_grid(grid);
    printGrid(grid);
    generate_new_grid(grid);
    printGrid(grid);

    // while(!WindowShouldClose()) {
    //     BeginDrawing();
    //     ClearBackground(BLACK);
    //     EndDrawing();
    // }
    // CloseWindow();

    return 0;
}
