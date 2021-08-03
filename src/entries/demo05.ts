import * as THREE from 'three';
import { initStates } from '../util/stats';

const stats = initStates();

const scene = new THREE.Scene();

// 设置照相机
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.x = -30;
camera.position.y = 30;
camera.position.z = 50;
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
    // wireframe: true,
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

// 定义一个方块
// 增加8个顶点
const geometry = new THREE.BufferGeometry();

let arr = [
    // 前

    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,

    1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
];
// 后
arr.push(...[-1, -1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, -1, 1, -1, -1, -1, -1]);

// 左
arr.push(...[-1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1]);

// 右
arr.push(...[1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1]);

// 上
arr.push(...[1, 1, -1, -1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1]);

// 下
arr.push(
    ...[
        -1, -1, 1, 1, -1, 1, 1, -1, -1,

        1, -1, -1, -1, -1, -1, -1, -1, 1,
    ]
);
let vertices = new Float32Array(arr);

vertices = vertices.map((e) => e * 3);

// let arr = vertices.reduce<number[]>((arr, item) => arr.concat(item), []);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

mesh.position.y = 4;
mesh.castShadow = true;
scene.add(mesh);
// 引入动画
function render() {
    stats.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
// render输出到body
document.body.appendChild(renderer.domElement);

render();
