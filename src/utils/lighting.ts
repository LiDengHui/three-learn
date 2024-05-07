import * as THREE from 'three';
export function initDefaultLighting(
    scene: THREE.Scene,
    position: THREE.Vector3 = new THREE.Vector3(-10, 30, 40)
) {
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x343434);
    ambientLight.name = 'ambientLight';
    scene.add(ambientLight);
}
