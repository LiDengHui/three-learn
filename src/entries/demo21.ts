import { common } from '../common';
import { initOrbitControls } from '../utils/controls';
import * as THREE from 'three';
import { initDefaultLighting } from '../utils/lighting';
import { getData, resource } from '../utils/resource';
import { get } from 'lodash';
import { initGeoFun, latlng2px } from '../utils/geo';
import { initStates } from '../utils/stats';
import { setModelCenter } from '../utils/camera';
import { createHeatmap } from '../heatmap/heatmap';
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js';

const commonObj = common({
    axesHelper: true,
});
document.body.appendChild(commonObj.renderer.domElement);

initDefaultLighting(commonObj.scene);

const controls = initOrbitControls(commonObj.camera, commonObj.renderer);

const clock = new THREE.Clock();
initGeoFun(1000);

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

async function getHeatmap() {
    let res = await getData(resource('assets/textures/guangzhou/traffic.json'));
    let info = {
        max: Number.MIN_SAFE_INTEGER,
        min: Number.MAX_SAFE_INTEGER,
        maxlng: Number.MIN_SAFE_INTEGER,
        minlng: Number.MAX_SAFE_INTEGER,
        maxlat: Number.MIN_SAFE_INTEGER,
        minlat: Number.MAX_SAFE_INTEGER,
        data: [] as { lng: number; lat: number; value: number }[],
        size: 0,
        sizelng: 0,
        sizelat: 0,
    };
    res.features.forEach((item: any) => {
        let pos = latlng2px(item.geometry.coordinates);
        let newitem = {
            lng: pos[0],
            lat: pos[1],
            value: item.properties.avg,
        };
        info.max = Math.max(newitem.value, info.max);
        info.maxlng = Math.max(newitem.lng, info.maxlng);
        info.maxlat = Math.max(newitem.lat, info.maxlat);

        info.min = Math.min(newitem.value, info.min);
        info.minlng = Math.min(newitem.lng, info.minlng);
        info.minlat = Math.min(newitem.lat, info.minlat);
        info.data.push(newitem);
    });
    info.size = info.max - info.min;
    info.sizelng = info.maxlng - info.minlng;
    info.sizelat = info.maxlat - info.minlat;
    const radius = 40;
    const option = {
        width: info.sizelng + radius * 2,
        height: info.sizelng + radius * 2,
        colors: {
            0.1: '#2A85B8',
            0.2: '#16B0A9',
            0.3: '#29CF6F',
            0.4: '#5CE182',
            0.5: '#7DF675',
            0.6: '#FFF100',
            0.7: '#FAA53F',
            1: '#D04343',
        },
        radius,
        ...info,
        // x, y 表示二维坐标； value表示强弱值
    };
    const canvas = createHeatmap(option);

    return {
        option,
        canvas,
    };
}

async function addChart(
    commonObj: ReturnType<typeof common>,
    updates: UpdateFn[]
) {
    const group = new THREE.Group();
    const plane = await addRegion(updates);
    group.add(plane);
    setModelCenter(commonObj, group);
    commonObj.scene.add(group);
}

async function addRegion(updates: UpdateFn[]) {
    const { canvas: heatmapCanvas, option } = await getHeatmap();
    const map = new THREE.CanvasTexture(heatmapCanvas);
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    const geometry = new THREE.PlaneGeometry(
        option.width * 0.1,
        option.height * 0.1,
        500,
        500
    );
    const material = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
            map: { value: map },
            uHeight: { value: 10 },
            uOpacity: { value: 2.0 },
        },
        vertexShader: `
            uniform sampler2D map;
            uniform float uHeight;
            varying vec2 vUv;
            void main(void)
            {
                vUv = uv;
                float h =texture2D(map, uv).a*uHeight;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position.x,position.y,h, 1.0 );
            }`,
        fragmentShader: `
            precision mediump float;
            uniform sampler2D map;
            uniform float uOpacity;
            varying vec2 vUv;
            void main (void) {
                vec4 color= texture2D(map, vUv);
                float a=color.a*uOpacity;
                gl_FragColor.rgb =color.rgb;
                gl_FragColor.a=a;
            }`,
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotateX(-Math.PI * 0.5);
    let tween = new TWEEN.Tween({ v: 0 })
        .to({ v: 10 }, 10000)
        .onUpdate((obj) => {
            material.uniforms.uHeight.value = obj.v;
        })
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    TWEEN.add(tween);

    updates.push((delta) => {
        tween.update();
    });
    return plane;
}
