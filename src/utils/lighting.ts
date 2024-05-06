import * as THREE from 'three';
export function initDefaultLighting(
    scene: THREE.Scene,
    position: THREE.Vector3 = new THREE.Vector3(-10, 30, 40)
) {
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    scene.add(directionalLight);

    // const spotLight = new THREE.SpotLight(0xffffff);
    // spotLight.position.set(-10, 30, 40);
    //
    // spotLight.castShadow = true;
    //
    // spotLight.shadow.mapSize.width = 1;
    // spotLight.shadow.mapSize.height = 1;
    //
    // spotLight.shadow.camera.near = 12;
    // spotLight.shadow.camera.far = 12;
    // spotLight.shadow.camera.fov = 12;
    //
    // scene.add(spotLight);
    //
    // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotLightHelper);

    const ambientLight = new THREE.AmbientLight(0x343434);
    ambientLight.name = 'ambientLight';
    scene.add(ambientLight);
}
