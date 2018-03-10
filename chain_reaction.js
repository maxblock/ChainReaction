var ChainReaction = function (grid) {

    function init(grid) {
        for (i = 0; i < height; i++) {
            for (j = 0; j < width; j++) {
                console.log(i,j);
            }
        }
        console.log("Hello world!");
    }

    return {
        init: function () { return init(grid) },
    }
};