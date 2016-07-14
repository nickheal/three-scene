var View3d = (function () {
	'use strict';

    var View3d;

    View3d = function () {
    	var $document, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, container, handleWindowResize, clickVector, raycaster;

		handleWindowResize = function () {
			HEIGHT = window.innerHeight;
			WIDTH = window.innerWidth;
			this.renderer.setSize(WIDTH, HEIGHT);
			this.camera.aspect = WIDTH / HEIGHT;
			this.camera.updateProjectionMatrix();
		}.bind(this);

		$document = $(document);
		HEIGHT = window.innerHeight;
		WIDTH = window.innerWidth;

		this.scene = new THREE.Scene();

		this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
		
		aspectRatio = WIDTH / HEIGHT;
		fieldOfView = 60;
		nearPlane = 1;
		farPlane = 10000;
		this.camera = new THREE.PerspectiveCamera(
			fieldOfView,
			aspectRatio,
			nearPlane,
			farPlane
		);
		
		this.camera.position.x = 0;
		this.camera.position.z = 0;
		this.camera.position.y = 0;
		
		this.renderer = new THREE.WebGLRenderer({ 
			alpha: true, 
			antialias: true 
		});

		this.renderer.setSize(WIDTH, HEIGHT);
		
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		
		container = document.getElementById('graphics-holder');
		container.appendChild(this.renderer.domElement);
		
		window.addEventListener('resize', handleWindowResize, false);

		// create lights
		var hemisphereLight, shadowLight;

		hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .5);
		
		shadowLight = new THREE.DirectionalLight(0xffffff, .9);

		shadowLight.position.set(20, 50, 50);
		shadowLight.castShadow = true;

		shadowLight.shadow.camera.left = -400;
		shadowLight.shadow.camera.right = 400;
		shadowLight.shadow.camera.top = 400;
		shadowLight.shadow.camera.bottom = -400;
		shadowLight.shadow.camera.near = 1;
		shadowLight.shadow.camera.far = 1000;

		shadowLight.shadow.mapSize.width = 2048;
		shadowLight.shadow.mapSize.height = 2048;
		
		this.scene.add(hemisphereLight);  
		this.scene.add(shadowLight);

		// Start animation loop
		this.loop();

		// View hover and click
		clickVector = new THREE.Vector3();
		raycaster = new THREE.Raycaster();

		// $document.on('mousemove', function (e) {
		// 	var intersects;

		// 	clickVector.set((e.clientX / window.innerWidth) * 2 - 1, - (e.clientY / window.innerHeight) * 2 + 1, 0.5);
		// 	clickVector.unproject(this.camera);
		// 	raycaster.set(this.camera.position, clickVector.sub(this.camera.position).normalize());
		// 	intersects = raycaster.intersectObjects(this.scene.children);

		// 	if (intersects.length) {
		// 		intersects.sort(function (a, b) {
		// 			return a.distance - b.distance;
		// 		});
		// 		if (this.activeObjects !== intersects[0].object) {
		// 			if (this.activeObjects) {
		// 				this.activeObjects.mouseOut && this.activeObjects.mouseOut();
		// 			}
		// 			intersects[0].object.mouseOver && intersects[0].object.mouseOver();
		// 			this.activeObjects = intersects[0].object;
		// 		}
		// 	} else if (this.activeObjects) {
		// 		this.activeObjects.mouseOut && this.activeObjects.mouseOut();
		// 		this.activeObjects = null;
		// 	}
		// }.bind(this));

		$document.on('click', function (e) {
			var intersects, objects, targetObject, clickFound;

			objects = [];
			this.scene.traverse(function (object) {
			    if (object instanceof THREE.Mesh) {
			       objects.push(object);
			    }
			    if (object instanceof THREE.Group) {
			       object.traverse(function (innerObject) {
			       		if (innerObject instanceof THREE.Mesh) {
			       			objects.push(innerObject);
			       		}
			       });
			    }
			});

			clickVector.set((e.clientX / window.innerWidth) * 2 - 1, - (e.clientY / window.innerHeight) * 2 + 1, 0.5);
			clickVector.unproject(this.camera);
			raycaster.set(this.camera.position, clickVector.sub(this.camera.position).normalize());
			intersects = raycaster.intersectObjects(objects);

			if (intersects.length) {
				intersects.sort(function (a, b) {
					return a.distance - b.distance;
				});

				targetObject = intersects[0].object;
				while (!clickFound) {
					if (targetObject.click) {
						targetObject.click()
						clickFound = true;
					} else {
						if (targetObject.parent) {
							targetObject = targetObject.parent;
						} else {
							clickFound = true;
						}
					}
				}
			}
		}.bind(this));
    }

    View3d.prototype.loop = function () {   	
    	this.renderer.render(this.scene, this.camera);

		requestAnimationFrame(this.loop.bind(this));
    }

    return View3d;

})();