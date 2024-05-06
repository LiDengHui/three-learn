import { common } from '../common';
import { Controls } from './controls';
import * as THREE from 'three';
import fragmentShaderCode from './shader/fragment.shader.glsl';
import vertexShaderCode from './shader/vertex.shader.glsl';

export function addRing(
    commonObj: ReturnType<typeof common>,
    controls: Controls
) {
    const geometry = new THREE.ConeGeometry(1, 1, 32);
    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShaderCode,
        fragmentShader: fragmentShaderCode,
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false,
        uniforms: {
            u_color: {
                value: new THREE.Color('#eab308'),
            },
            u_tcolor: {
                value: new THREE.Color('#38bdf8'),
            },
            u_r: {
                value: 0.01,
            },
            u_length: {
                value: 0.1,
            },
            u_max: {
                value: 1,
            },
        },
    });

    const mesh = new THREE.Mesh(geometry, material);

    return {
        mesh,
        geometry,
        material,
    };
}
