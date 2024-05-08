import { common } from '../common';
import { Controls } from './controls';
import * as THREE from 'three';

import fragmentShaderCode from './LineShader/fragment.shader.glsl';
import vertexShaderCode from './LineShader/vertex.shader.glsl';
export function addLine(
    commonObj: ReturnType<typeof common>,
    controls: Controls,
    v0: THREE.Vector3,
    v3: THREE.Vector3
) {
    // 夹角
    const angle = (v0.angleTo(v3) * 8) / Math.PI; // 0 ~ Math.PI

    const aLen = angle * 1.6;
    const hLen = angle * angle * 10;

    const p0 = new THREE.Vector3(0, 0, 0);

    const vCenter = getVCenter(v0.clone(), v3.clone());
    // 法线向量
    const rayLine = new THREE.Ray(p0, vCenter);

    const temp = p0.clone();

    const at = hLen / rayLine.at(1, temp).distanceTo(p0);
    // 顶点坐标
    const vtop = rayLine.at(at, temp);

    // 控制点坐标
    const v1 = getLenVector(v0.clone(), vtop, aLen);
    const v2 = getLenVector(v3.clone(), vtop, aLen);
    // 绘制三维三次贝赛尔曲线
    const curve = new THREE.CubicBezierCurve3(v0, v1, v2, v3);

    const geometry = new THREE.TubeGeometry(curve, 100, 0.02, 10, false);

    const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShaderCode,
        fragmentShader: fragmentShaderCode,
        blending: THREE.AdditiveBlending,
        uniforms: {
            u_color: {
                value: new THREE.Color('#4bd3ec'),
            },
            u_time: {
                value: 0.0,
            },
        },
    });

    const mesh = new THREE.Mesh(geometry, shaderMaterial);

    return {
        v0,
        v1,
        v2,
        v3,
        curve: curve,
        lineMesh: mesh,
        shaderMaterial,
        update(delta: number) {
            shaderMaterial.uniforms.u_time.value += delta / 2;
        },
    };
}

/**
 * 两个点相加再除以2
 * @param v1
 * @param v2
 */
function getVCenter(v1: THREE.Vector3, v2: THREE.Vector3) {
    const v = v1.add(v2);
    return v.divideScalar(2);
}

/**
 * 两个向量之前任意一点
 *
 * @param v1
 * @param v2
 * @param len
 * @return v1 到 v2 的 len 长度的 位置的坐标
 */

function getLenVector(v1: THREE.Vector3, v2: THREE.Vector3, len: number) {
    let v1v2Len = v1.distanceTo(v2);
    return v1.lerp(v2, len / v1v2Len);
}
