import {BaseFactory} from "./interface/base-factory";
import {
    Camera, Color,
    Group,
    Material,
    Mesh,
    MeshBasicMaterial, MeshPhongMaterial,
    MeshStandardMaterial,
    Object3D,
    Raycaster, RectAreaLight,
    TextureLoader
} from "three";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {arrayModifier} from "./modifier/arrayModifier";
import {isGroup} from "./utils/is";


export class TableFactory extends BaseFactory {
    gltf: GLTF;
    targetGroup: Object3D = new Group();
    raycaster = new Raycaster();
    camera: Camera;
    actives: ClickObject3DType;
    nextActives: ClickObject3DType;

    constructor(group: Object3D, camera: Camera) {
        super(group)
        this.camera = camera;
    }

    async load(): Promise<GLTF> {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/odc/');
        loader.setDRACOLoader(dracoLoader);
        return new Promise(((resolve, reject) => {
            loader.load('/odc/table.gltf', (gltf: GLTF) => {
                resolve(gltf)
            }, () => {
            }, (err: ErrorEvent) => {
                reject(err)
            })
        }))
    }

    async init() {
        this.gltf = await this.load();
        this.addMesh();
        this.group.add(this.targetGroup);
    }

    addMesh() {
        const children: Object3D[] = this.gltf.scene.children;
        if (Array.isArray(children) && children.length > 0) {
            let localGroup = new Group();
            const mesh = children[0];
            localGroup.add(mesh);
            const mirrorMesh = mesh.clone()
            mirrorMesh.position.x += 8;
            mirrorMesh.rotation.y += Math.PI;
            localGroup.add(mirrorMesh)
            // 1 区域
            this.targetGroup = arrayModifier(localGroup, {
                xCol: 9,
                zCol: 5,
                xDistance: 50,
                zDistance: -16.1,
            })
            this.initEvent();
        }
    }

    initEvent() {
        const onClick = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera({x, y}, this.camera);
            const intersects = this.raycaster.intersectObject(this.targetGroup, true,);
            if (intersects.length > 0) {
                const intersect = intersects[0];
                const obj: ClickObject3DType = getClickObj(intersect.object);
                if (obj) {
                    this.nextActives = obj
                }
            }

        }
        window.addEventListener('click', onClick, false);
    }

    update() {
        if (this.actives !== this.nextActives) {
            // 激活
            if (this.actives?.target !== this.nextActives?.target) {
                this.actives?.resetActive();
            }
            this.nextActives?.active();
            this.actives = this.nextActives;
        }
    }

}

enum ClickType {
    Monitor
}

interface ClickObject3DType {
    clickType: ClickType,
    target: Object3D,
    active?: Function,
    resetActive?: Function
}

const cacheMesh = new Map<Mesh, { rootMaterial: Material | Material[] }>();

const loader = new TextureLoader();
const screenTexture = loader.load('/texture/screen.png');
const openMaterial = new MeshPhongMaterial({
    emissiveMap: screenTexture,
    map: screenTexture,
    emissive: new Color("#FFFFFF"),
});

function getClickObj(child: Object3D): ClickObject3DType {
    while (child) {
        if (isMonitor(child)) {
            const mesh = child.children[1] as Mesh;
            console.log(child)
            const resetActive = () => {
                if (cacheMesh.has(mesh)) {
                    const {rootMaterial} = cacheMesh.get(mesh);
                    mesh.material = rootMaterial;
                    cacheMesh.delete(mesh)
                }
            }
            return {
                clickType: ClickType.Monitor,
                target: child,
                active() {
                    if (!cacheMesh.has(mesh)) {
                        cacheMesh.set(mesh, {
                            rootMaterial: mesh.material
                        })
                        mesh.material = openMaterial;
                    } else {
                        resetActive();
                    }
                },
                resetActive
            };
        } else {
            child = child.parent;
        }
    }
    return null;

    function isMonitor(obj: Object3D) {
        return (obj.name === 'monitor' || obj.name === 'monitor001') && isGroup(obj);
    }
}

