import { common } from '../common';
import { initOrbitControls } from '../utils/controls';
import * as THREE from 'three';
import { initDefaultLighting } from '../utils/lighting';
import { initStates } from '../utils/stats';

const commonObj = common({
    axesHelper: true,
    gridHelper: true,
});
document.body.appendChild(commonObj.renderer.domElement);

initDefaultLighting(commonObj.scene);

const controls = initOrbitControls(commonObj.camera, commonObj.renderer);

const clock = new THREE.Clock();

type UpdateFn = (delta: number) => void;
const updates: Array<UpdateFn> = [];
const stats = initStates();

addCube(commonObj);
addPlane(commonObj);
function render() {
    const delta = clock.getDelta();
    controls.update();
    stats.update();
    updates.forEach((item) => item(delta));
    commonObj.renderer.render(commonObj.scene, commonObj.camera);
    requestAnimationFrame(render);
}

render();

function addCube(commonObj: ReturnType<typeof common>) {
    const geometry = new THREE.BoxGeometry(6, 6, 6);
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#8ef39b'),
    });
    const cube = new THREE.Mesh(geometry, material);
    commonObj.scene.add(cube);
    cube.position.y += 3.01;
    return { cube };
}

function addPlane(commonObj: ReturnType<typeof common>) {
    const geometry = new THREE.PlaneGeometry(10, 10); // 平面尺寸为 5x5
    const material = new THREE.MeshBasicMaterial({
        color: 0xaaaaaa,
        side: THREE.DoubleSide,
    }); // 材质为灰色，双面可见
    const plane = new THREE.Mesh(geometry, material);
    plane.rotateX(Math.PI / 2);
    commonObj.scene.add(plane);
}
