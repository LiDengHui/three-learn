import { common } from '../common';
import { initOrbitControls } from '../utils/controls';
import * as THREE from 'three';
import { initDefaultLighting } from '../utils/lighting';
import { initStates } from '../utils/stats';
import { Material } from 'three';

const commonObj = common({
    axesHelper: true,
    gridHelper: false,
});
document.body.appendChild(commonObj.renderer.domElement);

initDefaultLighting(commonObj.scene);

const controls = initOrbitControls(commonObj.camera, commonObj.renderer);

const clock = new THREE.Clock();

type UpdateFn = (delta: number) => void;
const updates: Array<UpdateFn> = [];
const stats = initStates();
const materials: THREE.ShaderMaterial[] = [];


addTubeGeometry(commonObj);


function render() {

    materials.forEach(m=> {
        if(m) {
            m.uniforms.uTime.value += m.uniforms.uSpeed.value * 0.01;
            if(m.uniforms.uTime.value > 1) {
                m.uniforms.uTime.value = 0;
            }
        }
    })
    const delta = clock.getDelta();
    controls.update();
    stats.update();
    updates.forEach((item) => item(delta));
    commonObj.renderer.render(commonObj.scene, commonObj.camera);
    requestAnimationFrame(render);
}

render();

function addTubeGeometry(commonObj: ReturnType<typeof common>) {
    const that = {
        height: commonObj.renderer.domElement.height,
        width: commonObj.renderer.domElement.width,
        lineWidth: 0.5,
        gap: 1,
        amount: 10,
        hueStart: 0.6,
        hueEnd: 0.09,
        lightStart: 0.7,
        lightEnd: 0.2,
    };

    const spline = new THREE.LineCurve3(
        new THREE.Vector3(0, 0, that.height * 0.25),
        new THREE.Vector3(0, 0, - that.height * 0.25)
    );
    //直的管道
    const geometry = new THREE.TubeGeometry(
        spline,
        that.height,
        that.lineWidth,
        10,
        false
    );


    const amount = that.amount;
    const step = (that.width - that.gap) / amount;
    for (let i = 0; i < amount; i++) {
        const c = new THREE.Color("#FFFF00");

        const commonUniforms = {
            uFade: { value: new THREE.Vector2(0, 0.6) }
        };

        const vertexShader=`
            precision highp float;
            varying vec2 vUv;
            void main(void) {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `


        const fragmentShader = `
            varying vec2 vUv;
            uniform float uSpeed;
            uniform float uTime;
            uniform vec2 uFade;
            uniform vec3 uColor;
            uniform float uDirection;
            void main() {
                vec3 color = uColor;
               
               //流动方向
                float s = -uTime * uSpeed;
                float v = 0.0;
                if(uDirection == 1.0) {
                    v = vUv.x;
                } else {
                    v = -vUv.x;
                }
                
                float d = mod((v + s), 1.0);
                if(d > uFade.y)
                    discard;
                else {
                    //平滑透明度渐变
                    float alpha = smoothstep(uFade.x, uFade.y, d);
                    //透明度太小时不显示
                    if(alpha < 0.001)
                        discard;
                    gl_FragColor = vec4(color, alpha);
                }
            }

        `
        const material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            uniforms: {
                uColor: { value: c },
                //uTime设置为随机的开始时间
                uTime: { value: THREE.MathUtils.lerp(-1, 1, Math.random()) },
                //左侧一半是往前，右侧一半是往回
                uDirection: { value: i < amount * 0.5 ? 1 : 0 },
                //随机加速
                uSpeed: { value: THREE.MathUtils.lerp(1, 1.5, Math.random()) },
                ...commonUniforms
            },
            vertexShader,
            fragmentShader,
        });
        geometry.computeVertexNormals();
        const v = i / amount;
        c.setHSL(
            THREE.MathUtils.lerp(that.hueStart, that.hueEnd, v),
            1,
            THREE.MathUtils.lerp(that.lightStart, that.lightEnd, v)
        );
        const mesh = new THREE.Mesh(geometry, material);
        materials.push(material);
        //x坐标平移到等比的位置
        mesh.position.x = i * step + (i > amount * 0.5 - 1 ? that.gap : 0);
        //y坐标随机上移
        mesh.position.y = Math.random() * 5;
        commonObj.scene.add(mesh);
    }
}
