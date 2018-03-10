var Cell = function () {
    direction = 0;
    is_disturbed = false;

    // Randomises the direction
    var randomise = function() {
        direction = Math.floor(Math.random() * 4);
        return direction;
    }

    // Rotates the cell one quarter turn
    var rotate = function() {
        this.direction += 1;
        this.direction %= 4;
    }

    randomise();

    return {
        randomise: randomise,
        rotate: rotate,
        direction: this.direction,
        is_disturbed: is_disturbed,
    }
};