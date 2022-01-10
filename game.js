var rows = 50;
var cols = 50;
var isPlay = false;
var grid = new Array(rows);
var nextGrid = new Array(rows);
var timer;
var reproductionTime = 100;

//init the grid
function initializeGrids() {
    for (var i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
    }
}
//reset the grid
function resetGrids() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}
//copy and reset grid
function copyAndResetGrid() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}
// Initialize
function initialize() {
    createTable();
    initializeGrids();
    resetGrids();

    setupControlButtons();
    //random in refresh
    randomButtonHandler()
}
// Lay out the board
function createTable() {
    var gridContainer = document.getElementById('gridContainer');
    if (!gridContainer) {
        console.error("Problem: No div for the grid table!");
    }
    var table = document.createElement("table");
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < cols; j++) {
            var cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}
//Make a living cell dead or vice versa
function cellClickHandler() {
    var rowCol = this.id.split("_");
    var row = rowCol[0];
    var col = rowCol[1];
    var classes = this.getAttribute("class");
    if (classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
        grid[row][col] = 0;
    } else {
        this.setAttribute("class", "live");
        grid[row][col] = 1;
    }
}
//update the view board
function updateView() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var cell = document.getElementById(i + "_" + j);
            if (grid[i][j] == 0) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "live");
            }
        }
    }
}

//init the buttons
function setupControlButtons() {
    // button to start
    var startButton = document.getElementById('start');
    startButton.onclick = startButtonHandler;
    // button to clear
    var clearButton = document.getElementById('clear');
    clearButton.onclick = clearButtonHandler;
    // button to set random initial state
    var randomButton = document.getElementById("random");
    randomButton.onclick = randomButtonHandler;
}

//view random board
function randomButtonHandler() {
    if (isPlay) return;
    clearButtonHandler();
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var isLive = Math.round(Math.random());
            if (isLive == 1) {
                var cell = document.getElementById(i + "_" + j);
                cell.setAttribute("class", "live");
                grid[i][j] = 1;
            }
        }
    }
}

// clear the grid
function clearButtonHandler() {
    console.log("Clear the game: stop playing, clear the grid");
    isPlay = false;
    var startButton = document.getElementById('start');
    startButton.innerHTML = "Start";
    clearTimeout(timer);
    var cellsList = document.getElementsByClassName("live");
    var cells = [];
    for (var i = 0; i < cellsList.length; i++) {
        cells.push(cellsList[i]);
    }

    for (var i = 0; i < cells.length; i++) {
        cells[i].setAttribute("class", "dead");
    }
    resetGrids();
}

// start or pause or continue the game
function startButtonHandler() {
    if (isPlay) {
        console.log("Pause the game");
        isPlay = false;
        this.innerHTML = "Continue";
        clearTimeout(timer);
    } else {
        console.log("Continue the game");
        isPlay = true;
        this.innerHTML = "Pause";
        play();
    }
}

// run the life game and view board
function play() {
    computeNextGen();
    if (isPlay) {
        timer = setTimeout(play, reproductionTime);
    }
}

// running a stage in the game
function computeNextGen() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            applyRules(i, j);
        }
    }
    // copy NextGrid to grid, and reset nextGrid
    copyAndResetGrid();
    // copy all 1 values to "live" in the table
    updateView();
}

//checked by rules:
//Any live cell with fewer than two live neighbours dies (underpopulation).
//Any live cell with two or three live neighbours lives on to the next generation.
//Any live cell with more than three live neighbours dies (overcrowding).
//Any dead cell with exactly three live neighbours becomes a live cell (reproduction).
function applyRules(row, col) {
    var numNeighbors = countNeighbors(row, col);
    if (grid[row][col] == 1) {
        if (numNeighbors < 2) {
            nextGrid[row][col] = 0;
        } else if (numNeighbors == 2 || numNeighbors == 3) {
            nextGrid[row][col] = 1;
        } else if (numNeighbors > 3) {
            nextGrid[row][col] = 0;
        }
    } else if (grid[row][col] == 0) {
        if (numNeighbors == 3) {
            nextGrid[row][col] = 1;
        }
    }
}
//count the num of neighbours:
function countNeighbors(row, col) {
    var count = 0;
    if (row - 1 >= 0) {
        if (grid[row - 1][col] == 1) count++;
    }
    if (row - 1 >= 0 && col - 1 >= 0) {
        if (grid[row - 1][col - 1] == 1) count++;
    }
    if (row - 1 >= 0 && col + 1 < cols) {
        if (grid[row - 1][col + 1] == 1) count++;
    }
    if (col - 1 >= 0) {
        if (grid[row][col - 1] == 1) count++;
    }
    if (col + 1 < cols) {
        if (grid[row][col + 1] == 1) count++;
    }
    if (row + 1 < rows) {
        if (grid[row + 1][col] == 1) count++;
    }
    if (row + 1 < rows && col - 1 >= 0) {
        if (grid[row + 1][col - 1] == 1) count++;
    }
    if (row + 1 < rows && col + 1 < cols) {
        if (grid[row + 1][col + 1] == 1) count++;
    }
    return count;
}

// Start everything
window.onload = initialize;