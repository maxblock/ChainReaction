var Cell = function () {
    direction = 0;
    console.log("Created a cell");

    // Randomises the direction
    var randomise = function() {
        direction = Math.floor(Math.random() * 4);
        return direction;
    }

    return {
        randomise: function() { return randomise(); },
        direction: this.direction,
    }
};