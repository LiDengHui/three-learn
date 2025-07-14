import {
    AmbientLight,
    Camera,
    Color,
    DirectionalLight,
    Group,
    PerspectiveCamera,
    Scene,
    Vector2,
    Vector3,
    WebGLRenderer,
} from 'three';
import { HelpFactory } from './utils/help-factory';
import { BaseFactory } from './interface/base-factory';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Workstation } from './workstation';
import { TableFactory } from './table-factory';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

export class ODC {
    scene: Scene;
    camera: Camera;
    controls: OrbitControls;
    renderer: WebGLRenderer;
    elements: BaseFactory[] = [];
    composer: EffectComposer;
    outlinePass: OutlinePass;

    constructor() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initRenderer();
        this.initControl();
        this.initComposer();
        this.addElement();
    }

    initCamera() {
        this.camera = new PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );
        this.camera.position.set(-301, 34, -273);
    }

    initScene() {
        this.scene = new Scene();
        this.scene.background = new Color('#2b3a42');
    }

    initLight() {
        const ambientLight = new AmbientLight(0xffffff);
        this.scene.add(ambientLight);

        const directionalLight = new DirectionalLight(0xffffff);
        directionalLight.position.set(1, 0.75, 0.5).normalize();
        this.scene.add(directionalLight);
    }

    initRenderer() {
        const renderer = new WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        this.renderer = renderer;
    }

    initControl() {
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this.controls.target = new Vector3(57, -44, -258);
    }

    addElement() {
        this.elements.push(new HelpFactory(this.scene));
        const group = new Group();
        this.elements.push(new Workstation(group));
        this.elements.push(new TableFactory(group, this));
        this.scene.add(group);
    }

    update() {
        this.elements.forEach((element) => element.update());
    }

    updateEvent() {}

    render() {
        this.controls.update();
        this.update();
        this.updateEvent();
        this.composer.render();
        requestAnimationFrame(() => {
            this.render();
        });
    }

    private initComposer() {
        this.composer = new EffectComposer(this.renderer);
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
        this.outlinePass = new OutlinePass(
            new Vector2(window.innerWidth, window.innerHeight),
            this.scene,
            this.camera
        );
        this.outlinePass.edgeStrength = 3.0;
        this.outlinePass.edgeGlow = 0.0;
        this.outlinePass.edgeThickness = 2.0;
        this.outlinePass.usePatternTexture = false;
        this.outlinePass.visibleEdgeColor.set('#0000FF');
        this.outlinePass.hiddenEdgeColor.set('#FF0000');
        this.composer.addPass(this.outlinePass);
        // TODO
        // const effectFXAA = new ShaderPass(FXAAShader);
        // effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);

        // this.composer.addPass(effectFXAA);
    }
}
