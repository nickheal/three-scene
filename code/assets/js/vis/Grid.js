var Grid = (function () {
	'use strict';

    var Grid;

    /*
     * params.scene
     * params.x
     * params.y
     * params.z
     * params.cubeSize
     * params.data
     * params.data.total
     */
    Grid = function (params) {
    	this.scene = params.scene;
    	this.x = params.x;
    	this.y = params.y;
    	this.z = params.z;
    	this.cubeSize = params.cubeSize;
    	this.data = params.data;

    	this.cubes = [];
    }

    Grid.prototype.draw = function () {
    	var geom, mat, highlightMaterial, m, rowLength, totalWidth, startPointX, startPointY, totalHeight, rowCount, i, spacing;

    	rowLength = Math.ceil(Math.sqrt(this.data.total));
    	rowCount = 0;
    	spacing = this.cubeSize * 1.5;
        totalWidth = spacing * (rowLength - 1) + this.cubeSize;
        startPointX = this.x - (totalWidth / 2);
        totalHeight = Math.ceil(this.data.total / rowLength);
        totalHeight = (this.cubeSize * totalHeight) + ((this.cubeSize / 2) * (totalHeight - 1))
        startPointY = this.y - (totalHeight / 2);

        highlightMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            shading: THREE.FlatShading,
            roughness: 0.1,
            emissive: 0x00ff00,
            emissiveIntensity: .5
        });

        geom = new THREE.IcosahedronGeometry((this.cubeSize * .6), 0);
		for (i = 0; i < this.data.total; i++) {
			mat = new THREE.MeshStandardMaterial({
				color: 0x0000ff,
                shading: THREE.FlatShading,
                roughness: 0.5
			});
			m = new THREE.Mesh(geom, mat);

			m.position.x = startPointX + ((i % rowLength) * spacing);
			m.position.y = startPointY + (rowCount * spacing);
			m.position.z = this.z;

            m.castShadow = true;
            m.receiveShadow = true;
            TweenMax.to(m.rotation, 10, {
                x: Math.PI * 2,
                repeat: -1,
                ease: Linear.easeNone
            })

			this.cubes.push(m);
			this.scene.scene.add(m);

            m.mouseOver = function (i) {
                var cube = this.cubes[i];
                if (!cube.animating) {
                    cube.animating = true;
                    cube.material = highlightMaterial;
                    TweenMax.to(cube.scale, .25, {
                        x:1.2,
                        y:1.2,
                        z:1.2,
                        yoyo: true,
                        repeat: 1,
                        onComplete: function () {
                            cube.animating = false;
                        },
                        onCompleteParams: [cube]
                    });
                }
            }.bind(this, i);
            m.mouseOut = function (i) {
                var cube = this.cubes[i];
                cube.material = mat;
            }.bind(this, i);
            m.click = function () {
                console.log('clicked!');
            }.bind(this, i)
            this.scene.clickTargets.push(m);

			rowCount = i % rowLength === rowLength - 1 ? rowCount + 1 : rowCount;
		}
    }

    return Grid;

})();