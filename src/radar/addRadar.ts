import { common } from '../common';
import * as THREE from 'three';
import vertexShaderCode from './shader/vertex.shader.glsl';
import fragmentShaderCode from './shader/fragment.shader.glsl';

const radarData = {
    radius: 20, // 雷达半径
    color: 0x03fafa, // 雷达颜色
    speed: 100, // 扫描速度
    followWidth: 90, // 扫描宽度 0～360
};

export function addRadar(commonObj: ReturnType<typeof common>) {
    // 创建几何体
    const circleGeometry = new THREE.CircleGeometry(radarData.radius, 1000);

    // 平面绕x轴旋转90度
    const rotateMatrix = new THREE.Matrix4().makeRotationX(
        (-Math.PI / 180) * 90
    );
    circleGeometry.applyMatrix4(rotateMatrix);
    // 创建shader材质
    const material1 = new THREE.ShaderMaterial({
        vertexShader: vertexShaderCode,
        fragmentShader: fragmentShaderCode,
        transparent: true,
        uniforms: {
            vColor: {
                value: new THREE.Color(0x03fafa),
            },
            uTime: {
                value: 0,
            },
            uSpeed: {
                value: radarData.speed, //速度
            },
            uRadius: {
                value: radarData.radius, // 半径
            },
            uFollowWidth: {
                value: radarData.followWidth, // 尾焰宽度
            },
        },
    });
    const mesh = new THREE.Mesh(circleGeometry, material1);
    commonObj.scene.add(mesh);

    return {
        update(delta: number) {
            material1.uniforms.uTime.value += delta;
        },
    };
}
