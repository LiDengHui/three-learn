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
sphere.position.set(20, 10, 0);
commonObj.scene.add(sphere);

commonObj.camera.position.set(-25, 30, 25);

commonObj.camera.lookAt(commonObj.scene.position);

// 聚光灯光源
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -12);
spotLight.target = sphere;
commonObj.scene.add(spotLight);

document.body.appendChild(commonObj.renderer.domElement);

let angleNum = 3;
function render() {
    requestAnimationFrame(render);
    spotLight.angle = Math.PI / angleNum;
    commonObj.renderer.render(commonObj.scene, commonObj.camera);
}
render();
document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 38:
            angleNum += 1;
            break;
        case 40:
            angleNum -= 1;

            if (angleNum < 1) {
                angleNum = 1;
            }
            break;
        case 37:
            spotLight.position.z += 1;
            break;
        case 39:
            spotLight.position.z -= 1;
            break;
    }
};
