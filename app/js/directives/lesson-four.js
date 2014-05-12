
directives = directives || angular.module('WebGl.directives', []);

directives.directive('lessonFourDirective', [function(version) {
        function link(scope, elm, attrs) {
            var container, stats;

            var camera, scene, renderer;

            var group, text, plane;

            var targetRotation = 0;
            var targetRotationOnMouseDown = 0;

            var mouseX = 0;
            var mouseXOnMouseDown = 0;

            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;


            var scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.set(0, 150, 800);

            renderer = new THREE.WebGLRenderer( { antialias: false } );
            renderer.setClearColor( 0xfFfFfF );
            renderer.setSize( window.innerWidth, window.innerHeight );
            elm[0].appendChild(renderer.domElement);
            
            // setup light
            var light = new THREE.DirectionalLight(0xFFFFFF);
            light.position.set(0, 0, 1);
            scene.add(light);
            
            var object = new THREE.AxisHelper(1);
            object.position.set(0, 0, 0);
            scene.add(object);
            
            // set up group
            var group = new THREE.Object3D();
            group.position.y = 50;
            scene.add(group);

            var x = 10;
            var y = 10;
            var color = 0xff1100;
            var z = 0;
            var rx = 0;
            var ry = 0;
            var rz = 0;
            var s = 1;
            var heartShape = new THREE.Shape();

            heartShape.moveTo(x + 25, y + 25);
            heartShape.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y);
            heartShape.bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35);
            heartShape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95);
            heartShape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35);
            heartShape.bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y);
            heartShape.bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);

            var points = heartShape.createPointsGeometry();
            var spacedPoints = heartShape.createSpacedPointsGeometry(100);

            // flat shape

            var geometry = new THREE.ShapeGeometry(heartShape);

            var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, [new THREE.MeshLambertMaterial({color: color}), new THREE.MeshBasicMaterial({color: color, wireframe: true, transparent: false})]);
            mesh.position.set(x, y, z - 10);
            mesh.rotation.set(rx, ry, rz);
            mesh.scale.set(s, s, s);
            group.add(mesh);

            var render = function() {
                group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
				renderer.render( scene, camera );
            };



            function animate() {

                requestAnimationFrame(animate);

                render();
//                stats.update();

            }
            animate();

            document.addEventListener('mousedown', onDocumentMouseDown, false);
            document.addEventListener('touchstart', onDocumentTouchStart, false);
            document.addEventListener('touchmove', onDocumentTouchMove, false);

            function onDocumentMouseDown(event) {

                event.preventDefault();

                document.addEventListener('mousemove', onDocumentMouseMove, false);
                document.addEventListener('mouseup', onDocumentMouseUp, false);
                document.addEventListener('mouseout', onDocumentMouseOut, false);

                mouseXOnMouseDown = event.clientX - windowHalfX;
                targetRotationOnMouseDown = targetRotation;

            }

            function onDocumentMouseMove(event) {

                mouseX = event.clientX - windowHalfX;

                targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;

            }

            function onDocumentMouseUp(event) {

                document.removeEventListener('mousemove', onDocumentMouseMove, false);
                document.removeEventListener('mouseup', onDocumentMouseUp, false);
                document.removeEventListener('mouseout', onDocumentMouseOut, false);

            }

            function onDocumentMouseOut(event) {

                document.removeEventListener('mousemove', onDocumentMouseMove, false);
                document.removeEventListener('mouseup', onDocumentMouseUp, false);
                document.removeEventListener('mouseout', onDocumentMouseOut, false);

            }

            function onDocumentTouchStart(event) {

                if (event.touches.length == 1) {

                    event.preventDefault();

                    mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
                    targetRotationOnMouseDown = targetRotation;

                }

            }

            function onDocumentTouchMove(event) {

                if (event.touches.length == 1) {

                    event.preventDefault();

                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;

                }

            }
        }
        ;

        return {
            link: link,
            restrict: "EC"
        };
    }]);
