import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { Controls } from './controls';
import * as THREE from 'three';
import { Side } from 'three';

export function addBasicMaterialSettings(
    gui: GUI,
    controls: Controls,
    material: THREE.MeshPhongMaterial,
    folderName: string = 'THREE.Material'
) {
    controls.material = material;

    const folder = gui.addFolder(folderName);
    folder.add(controls.material, 'id');
    folder.add(controls.material, 'uuid');
    folder.add(controls.material, 'name');
    folder.add(controls.material, 'opacity', 0, 1, 0.01);
    folder.add(controls.material, 'transparent');
    // folder.add(controls.material, 'overdraw', 0, 1, 0.01);
    folder.add(controls.material, 'visible');
    folder
        .add(controls.material, 'side', {
            FrontSide: 0,
            BackSide: 1,
            BothSides: 2,
        })
        .onChange((side) => {
            controls.material.side = side;
        });

    folder.add(controls.material, 'colorWrite');
    folder.add(controls.material, 'flatShading').onChange(function (
        shading: boolean
    ) {
        controls.material.flatShading = shading;
        controls.material.needsUpdate = true;
    });
    folder.add(controls.material, 'premultipliedAlpha');
    folder.add(controls.material, 'dithering');
    folder.add(controls.material, 'shadowSide', {
        FrontSide: 0,
        BackSide: 1,
        BothSides: 2,
    });
    folder
        .add(controls.material, 'vertexColors', {})
        .onChange((vertexColors) => {
            material.vertexColors = vertexColors;
        });
    folder.add(controls.material, 'fog');

    return folder;
}
export function addSpecificMaterialSettings(
    gui: GUI,
    controls: Controls,
    material: THREE.MeshPhongMaterial,
    folderName: string = `THREE.${material}`
) {
    controls.material = material;

    var folder = gui.addFolder(folderName);
    switch (material.type) {
        case 'MeshNormalMaterial':
            folder.add(controls.material, 'wireframe');
            return folder;

        case 'MeshPhongMaterial':
            controls.specular = material.specular.getStyle();
            folder.addColor(controls, 'specular').onChange(function (e) {
                material.specular.setStyle(e);
            });
            folder.add(material, 'shininess', 0, 100, 0.01);
            return folder;

        case 'MeshStandardMaterial':
            controls.color = material.color.getStyle();
            folder.addColor(controls, 'color').onChange(function (e: string) {
                material.color.setStyle(e);
            });
            controls.emissive = material.emissive.getStyle();
            folder.addColor(controls, 'emissive').onChange(function (e) {
                material.emissive.setStyle(e);
            });
            // folder.add(material, 'metalness', 0, 1, 0.01);
            // folder.add(material, 'roughness', 0, 1, 0.01);
            folder.add(material, 'wireframe');

            return folder;
    }
}
