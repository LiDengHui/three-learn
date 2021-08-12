import * as THREE from 'three';
import { initStates } from '../utils/stats';

const stats = initStates();

const scene = new THREE.Scene();

// 设置雾化效果

// scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: 0xff55000 });
// 设置照相机
let camera: THREE.Camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xeeeeee, 1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
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
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
plane.receiveShadow = true;
scene.add(plane);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-20, 60, 30);
spotLight.castShadow = true;
scene.add(spotLight);

// render输出到body
document.body.appendChild(renderer.domElement);

const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
for (let j = 0; j < planeGeometry.parameters.height / 5; j++) {
    for (let i = 0; i < planeGeometry.parameters.width / 5; i++) {
        const random = Math.random() * 0.75;
        const cubeMaterial = new THREE.MeshBasicMaterial();
        cubeMaterial.color = new THREE.Color(random, 0, 0);
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        cube.position.x = -(planeGeometry.parameters.width / 2) + 2 + i * 5;
        cube.position.y = 2;
        cube.position.z = -(planeGeometry.parameters.height / 2) + 2 + j * 5;
        scene.add(cube);
    }
}

var controls = new (function () {
    this.persective = 'Perspective';
    this.switchCamera = function () {
        if (camera instanceof THREE.PerspectiveCamera) {
            camera = new THREE.OrthographicCamera(
                window.innerWidth / -16,
                window.innerWidth / 16,
                window.innerHeight / -16,
                window.innerHeight / 16,
                -500,
                500
            );
            camera.position.x = 30;
            camera.position.y = 40;
            camera.position.z = 30;
            camera.lookAt(scene.position);
            this.persective = 'Orthographic';
        } else {
            this.persective = 'Perspective';
            camera = new THREE.PerspectiveCamera(
                90,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.position.x = -30;
            camera.position.y = 40;
            camera.position.z = 30;
            camera.lookAt(scene.position);
        }
    };
})();

// setInterval(function () {
//     controls.switchCamera();
// }, 2000);
document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:
            camera.rotation.y += 0.02;
            break;
        case 39:
            camera.rotation.y -= 0.02;
            break;
    }

    render();
};
function render() {
    renderer.render(scene, camera);
}
// controls.switchCamera();
render();
