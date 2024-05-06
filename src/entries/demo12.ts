import * as THREE from 'three';
import { common } from '../common';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

const commonObj = common();

const glTFLoader = new GLTFLoader();
const obgLoader = new OBJLoader();

glTFLoader.load('/gltf/road/scene.gltf', (gltf) => {
    console.log(gltf);
    commonObj.scene.add(gltf.scene);
    render();
});
let car = new THREE.Object3D();

// add event listener to highlight dragged objects
document.body.appendChild(commonObj.renderer.domElement);
const controls = new OrbitControls(
    commonObj.camera,
    commonObj.renderer.domElement
);

obgLoader.load('/obj/car/file.obj', (obj: THREE.Object3D) => {
    console.log(obj);
    car = obj;
    obj.scale.setScalar(0.004);
    console.log(obj.position.x);
    obj.position.y = 3.9;
    obj.position.z = -100;

    // obj.position.z = 100;
    commonObj.scene.add(obj);
    // const controls = new DragControls(
    //     [obj],
    //     commonObj.camera,
    //     commonObj.renderer.domElement
    // );
    // controls.transformGroup = true;
    // controls.addEventListener('dragstart', function (event) {
    //     console.log(event);
    //     event.object;
    //     controls.enabled = false;
    // });

    // controls.addEventListener('drag', function (event) {
    //     console.log(event.object.position);
    // });
    // controls.addEventListener('dragend', function (event) {
    //     controls.enabled = true;
    //     // event.object.material.emissive.set(0x000000);
    // });
    render();
});
controls.enableDamping = true;
commonObj.camera.position.set(0, 20, 100);
controls.update();
function render() {
    requestAnimationFrame(render);
    car.position.z += 0.1;
    if (car.position.z > 100) {
        car.position.z = -100;
    }
    controls.update();
    commonObj.renderer.render(commonObj.scene, commonObj.camera);
}

render();
// file is being resolved by loader and a new url is returned.
