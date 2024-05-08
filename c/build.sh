#!/bin/bash

DIRECTORY=bin
FILENAME=game_of_life

if [ ! -d "$DIRECTORY" ]; then
    mkdir bin
fi

gcc -I./raylib/include -o $DIRECTORY/$FILENAME main.c -L./raylib/lib -l:libraylib.a -lm

cd $DIRECTORY/
./$FILENAME
