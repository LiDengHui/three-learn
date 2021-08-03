import * as THREE from 'three';
import { initStates } from '../util/stats';

const stats = initStates();

const scene = new THREE.Scene();

// 设置雾化效果
scene.fog = new THREE.Fog(0xffffff, 0.005, 100);
// 设置照相机
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xeeeeee);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// 设置辅助测试工具
const axes = new THREE.AxesHelper(20);
scene.add(axes);

// 设置平面
const planeGeometry = new THREE.PlaneGeometry(70, 50, 1, 1);
const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xcccccc,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
plane.receiveShadow = true;
scene.add(plane);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;
scene.add(spotLight);

function addCube() {
    // 设置立方体
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x =
        -15 + Math.round(Math.random() * planeGeometry.parameters.width);
    cube.position.y = Math.round(Math.random() * 5);
    cube.position.z =
        -30 + Math.round(Math.random() * planeGeometry.parameters.height);
    cube.castShadow = true;
    scene.add(cube);
}
// 引入动画
function render() {
    stats.update();
    addCube();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
// render输出到body
document.body.appendChild(renderer.domElement);

render();
