var Grid = function (gridElement, Cell) {
    const DEBUG = true;
    var height = 3;
    var width = 3;
    cells = new Array(height);

    var init = function() {
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
    var randomise = function() {
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                cells[i][j].randomise();
            }
        }
    }

    // Prints the grid to console.
    var print = function() {
        for (var i = 0; i < height; i++) {
            const reducer = (accumulator, currentValue) => accumulator + " " + currentValue.direction;
            console.log(cells[i].reduce(reducer, ""));
        }
        console.log(is_unstable() ? "UNSTABLE" : "STABLE");
        console.log("");
    }

    // Indicates that there is a disturbed cell
    var is_unstable = function() {
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                if (cells[i][j].is_disturbed) {
                    return true;
                }
            }
        }
        return false;
    }

    var disturbed_neighbours_of = function(row, col) {
        var ret = Array();
        
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (i == 0 || j == 0) {
                    continue;
                }

                if (row + i >= 0 && row + i < height && col + j >= 0 && col + j < height) {
                    ret.push(cells[row][col]);
                }
            }
        }

        return ret;
    }

    // Indicates that the direction of the first disturbs the second
    var direction_disturbs = function(d1, d2) {

    }

    var step = function() {
        // Foreach disturbed cell, rotate the cell and disturb neighbours
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var cell = cells[i][j];
                if (cell.is_disturbed) {
                    cell.is_disturbed = false;
                    cell.rotate();
                    disturbed_neighbours_of(i, j).forEach(neighbour => {
                        neighbour.is_disturbed = true;
                    });
                }
            }
        }

        if (DEBUG) {
            print();
        }
    }

    init();
    cells[0][1].is_disturbed = true;
    step();

    return {
        init: function() { return init(); },
        randomise: function() { return randomise(); }
    }
};