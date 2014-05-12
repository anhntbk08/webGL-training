'use strict';

/* Directives */


angular.module('WebGl.directives', [])
        .directive('lessonOneDirective', [function(version) {
                function link(scope, elm, attrs) {
                    var scene = new THREE.Scene();
                    var camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 4, 30);

                    var renderer = new THREE.WebGLRenderer();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    elm[0].appendChild(renderer.domElement);

                    var geometry = new THREE.CubeGeometry(1, 1, 1);
                    var texture = THREE.ImageUtils.loadTexture('img/crate.gif');
                    texture.anisotropy = renderer.getMaxAnisotropy();

                    var material = new THREE.MeshBasicMaterial({map: texture});
                    var cube = new THREE.Mesh(geometry, material);
                    scene.add(cube);
                    var object = new THREE.AxisHelper(1);
                    object.position.set(0, 0, 0);
                    scene.add(object);
                    camera.position.z = 11;
                    camera.position.y = 5;
                    camera.position.x = 5;
                    var td = 1;
                    var render = function() {
                        requestAnimationFrame(render);
                        cube.rotation.x += 0.005;
                        cube.rotation.y += 0.001;
                        td += 0.01;
                        cube.position.z = Math.sin(td) * 5;
//                        cube.rotation.z += 0.1;

                        renderer.render(scene, camera);
                    };

                    render();
                }
                ;

                return {
                    link: link,
                    restrict: "EC"
                }
            }]);
