import { common } from '../common';
import * as THREE from 'three';
const commonObj = common();

const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;
cube.position.set(-4, 3, 0);
commonObj.scene.add(cube);

commonObj.camera.position.set(-25, 30, 25);

commonObj.camera.lookAt(commonObj.scene.position);

// 聚光灯光源
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;
commonObj.scene.add(spotLight);

// 环境光
const ambientLight = new THREE.AmbientLight(0xff0000);
// commonObj.scene.add(ambientLight);

document.body.appendChild(commonObj.renderer.domElement);
commonObj.renderer.render(commonObj.scene, commonObj.camera);
