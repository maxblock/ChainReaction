var ChainReaction = function (Grid, gridElement, Cell, counterElement, height = 50, width = 100) {
    var gridChangedCallback = function () {
        var counter = 0;
        counterElement.innerHTML = counter;
        var interval = setInterval(step, 200);

        function step() {
            if (grid.is_unstable()) {
                counter += grid.step();
                counterElement.innerHTML = counter;
            } else {
                clearInterval(interval);
            }
        }
    }
    var grid = Grid(gridElement, Cell, gridChangedCallback, height, width);
};