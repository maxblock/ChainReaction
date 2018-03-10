var Grid = function (gridElement, Cell) {
    var height = 10;
    var width = 10;
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

    init();
    randomise();

    return {
        init: function() { return init(); },
        randomise: function() { return randomise(); }
    }
};