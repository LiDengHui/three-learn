import { common } from '../common';
import { initOrbitControls } from '../utils/controls';
import * as THREE from 'three';
import { initDefaultLighting } from '../utils/lighting';
import { initStates } from '../utils/stats';
import { Material } from 'three';
import { ShadertoyMaterial } from '../common/ShadertoyMaterial';

const commonObj = common({
    axesHelper: true,
    gridHelper: false,
});
document.body.appendChild(commonObj.renderer.domElement);

initDefaultLighting(commonObj.scene);

const controls = initOrbitControls(commonObj.camera, commonObj.renderer);


const stats = initStates();
const materials: ShadertoyMaterial[] = [];


addTubeGeometry(commonObj);


function render() {

    materials.forEach((item) => {
        item.update();
    })
    controls.update();
    stats.update();
    commonObj.renderer.render(commonObj.scene, commonObj.camera);
    requestAnimationFrame(render);
}

render();


function addTubeGeometry(commonObj: ReturnType<typeof common>) {
    const textureLoader = new THREE.TextureLoader();
    const texture0 = textureLoader.load('/assets/textures/general/weave.jpg');
    const fragmentShaderCode = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH

    precision highp float;
    
    #else
    
    precision mediump float;
    
    #endif
    uniform vec3 iResolution;
    uniform float iTime;
    uniform float iTimeDelta;
    uniform float iFrameRate;
    uniform float iFrame;
    uniform float iChannelTime[4];
    uniform vec3 iChannelResolution[4];
    uniform vec4 iMouse;
    uniform vec4 iDate;
    void mainImage(out vec4 O, vec2 I)
    {
       //Raymarch iterator
        float i,
        //Raymarch depth
        z = fract(dot(I,sin(I))),
        //Raymarch step size
        d;
        //Raymarch loop (100 iterations)
        for(O *= i; i++<1e2;
            //Sample coloring and glow attenuation
            O+=(sin(z+vec4(6,2,4,0))+1.5)/d)
        {
            //Raymarch sample position
            vec3 p = z * normalize(vec3(I+I,0) - iResolution.xyy);
            //Shift camera back
            p.z += 6.;
            //Distortion (turbulence) loop
            for(d=1.; d<9.; d/=.8)
                //Add distortion waves
                p += cos(p.yzx*d-iTime)/d;
            //Compute distorted distance field of hollow sphere
            z += d = .002+abs(length(p)-.5)/4e1;
        }
        //Tanh tonemapping
        //https://www.shadertoy.com/view/ms3BD7
        O = tanh(O/7e3); 
   
    }
    
    void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
    }
`
    const material = new ShadertoyMaterial(fragmentShaderCode, [texture0]);

    const geometry = new THREE.PlaneGeometry(10, 10);


    const mesh = new THREE.Mesh(geometry, material);
    materials.push(material);
    commonObj.scene.add(mesh);
}
