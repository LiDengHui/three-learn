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

// 半球光
const hemiLight = new THREE.HemisphereLight(0xff3333, 0x00ff00, 0.8);
hemiLight.position.set(10, 50, 0);
commonObj.scene.add(hemiLight);

document.body.appendChild(commonObj.renderer.domElement);

function render() {
    requestAnimationFrame(render);
    commonObj.renderer.render(commonObj.scene, commonObj.camera);
}
render();
document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:
            hemiLight.intensity += 0.1;
            break;
        case 39:
            hemiLight.intensity -= 0.1;
            break;
    }
};
