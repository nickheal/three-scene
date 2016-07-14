var objects = (function () {
    'use strict';

    var objects;

    objects = {
        mod: {},
        tex: {},
        load: function (callback) {
            var $body, $loadScreen, objLoader, texLoader, queue, tasks;

            $body = $('body');
            $loadScreen = $('<div class="load-screen"></div>');
            $body.append($loadScreen);

            objLoader = new THREE.OBJLoader();
            texLoader = new THREE.TextureLoader();
            // TODO: build a proper callback queue
            tasks = 0;
            queue = function () {
                if (tasks === 4) {
                    $loadScreen.remove();
                    callback();
                }
            };

            objLoader.load('./assets/mod/pill_1.obj', function (object) {
                objects.mod.pill = object;
                tasks++;queue();
            });

            objLoader.load('./assets/mod/clock.obj', function (object) {
                objects.mod.clock = object;
                tasks++;queue();
            });

            objLoader.load('./assets/mod/clock2.obj', function (object) {
                objects.mod.clock2 = object;
                tasks++;queue();
            });

            texLoader.load('./assets/mod/CapsuleSurface_Color.jpg', function (tex) {
                objects.tex.pill = new THREE.MeshBasicMaterial({map : tex});
                tasks++;queue();
            });
        },

        tree: function (size) {
            var tree, geom, mat, m, i, scaleRandom, positionRandomX, positionRandomY, positionRandomZ;

            size = size || 3;
            tree = new THREE.Object3D();

            for (i = 0; i < 8; i++) {
                scaleRandom = 0.9 + (Math.random() / 20);
                positionRandomX = (Math.random() * (size * 2)) - size;
                positionRandomY = (Math.random() * (size * 2)) - size;
                positionRandomZ = (Math.random() * (size * 2)) - size;

                geom = new THREE.SphereGeometry(size * scaleRandom, 20, 20);
                mat = new THREE.MeshStandardMaterial({
                    color: 0xA1D490,
                    roughness: 0.75
                });
                m = new THREE.Mesh(geom, mat);

                m.position.set(positionRandomX, positionRandomY, positionRandomZ);

                m.castShadow = true;
                m.receiveShadow = true;

                tree.add(m);
            }

            geom = new THREE.CylinderGeometry(size * .5, size * .6, size * 4, 20);
            mat = new THREE.MeshStandardMaterial({
                color: 0x6E4132,
                roughness: 0.75
            });
            m = new THREE.Mesh(geom, mat);
            m.position.set(0, -size * 2, 0);
            m.castShadow = true;
            m.receiveShadow = true;
            tree.add(m);

            return tree;
        },

        pill: function (scale, shadow) {
            var pill;

            pill = objects.mod.pill.clone();

            pill.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = objects.tex.pill.clone();
                    if (shadow) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                }
            });

            pill.scale.set(scale, scale, scale);

            return pill;
        },

        clock: function (scale, shadow) {
            var clock, hourHand, minuteHand, mat;

            clock = objects.mod.clock.clone();

            mat = new THREE.MeshStandardMaterial({
                color: 0xff0000,
                roughness: 0.75
            });
            hourHand = clock.getObjectByName('HourHandRot HourHand', true);
            hourHand.material = mat;

            mat = new THREE.MeshStandardMaterial({
                color: 0xff0000,
                roughness: 0.75
            });
            minuteHand = clock.getObjectByName('MinuteHandRot MinuteHand', true);
            minuteHand.material = mat;

            mat = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.75
            });
            clock.traverse(function (child) {
                if (shadow) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            clock.scale.set(scale, scale, scale);

            return clock;
        },

        clock2: function (scale, shadow) {
            var clock, mat;

            clock = objects.mod.clock2.clone();

            mat = new THREE.MeshPhongMaterial({
                color: 0xffffff
            });
            clock.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = mat;
                }
                if (shadow) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            console.log(clock);

            clock.scale.set(scale, scale, scale);

            return clock;
        }
    };

    return objects;

})();