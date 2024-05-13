import { common } from '../common';
import * as THREE from 'three';
import { initStates } from '../utils/stats';
import { initTrackballControls } from '../utils/controls';
import { initDefaultLighting } from '../utils/lighting';
import { Controls } from '../earth/controls';
import { addEarth } from '../earth/earth';
import { addPoints } from '../earth/addPoints';
import { resource } from '../utils/resource';
import { init, loadRemote } from '@module-federation/runtime';

const textureLoader = new THREE.TextureLoader();
const commonObj = common({
    axesHelper: true,
});

commonObj.scene.background = textureLoader.load(
    resource('assets/textures/bg/starry-deep-outer-space-galaxy.jpg')
);
const stats = initStates();

document.body.appendChild(commonObj.renderer.domElement);

initDefaultLighting(commonObj.scene);

const clock = new THREE.Clock();

const controls: Controls = {};

const group = new THREE.Group();

const earth = addEarth(commonObj, controls);

group.add(earth);
const points = addPoints(commonObj, controls, group);
commonObj.scene.add(group);

const trackballControls = initTrackballControls(
    commonObj.camera,
    commonObj.renderer
);

function render() {
    stats.update();

    const delta = clock.getDelta();
    trackballControls.update();
    commonObj.renderer.render(commonObj.scene, commonObj.camera);
    requestAnimationFrame(render);

    points.update(delta);
}

render();

// let script = document.createElement('script');
//
// script.src = 'http://localhost:3002/_next/static/chunks/remoteEntry.js';
//
// document.body.appendChild(script);

const remotes = () => {
    return [
        {
            name: 'shop',
            entry: `http://47.109.70.11:3002/_next/static/chunks/remoteEntry.js`,
        },
    ];
};

init({
    name: 'tree',
    remotes: remotes(),
    // force: true
});

loadRemote('shop/mounted');
