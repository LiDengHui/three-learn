import {
    AmbientLight,
    Camera,
    Color,
    DirectionalLight,
    Group, Object3D,
    PerspectiveCamera, Raycaster,
    Scene, Vector2,
    Vector3,
    WebGLRenderer
} from 'three';
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
    mouse = new Vector2();
    raycaster = new Raycaster();

    constructor() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initRenderer();
        this.addElement();
        this.initControl();
        this.initEvent();
    }

    initCamera() {
        const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(-301, 34, -273);
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
        this.controls.target = new Vector3(57, -44, -258)
    }

    initEvent() {


        const onMouseMove = (event: MouseEvent) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }
        const onClick = (event: MouseEvent) => {
            this.raycaster.setFromCamera(this.mouse, this.camera);

            // calculate objects intersecting the picking ray
            const intersects = this.raycaster.intersectObjects(this.scene.children);

            if (intersects.length > 0) {
                const intersect = intersects[0];
                intersect.object.dispatchEvent({
                    type: 'click',
                    event
                });
            }
            window.addEventListener('mousemove', onMouseMove, false);
            window.addEventListener('click', onClick, false);
        }


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

    updateEvent() {

    }

    render() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera)
        this.updateEvent();
        requestAnimationFrame(() => {
            this.render();
        })
    }
}