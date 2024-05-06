import { common } from '../common';
import { Controls } from './controls';
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import {
    addBasicMaterialSettings,
    addSpecificMaterialSettings,
} from './material';

export function addEarth(
    commonObj: ReturnType<typeof common>,
    controls: Controls
) {
    const textureLoader = new THREE.TextureLoader();

    const earthMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load('/assets/textures/earth/Earth.png'),
        normalMap: textureLoader.load('assets/textures/earth/EarthNormal.png'),
        specularMap: textureLoader.load('assets/textures/earth/EarthSpec.png'),
        normalScale: new THREE.Vector2(6, 6),
    });

    const sphere = new THREE.SphereGeometry(10, 100, 100);
    const sphere1 = addGeometryWithMaterial(
        commonObj.scene,
        sphere,
        'sphere',
        commonObj.gui,
        controls,
        earthMaterial.clone()
    );

    return sphere1;
}

export function addGeometryWithMaterial(
    scene: THREE.Scene,
    geom: THREE.BufferGeometry,
    name: string,
    gui: GUI,
    controls: Controls,
    material: THREE.MeshPhongMaterial
) {
    const mesh = new THREE.Mesh(geom, material);
    mesh.castShadow = true;
    addBasicMaterialSettings(gui, controls, material, name + '-THREE.Material');
    addSpecificMaterialSettings(gui, controls, material, name + '-Material');
    return mesh;
}
