import { common } from '../common';
import * as THREE from 'three';
export const setModelCenter = (
    commonObj: ReturnType<typeof common>,
    object: THREE.Object3D
) => {
    if (object.updateMatrixWorld) {
        object.updateMatrixWorld();
    }

    let box = new THREE.Box3().setFromObject(object);
    let objSize;

    objSize = new THREE.Vector3(
        Math.abs(box.max.x - box.min.x),
        Math.abs(box.max.y - box.min.y),
        Math.abs(box.max.z - box.min.z)
    );

    // 返回包围盒的中心点
    const center = box.getCenter(new THREE.Vector3());

    object.position.x += object.position.x - center.x;
    object.position.y += object.position.y - center.y;
    object.position.z += object.position.z - center.z;
};
