var Grid = function (gridElement) {
    height = 10;
    width = 10;

    function render() {
        console.log("Rendering...");
    }

    return {
        render: function () { return render() }
    }
};