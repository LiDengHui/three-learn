import { common } from '../common';
import { initOrbitControls } from '../utils/controls';
import * as THREE from 'three';
import { initDefaultLighting } from '../utils/lighting';
import { getData, resource } from '../utils/resource';
import { get } from 'lodash';
import { initGeoFun, latlng2px } from '../utils/geo';
import { initStates } from '../utils/stats';
import { setModelCenter } from '../utils/camera';

const commonObj = common({
    axesHelper: true,
});
document.body.appendChild(commonObj.renderer.domElement);

initDefaultLighting(commonObj.scene);

const controls = initOrbitControls(commonObj.camera, commonObj.renderer);

const clock = new THREE.Clock();
initGeoFun(180);

type UpdateFn = (delta: number) => void;
const updates: Array<UpdateFn> = [];
addChart(commonObj, updates).then((res) => console.log(res));
const stats = initStates();

function render() {
    const delta = clock.getDelta();
    controls.update();
    stats.update();
    updates.forEach((item) => item(delta));
    commonObj.renderer.render(commonObj.scene, commonObj.camera);
    requestAnimationFrame(render);
}

render();

async function addChart(
    commonObj: ReturnType<typeof common>,
    updates: UpdateFn[]
) {
    let res = await getData(
        resource('assets/textures/guangzhou/guangzhou.json')
    );
    const points: THREE.Vector3[] = get(
        res as any,
        'features[0].geometry.coordinates[0][0]'
    ).map((item: number[]) => {
        const p = latlng2px(item);
        return new THREE.Vector3(p[0], 0, p[1]);
    });

    const group = new THREE.Group();

    const shape = createShape(points);
    group.add(addRegion(shape));
    group.add(createLine(shape, updates));
    setModelCenter(commonObj, group);
    commonObj.scene.add(group);
}

function createShape(points: THREE.Vector3[]) {
    const shape = new THREE.Shape();

    shape.moveTo(points[0].x, points[0].z);
    console.log(points[0].x);
    for (let i = 1; i < points.length; i = i + 2) {
        shape.lineTo(points[i].x, points[i].z);
    }
    shape.lineTo(points[0].x, points[0].z);

    return shape;
}

function addRegion(shape: THREE.Shape) {
    const extrudeSettings = {
        depth: 0.2,
        bevelEnabled: false,
    };
    //添加区块形状
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const tex = new THREE.TextureLoader().load(
        resource('assets/textures/guangzhou/tex.png')
    );
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    const material = new THREE.MeshStandardMaterial({
        map: tex,
        color: new THREE.Color('#00FFFF'),
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI * 0.5);
    mesh.position.y = extrudeSettings.depth * 0.5;
    return mesh;
}

function createLine(shape: THREE.Shape, updates: UpdateFn[]) {
    const extrudeSettings = {
        depth: 1,
        bevelEnabled: false,
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        depthTest: false,
        uniforms: {
            u_time: {
                value: 0.1,
            },
            color1: { value: new THREE.Color('#00FFFF') },
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            void main() {
                vUv=uv;
                vNormal=normal;           
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }`,
        fragmentShader: `
            uniform vec3 color1;   
            uniform float u_time;              
            varying vec2 vUv; 
            varying vec3 vNormal;
            void main() {
                if(vNormal.z==1.0||vNormal.z==-1.0||vUv.y ==0.0){
                    discard;
                } else{
                   
                    gl_FragColor =vec4(color1,1.0 - fract((vUv.y - u_time) * 3.0) ) ;
                } 
            }`,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI * 0.5);
    mesh.position.y = extrudeSettings.depth + 0.1;

    updates.push((delta) => {
        material.uniforms.u_time.value += delta / 5;
    });
    return mesh;
}