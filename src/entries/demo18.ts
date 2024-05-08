import { common } from '../common';
import { initOrbitControls } from '../utils/controls';
import * as THREE from 'three';
import { initDefaultLighting } from '../utils/lighting';
import { getData, resource } from '../utils/resource';
import { get } from 'lodash';
import { initGeoFun, latlng2px } from '../utils/geo';
import { initStates } from '../utils/stats';
import { setModelCenter } from '../utils/camera';
import { Object3D } from 'three/src/core/Object3D';
import { WebGLProgramParametersWithUniforms } from 'three/src/renderers/webgl/WebGLPrograms';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';

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
    group.add(createLine(points, updates));
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
    return mesh;
}

function createLine(points: THREE.Vector3[], updates: UpdateFn[]) {
    const curve = new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0);

    const geometry = new THREE.TubeGeometry(
        curve,
        Math.round(points.length * 0.5),
        0.01,
        8,
        true
    );
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            len: { value: 0.1 },
            size: { value: 0.02 },
            color1: { value: new THREE.Color('#FFFFFF') },
            color2: { value: new THREE.Color('yellow') },
        },
        vertexShader: `
            uniform float time;
            uniform float size;
            uniform float len;
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec3 vColor; 
            void main() {
                vColor = color1;
                vec3 newPosition = position;
                float d = uv.x - time;
                if(mod(d, 1.0) < len) {
                    newPosition = newPosition + normal * size;
                    vColor = color2;
                    
                }
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }`,
        fragmentShader: `
        varying vec3 vColor; 
        void main() {
          gl_FragColor =vec4(vColor, 1.0);
        }`,
    });

    updates.push((delta: number) => {
        if (material.uniforms.time.value >= 1.0) {
            material.uniforms.time.value = 0.0;
        }
        material.uniforms.time.value += delta / 10;
    });

    material.onBuild = (
        object: Object3D,
        parameters: WebGLProgramParametersWithUniforms,
        renderer: WebGLRenderer
    ) => {
        console.log(parameters.vertexShader);
    };
    return new THREE.Mesh(geometry, material);
}
