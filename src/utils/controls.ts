import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

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
