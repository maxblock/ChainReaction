var Grid = function (gridElement, Cell) {
    const DEBUG = true;
    var height = 10;
    var width = 10;
    cells = new Array(height);

    var init = function () {
        // Initialise the grid
        for (var i = 0; i < height; i++) {
            cells[i] = new Array(width);
        }

        // create the cells
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                cells[i][j] = Cell();
            }
        }
        if (DEBUG) {
            print();
        }
    }

    // Randomises the direction of all cells in the grid
    var randomise = function () {
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                cells[i][j].randomise();
            }
        }
    }

    // Prints the grid to console.
    var print = function (disturbed_only = false) {
        for (var i = 0; i < height; i++) {
            const reducer = (accumulator, currentValue) => accumulator + ((disturbed_only && currentValue.is_disturbed == false) ? "  " : currentValue.print());
            console.log("｜" + cells[i].reduce(reducer, "") + "｜");
        }
        console.log(is_unstable() ? "UNSTABLE" : "STABLE");
        console.log("");
    }

    // Indicates that there is a disturbed cell
    var is_unstable = function () {
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                if (cells[i][j].is_disturbed) {
                    return true;
                }
            }
        }
        return false;
    }

    // Given row and column indices, returns an array of the disturbed neighbours
    var disturbed_neighbours = function (row, col) {
        var ret = Array();
        var cell = cells[row][col];
        //console.log("row",row,"col",col,"direction:",cell.direction,"up",cell.points_up(),"down",cell.points_down(),"left",cell.points_left(),"right",cell.points_right(),cell.print())

        // Upstairs
        if (row > 0 && cell.points_up() === true && cells[row - 1][col].points_down() === true) {
            ret.push(cells[row - 1][col]);
        }

        // Downstairs
        if (row + 1 < height && cell.points_down() === true && cells[row + 1][col].points_up() === true) {
            ret.push(cells[row + 1][col]);
        }

        // Left
        if (col > 0 && cell.points_left() === true && cells[row][col - 1].points_right() === true) {
            ret.push(cells[row][col - 1]);
        }

        // Right
        if (col + 1 < width && cell.points_right() === true && cells[row][col + 1].points_left() === true) {
            ret.push(cells[row][col + 1]);
        }
        return ret;
    }

    // Foreach disturbed cell, rotate the cell and disturb neighbours
    var step = function () {
        // Find out which cells where disturbed
        var disturbed = Array();
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                if (cells[i][j].is_disturbed) {
                    disturbed.push({ row: i, col: j });
                    cells[i][j].is_disturbed = false;
                }
            }
        }

        // Rotate the cells
        disturbed.forEach(location => {
            cells[location.row][location.col] = cells[location.row][location.col].rotate();
            var cell = cells[location.row][location.col];
            //console.log("row",location.row,"col",location.col,"direction:",cell.direction,"up",cell.points_up(),"down",cell.points_down(),"left",cell.points_left(),"right",cell.points_right(),cell.print())
        });

        if (DEBUG) {
            console.log("After rotation");
            print();
        }

        // Foreach rotated cells, disturb the neighbours
        disturbed.forEach(location => {
            disturbed_neighbours(location.row, location.col).forEach(neighbour => {
                neighbour.is_disturbed = true;
            });
        });

        if (DEBUG) {
            console.log("Disturbed values");
            print(true);
        }
    }

    init();
    cells[0][0].is_disturbed = true;


    for (var i = 0; i < 10; i++) {
        if (is_unstable() == false) {
            break;
        }
        step();
    }

    return {
        init: function () { return init(); },
        randomise: function () { return randomise(); }
    }
};