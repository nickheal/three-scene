var Floor = (function () {
	'use strict';

    var Floor;

    Floor = function (params) {
    	this.scene = params.scene;
    	this.plane;
    }

    Floor.prototype.draw = function () {
    	var mat;

        mat = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa
        });
    	this.plane = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000), mat);
        this.plane.position.z = -100;
        this.plane.position.y = -10;
        this.plane.rotation.x = -90 * (Math.PI / 180);

        this.plane.castShadow = true;
        this.plane.receiveShadow = true;

        this.scene.scene.add(this.plane);
    }

    return Floor;

})();