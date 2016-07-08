var tools = (function () {
    'use strict';

    var tools;

    tools = {
        getPointOnCircleCircumference: function (cx, cy, r, a) {
            var x, y;

            a = a * (Math.PI / 180);

            x = cx + r * Math.cos(a);
            y = cy + r * Math.sin(a);

            return {
                x: x,
                y: y
            }
        }
    };

    return tools;

})();