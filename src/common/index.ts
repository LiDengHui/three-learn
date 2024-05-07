import * as THREE from 'three';

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

export function initGui() {
    return new GUI();
}

interface Config {
    axesHelper?: boolean;
    gridHelper?: boolean;
}

export function common(config: Config = {}) {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));

    const dpr = window.devicePixelRatio;
    renderer.setSize(window.innerWidth * dpr, window.innerHeight * dpr);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.copy(new THREE.Vector3(20, 20, 40));
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    if (config.axesHelper) {
        const axesHelper = new THREE.AxesHelper(15);
        scene.add(axesHelper);
    }

    if (config.gridHelper) {
        scene.add(new THREE.GridHelper(100, 100));
    }

    const gui = initGui();
    return {
        scene,
        renderer,
        camera,
        gui,
    };
}
