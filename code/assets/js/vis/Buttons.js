var Buttons = (function () {
	'use strict';

    var Buttons;

    /*
     * params.scene
     * params.controls
     */
    Buttons = function (params) {
    	this.scene = params.scene.scene;
        this.controls = params.controls;
    	
        this.buttons = [];
    }

    Buttons.prototype.draw = function () {
    	var cyl, geom, mat, i;

        for (i = 0; i < this.controls.length; i++) {
            geom = new THREE.CylinderGeometry(5, 5, 5, 32);
            mat = new THREE.MeshBasicMaterial({
                color: 0xeeeeee
            });
            cyl = new THREE.Mesh(geom, mat);
            cyl.position.set(i * 10, -10, -50);
            cyl.castShadow = true;
            cyl.receiveShadow = true;
            this.scene.add(cyl);

            cyl.click = function (i) {
                TweenMax.to(this.buttons[i].position, .25, {
                    y: -11,
                    yoyo: true,
                    repeat: 1
                });
                this.controls[i]();
            }.bind(this, i);

            this.buttons.push(cyl);
        }
    }

    return Buttons;

})();