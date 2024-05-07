import { common } from '../common';
import { initOrbitControls, initTrackballControls } from '../utils/controls';
import * as THREE from 'three';
import { initDefaultLighting } from '../utils/lighting';
import { addRadar } from '../radar/addRadar';

const commonObj = common({
    axesHelper: true,
});
document.body.appendChild(commonObj.renderer.domElement);

initDefaultLighting(commonObj.scene);

const controls = initOrbitControls(commonObj.camera, commonObj.renderer);

const clock = new THREE.Clock();

const geometry = new THREE.BoxGeometry(5, 5, 5);
const material = new THREE.MeshBasicMaterial({
    color: '#a466ef',
    wireframe: false,
    transparent: true,
});
const cube = new THREE.Mesh(geometry, material);
//形状产生阴影
cube.castShadow = true;
//形状接收阴影
cube.receiveShadow = true;
commonObj.scene.add(cube);

const radar = addRadar(commonObj);

function render() {
    const delta = clock.getDelta();
    controls.update();
    radar.update(delta);
    commonObj.renderer.render(commonObj.scene, commonObj.camera);
    requestAnimationFrame(render);
}

render();
