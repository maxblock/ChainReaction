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
    }

    var neighbours_of = function(row, col) {

    }

    var step = function() {
        // Foreach disturbed cell, rotate the cell and disturb neighbours
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var cell = cells[i][j];
                if (cell.is_disturbed) {
                    cell.is_disturbed = false;
                    cell.rotate();
                    //TODO: Disturb neighbours
                }
            }
        }

        if (DEBUG) {
            print();
        }
    }

    init();
    if (DEBUG) {
        print();
    }

    return {
        init: function() { return init(); },
        randomise: function() { return randomise(); }
    }
};