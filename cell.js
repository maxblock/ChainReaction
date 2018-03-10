var Cell = function () {
    /*
    * 0 -- left and up
    * 1 -- up and right
    * 2 -- right and down
    * 3 -- down and left
    */
    direction = 0;
    is_disturbed = false;

    // Randomises the direction
    var randomise = function () {
        this.direction = Math.floor(Math.random() * 4);
        return this.direction;
    }

    // Rotates the cell one quarter turn
    var rotate = function () {
        this.direction += 1;
        this.direction %= 4;
        return this;
    }

    function points_up() {
        return this.direction == 0 || this.direction == 1;
    }

    function points_down() {
        return this.direction == 2 || this.direction == 3;
    }

    function points_left() {
        return this.direction == 0 || this.direction == 3;
    }

    function points_right() {
        return this.direction == 1 || this.direction == 2;
    }

    var print = function () {
        switch (this.direction) {
            case 0:
                return '◴';
            case 1:
                return '◷';
            case 2:
                return '◶';
            case 3:
                return '◵';
            default:
                break;
        }
    }

    randomise();

    return {
        randomise: randomise,
        rotate: rotate,
        points_up: points_up,
        points_down: points_down,
        points_left: points_left,
        points_right: points_right,
        is_disturbed: is_disturbed,
        print: print,
        direction: direction,
    }
};