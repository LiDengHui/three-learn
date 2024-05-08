import { common } from '../common';
import { initOrbitControls } from '../utils/controls';
import * as THREE from 'three';
import { initDefaultLighting } from '../utils/lighting';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import { addRadar } from '../radar/addRadar';
import { resource } from '../utils/resource';

const commonObj = common({
    axesHelper: true,
});
document.body.appendChild(commonObj.renderer.domElement);

initDefaultLighting(commonObj.scene);

const controls = initOrbitControls(commonObj.camera, commonObj.renderer);

//添加一个平面
const pg = new THREE.PlaneGeometry(100, 100);
//一定要用受光材质才有阴影效果
const pm = new THREE.MeshStandardMaterial({
    color: new THREE.Color('gray'),
    transparent: true, //开启透明
    side: THREE.FrontSide, //只有渲染前面
});
const plane = new THREE.Mesh(pg, pm);
plane.rotateX(-Math.PI * 0.5);
plane.receiveShadow = true; //平面接收阴影
commonObj.scene.add(plane);

const geometries = [];

const helper = new THREE.Object3D();

for (let i = 0; i < 100; i++) {
    const h = Math.round(Math.random() * 15) + 5;
    const x = Math.round(Math.random() * 50);
    const y = Math.round(Math.random() * 50);
    helper.position.set((x % 2 ? -1 : 1) * x, h * 0.5, (y % 2 ? -1 : 1) * y);
    const geometry = new THREE.BoxGeometry(5, h, 5);
    helper.updateWorldMatrix(true, false);
    geometry.applyMatrix4(helper.matrixWorld);
    geometries.push(geometry);
}

const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries, false);
const texture = new THREE.TextureLoader().load(
    resource('assets/textures/house/house.jpg')
);
texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
const material = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
});
const cube = new THREE.Mesh(mergedGeometry, material);
cube.castShadow = true;
cube.receiveShadow = true;
commonObj.scene.add(cube);
const shaders: any[] = [];

const vertexShader1 = `
                uniform float uSize;
                varying vec2 vUv;
                void main() {`;
const vertexShader2 = `
                #include <fog_vertex>
                vUv=position.xz/uSize;`;
const vertexShader3 = `
                #include <fog_vertex>
                vUv=vec2(position.x,-position.y)/uSize;`;
const fragmentShader1 = `
                varying vec2 vUv;
                uniform float uTime;
                uniform vec3 uColor;
                uniform float uSize;
                mat2 rotate2d(float angle)
                {
                    return mat2(cos(angle), - sin(angle),
                                sin(angle), cos(angle));
                }
                float vertical_line(in vec2 uv)
                {
                    if (uv.y > 0.0 && length(uv) < 1.0)
                    {
                        float theta = mod(degrees(atan(uv.y, uv.x)), 360.0);
                        float gradient = clamp(1.0-theta/90.0,0.0,1.0);
                        return 0.3 * gradient;
                    }
                    return 0.0;
                }
                void main() {`;
const fragmentShader2 = `
              #include <dithering_fragment> 
              mat2 rotation_matrix = rotate2d(-uTime*PI*2.0); 
              gl_FragColor.rgb = mix(gl_FragColor.rgb, uColor,vertical_line(rotation_matrix * vUv) )  ;                    
              `;

//形状产生阴影
//形状接收阴影

material.onBeforeCompile = (shader, render) => {
    shaders.push(shader);
    shader.uniforms.uSize = { value: 50 };
    shader.uniforms.uTime = { value: 0.2 };
    shader.uniforms.uColor = { value: new THREE.Color('#22FFFF') };
    shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        vertexShader1
    );
    shader.vertexShader = shader.vertexShader.replace(
        '#include <fog_vertex>',
        vertexShader2
    );
    shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        fragmentShader1
    );
    shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        fragmentShader2
    );
};
pm.onBeforeCompile = (shader, render) => {
    shaders.push(shader);
    shader.uniforms.uSize = { value: 50 };
    shader.uniforms.uTime = { value: 0.2 };
    shader.uniforms.uColor = { value: new THREE.Color('#22FFFF') };
    shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        vertexShader1
    );
    shader.vertexShader = shader.vertexShader.replace(
        '#include <fog_vertex>',
        vertexShader3
    );
    shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        fragmentShader1
    );
    shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        fragmentShader2
    );
};

const clock = new THREE.Clock();
function render() {
    const delta = clock.getDelta();
    controls.update();
    commonObj.renderer.render(commonObj.scene, commonObj.camera);
    requestAnimationFrame(render);
    if (shaders?.length) {
        shaders.forEach((shader) => {
            shader.uniforms.uTime.value += delta / 3;
            if (shader.uniforms.uTime.value >= 1) {
                shader.uniforms.uTime.value = 0;
            }
        });
    }
}

render();
