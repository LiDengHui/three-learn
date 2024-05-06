import { addRing } from './ring';
import * as THREE from 'three';
import { addLine } from './line';
import { common } from '../common';
import { Controls } from './controls';

function getRandomSphere() {
    return [Math.random() * Math.PI, Math.random() * 2 * Math.PI];
}
function getPointOnSphere(r: number, [theta, phi]: number[]) {
    // 计算球面上的点的坐标
    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.sin(theta) * Math.sin(phi);
    const z = r * Math.cos(theta);

    return new THREE.Vector3(x, y, z);
}

export function addPoints(
    commonObj: ReturnType<typeof common>,
    controls: Controls,
    group: THREE.Group
) {
    const r = 10.25;

    const updates: Array<(n: number) => void> = [];
    const { mesh: ring, material: ringMaterial } = addRing(commonObj, controls);
    const rotationQuaternion = new THREE.Quaternion();
    rotationQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0), Math.PI); // 围绕y轴旋转180度

    const point = new THREE.Vector3(0, -1, 0);
    for (let i = 0; i < 10; i++) {
        const ps1 = getRandomSphere();

        const point1 = getPointOnSphere(r, ps1);

        const point11 = getPointOnSphere(r + 0.25, ps1);

        const quaternion1 = new THREE.Quaternion();
        quaternion1.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            point1.clone().normalize()
        );
        quaternion1.multiply(rotationQuaternion);
        const ring1 = ring.clone();

        ring1.quaternion.copy(quaternion1);
        ring1.position.copy(point11);
        const ps2 = getRandomSphere();
        const point2 = getPointOnSphere(r, ps2);

        const quaternion2 = new THREE.Quaternion();
        quaternion2.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            point2.clone().normalize()
        );
        quaternion2.multiply(rotationQuaternion);

        const point22 = getPointOnSphere(r + 0.25, ps2);

        const ring2 = ring.clone();
        ring2.quaternion.copy(quaternion2);
        ring2.position.copy(point22);

        const { lineMesh, update } = addLine(
            commonObj,
            controls,
            point1,
            point2
        );

        group.add(ring1);
        group.add(ring2);
        group.add(lineMesh);
        updates.push(update);
    }

    return {
        update(delta: number) {
            ringMaterial.uniforms.u_r.value += delta;
            if (ringMaterial.uniforms.u_r.value >= 1) {
                ringMaterial.uniforms.u_r.value = 0.001;
            }
            updates.forEach((item) => item(delta));
        },
    };
}
