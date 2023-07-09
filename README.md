# Game of Life

This is a JavaScript implementation of Conway's Game of Life. The game is implemented client-side using HTML, CSS, and JavaScript (ES6).

## Description

The Game of Life is played on a two-dimensional grid of square cells. Each cell can be either alive or dead. The game progresses in generations, where each generation is determined by applying specific rules to the current state of the grid.

## Rules

The rules for determining the next state of a cell are as follows:

1. Any live cell with fewer than two live neighbors dies (underpopulation).
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies (overcrowding).
4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction).

## Installation and Setup

To run the Game of Life, follow these steps:

1. Clone the repository from GitHub:
```bash
git clone https://github.com/hadasaGIT/Seeking-Alpha-Test.git
```

3. Open the project folder:

```bash
cd Seeking-Alpha-Test
```


3. Open the `index.html` file in a web browser.

4. The initial configuration of the grid will be random for every page refresh. The grid will automatically tick and update every ~0.4 seconds based on the rules of the game.

## Development

The project structure is as follows:

```bash
game-of-life/
├── index.html
├── css/
│ └── style.css
└── js/
└── script.js
```
- `index.html`: The main HTML file that renders the grid.
- `css/style.css`: The CSS file that styles the grid and cells.
- `js/script.js`: The JavaScript file that implements the game logic.

Feel free to explore and modify the code to enhance the game or customize its behavior.

## Repository

The fully functional code for the Game of Life can be found on GitHub: [Link to GitHub Repository](https://github.com/hadasaGIT/Seeking-Alpha-Test)

Please note that the code provided is not modified or obfuscated and should work as expected.

## Author

[Hadassa Omesi](https://github.com/hadasaGIT)


