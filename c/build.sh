#!/bin/bash

gcc -I./raylib/include -o game_of_life main.c -L./raylib/lib -l:libraylib.a -lm
