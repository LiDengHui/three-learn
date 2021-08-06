import * as THREE from 'three';
export function common() {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xeeeeee));

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // const planeGeometry = new THREE.PlaneGeometry(60, 30);
    // const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    // const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // plane.rotation.x = -0.5 * Math.PI;
    // plane.position.set(15, 0, 0);
    // plane.receiveShadow = true;
    // scene.add(plane);

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    return {
        scene,
        // plane,
        renderer,
        camera,
    };
}
