var app = (function () {
    'use strict';

    var app;

    app = {
        init: function () {
            var view3d, floor, particleRing, particleRing2, buttons;

            view3d = new View3d();

            floor = new Floor({
                scene: view3d
            });
            floor.draw();

            particleRing = new ParticleRing({
                scene: view3d,
                x: -15,
                y: 10,
                z: -40,
                size: 10,
                data: {
                    total: 10
                }
            });
            particleRing.draw();

            particleRing2 = new ParticleRing({
                scene: view3d,
                x: 15,
                y: 10,
                z: -40,
                size: 10,
                data: {
                    total: 5
                }
            });
            particleRing2.draw();

            buttons = new Buttons({
                scene: view3d,
                controls: [
                    function () {
                        particleRing.updateData(5);
                        particleRing2.updateData(6);
                    },
                    function () {
                        particleRing.updateData(2);
                        particleRing2.updateData(7);
                    },
                    function () {
                        particleRing.updateData(8);
                        particleRing2.updateData(12);
                    },
                    function () {
                        particleRing.updateData(15);
                        particleRing2.updateData(22);
                    }
                ]
            });
            buttons.draw();
        }
    };

    return app;

})();

$(document).ready(function () {
    objects.load(app.init);
});