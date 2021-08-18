import {AmbientLight, Camera, Color, DirectionalLight, Group, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {HelpFactory} from "./utils/help-factory";
import {BaseFactory} from "./interface/base-factory";
import {WallFactory} from "./elements/wall/wall-factory";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {floor} from "./data/buildings-data";
import {WorkstationFactory} from "./elements/workstation/workstation-factory";
import {Workstation} from "./workstation";
import {TableFactory} from "./table-factory";

export class ODC {
    scene: Scene;
    renderer: WebGLRenderer;
    camera: Camera;
    elements: BaseFactory[] = [];
    controls: OrbitControls;

    constructor() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initRenderer();
        this.addElement();
        this.initControl();
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

    initLight() {
        const ambientLight = new AmbientLight(0x606060);
        this.scene.add(ambientLight);

        const directionalLight = new DirectionalLight(0xffffff);
        directionalLight.position.set(1, 0.75, 0.5).normalize();
        this.scene.add(directionalLight);
    }

    initRenderer() {
        const renderer = new WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        this.renderer = renderer;
    }

    initControl() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    addElement() {
        this.elements.push(new HelpFactory(this.scene));
        const group = new Group();
        // group.translateX(-(floor.end.y - floor.begin.y) / 2);
        // group.translateZ(-(floor.end.x - floor.begin.x) / 2);
        // this.elements.push(new WallFactory(group));
        //this.elements.push(new WorkstationFactory(group));
        this.elements.push(new Workstation(group))
        this.elements.push(new TableFactory(group))
        this.scene.add(group);


        // this.elements.push(new FloorFactory(this.scene, this.render.bind(this)));
        // this.elements.push(new PlaneFactory(this.scene));
    }

    update() {
        this.elements.forEach((element) => element.update());
    }

    render() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(() => {
            this.render();
        })
    }
}