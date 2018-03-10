/**
 * 
 * @param {*} cellElement An HTML element to render the Cell in.
 */
var Cell = function (cellElement) {
    /*
    * 0 -- left and up
    * 1 -- up and right
    * 2 -- right and down
    * 3 -- down and left
    */
    var direction = 0;
    var is_disturbed = false;

    /**
     * Randomises the direction for the cell.
     */
    function randomise() {
        direction = Math.floor(Math.random() * 4);
        return direction;
    }

    /**
     * Rotates the cell one quarter turn
     */
    function rotate() {
        direction += 1;
        direction %= 4;
        render();
    }

    /**
     * Indicates that the cell points up.
     */
    function points_up() {
        return direction == 0 || direction == 1;
    }

    /**
     * Indicates that the cell points down.
     */
    function points_down() {
        return direction == 2 || direction == 3;
    }

    /**
     * Indicates that the cell points left.
     */
    function points_left() {
        return direction == 0 || direction == 3;
    }

    /**
     * Indicates that the cell points right.
     */
    function points_right() {
        return direction == 1 || direction == 2;
    }

    /**
     * Returns a text representation of the cell.
     */
    function print() {
        switch (direction) {
            case 0:
                return '◴';
            case 1:
                return '◷';
            case 2:
                return '◶';
            case 3:
                return '◵';
            default:
                console.error("Invalid direction:", direction)
                break;
        }
    }

    /**
     * Renders the Cell in the given HTML element.
     */
    function render() {
        cellElement.classList.remove("north", "east", "south", "west");
        switch (direction) {
            case 0:
                cellElement.classList.add("north");
                break;
            case 1:
                cellElement.classList.add("east");
                break;
            case 2:
                cellElement.classList.add("south");
                break;
            case 3:
                cellElement.classList.add("west");
                break;
            default:
                console.error("Invalid direction:", direction)
                break;
        }
    }

    randomise();
    //cellElement.innerHTML = 'x';
    render();

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
        render: render,
    }
};