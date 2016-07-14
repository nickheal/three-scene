var ParticleRing = (function () {
	'use strict';

    var ParticleRing;

    /*
     * params.scene
     * params.x
     * params.y
     * params.z
     * params.size
     * params.data
     * params.data.total
     */
    ParticleRing = function (params) {
    	this.scene = params.scene;
    	this.x = params.x;
    	this.y = params.y;
    	this.z = params.z;
    	this.size = params.size;
    	this.data = params.data;

    	this.particles = [];
    }

    ParticleRing.prototype.draw = function () {
    	var geom, mat, m, i, pos, angle;

        angle = 360 / this.data.total;

        geom = new THREE.IcosahedronGeometry((this.size * .1), 0);
		for (i = 0; i < this.data.total; i++) {
            if (!this.particles[i]) {
    			m = objects.pill(.015, true);

                pos = tools.getPointOnCircleCircumference(this.x, this.y, this.size, i*angle);
    			m.position.x = pos.x; //startPointX + ((i % rowLength) * spacing);
    			m.position.y = pos.y;
    			m.position.z = this.z;

                TweenMax.to(m.rotation, 10, {
                    x: Math.PI * 2,
                    y: Math.PI * 2,
                    z: Math.PI * 2,
                    repeat: -1,
                    ease: Linear.easeNone
                })

    			this.particles.push(m);
    			this.scene.scene.add(m);
            } else {
                pos = tools.getPointOnCircleCircumference(this.x, this.y, this.size, i*angle);
                TweenMax.to(this.particles[i].position, .5, {
                    x: pos.x,
                    y: pos.y
                })
            }
		}

        for (i = i; i < this.particles.length; i++) {
            this.scene.scene.remove(this.particles[i]);
            this.particles.splice(i, 1);
            i--;
        }
    }

    ParticleRing.prototype.updateData = function (data) {
        this.data.total = data;
        this.draw();
    }

    return ParticleRing;

})();