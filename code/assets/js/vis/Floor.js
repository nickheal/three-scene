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

        this.plane.receiveShadow = true;

        this.scene.scene.add(this.plane);


        // var clock = objects.clock(.25);
        // clock.position.z = -50;
        // clock.position.y = 10;
        // this.scene.scene.add(clock);

        // var hourHand = clock.getObjectByName('HourHandRot HourHand', true);
        // TweenMax.to(hourHand.rotation, 12, {
        //     z: -Math.PI*2,
        //     ease: Linear.easeNone,
        //     repeat: -1
        // });
        // var minuteHand = clock.getObjectByName('MinuteHandRot MinuteHand', true);
        // TweenMax.to(minuteHand.rotation, 5, {
        //     z: -Math.PI*2,
        //     ease: Linear.easeNone,
        //     repeat: -1
        // });
        // TweenMax.to(clock.rotation, 11, {
        //     y: Math.PI*2,
        //     ease: Linear.easeNone,
        //     repeat: -1
        // });
        // clock.click = function () {
        //     console.log('run');
        // }


        var clock2 = objects.clock2(.25);
        clock2.position.z = -75;
        clock2.position.y = 10;
        this.scene.scene.add(clock2);
        TweenMax.to(clock2.rotation, 11, {
            y: Math.PI*2,
            ease: Linear.easeNone,
            repeat: -1
        })
        clock2.click = function () {
            console.log('test');
        }
    }

    return Floor;

})();