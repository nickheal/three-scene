var app = (function () {
    'use strict';

    var app;

    app = {
        init: function () {
            var view3d, floor, grid, grid2;

            view3d = new View3d();

            floor = new Floor({
                scene: view3d
            });
            floor.draw();

            grid = new Grid({
                scene: view3d,
                x: -30,
                y: 20,
                z: -100,
                cubeSize: 5,
                data: {
                    total: 30
                }
            });
            grid.draw();

            grid2 = new Grid({
                scene: view3d,
                x: 30,
                y: 20,
                z: -100,
                cubeSize: 5,
                data: {
                    total: 20
                }
            });
            grid2.draw();
        }
    };

    return app;

})();

$(document).ready(function () {
    app.init();
});