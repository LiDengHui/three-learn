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
sphere.position.set(20, 6, 0);
commonObj.scene.add(sphere);

commonObj.camera.position.set(-25, 30, 25);

commonObj.camera.lookAt(commonObj.scene.position);

// 点光源
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-40, 60, -10);
commonObj.scene.add(pointLight);

function render() {
    requestAnimationFrame(render);
    pointLight.position.z += 0.2;
    commonObj.renderer.render(commonObj.scene, commonObj.camera);
}
document.body.appendChild(commonObj.renderer.domElement);

render();
