import { common } from '../common';
import * as THREE from 'three';
const commonObj = common();

const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

cube.castShadow = true;
cube.position.set(0, 6, 0);
commonObj.scene.add(cube);

const sphereGeometry = new THREE.SphereGeometry(4, 20, 30);
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(10, 5, 0);
sphere.castShadow = true;
commonObj.scene.add(sphere);

commonObj.camera.position.set(-25, 30, 25);
commonObj.camera.lookAt(commonObj.scene.position);

// 环境光
const ambientLight = new THREE.AmbientLight(0x1c1c1c);
commonObj.scene.add(ambientLight);

const target = new THREE.Object3D();
target.position.set(10, 5, 0);

// 平行光源
const directionalLight = new THREE.DirectionalLight(0xff5818);
directionalLight.position.set(-40, 60, 12);
directionalLight.castShadow = true;
directionalLight.intensity = 0.5;
directionalLight.shadow.mapSize.height = 2000;
directionalLight.shadow.mapSize.width = 1000;
directionalLight.target = target;

commonObj.scene.add(directionalLight);

document.body.appendChild(commonObj.renderer.domElement);

function render() {
    requestAnimationFrame(render);
    commonObj.renderer.render(commonObj.scene, commonObj.camera);
}
render();
document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:
            directionalLight.intensity += 0.1;
            break;
        case 39:
            directionalLight.intensity -= 0.1;
            break;
    }
};
