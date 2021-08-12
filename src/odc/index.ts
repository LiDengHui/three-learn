import {Camera, Color, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {PlaneFactory} from './elements'
import {HelpFactory} from "./utils/help-factory";
import {BaseFactory} from "./interface/base-factory";

export class ODC {
    scene: Scene;
    renderer: WebGLRenderer;
    camera: Camera;
    elements: BaseFactory[] = [];

    constructor() {
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.addElement();
    }

    initCamera() {
        const camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(800, 800, 800);
        camera.lookAt(0, 0, 0);
        this.camera = camera;
    }

    initScene() {
        const scene = new Scene();
        scene.background = new Color('#2b3a42');
        this.scene = scene;
    }

    initRenderer() {
        const renderer = new WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        this.renderer = renderer;
    }

    addElement() {
        this.elements.push(new HelpFactory(this.scene));

        // this.elements.push(new PlaneFactory(this.scene));
    }

    update() {
        this.elements.forEach((element) => element.update())
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }
}