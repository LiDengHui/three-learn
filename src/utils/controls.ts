import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function initTrackballControls(
    camera: THREE.Camera,
    renderer: THREE.Renderer
) {
    const trackballControls = new TrackballControls(
        camera,
        renderer.domElement
    );

    trackballControls.rotateSpeed = 1;
    trackballControls.zoomSpeed = 1;
    trackballControls.panSpeed = 1;
    trackballControls.noZoom = false;
    trackballControls.noPan = false;
    trackballControls.staticMoving = true;
    trackballControls.dynamicDampingFactor = 0.6;
    trackballControls.keys = ['65', '83', '68'];
    return trackballControls;
}

export function initOrbitControls(
    camera: THREE.Camera,
    renderer: THREE.Renderer
) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    return controls;
}
