import {BaseFactory} from "./interface/base-factory";
import {Group, Object3D} from "three";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {arrayModifier} from "./modifier/arrayModifier";

export class TableFactory extends BaseFactory {
    gltf: GLTF;
    targetGroup: Object3D = new Group();

    constructor(group: Object3D) {
        super(group)
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
            localGroup.add(mesh)
            const mirrorMesh = mesh.clone()
            mirrorMesh.position.x += 8;
            mirrorMesh.rotation.y += Math.PI;
            localGroup.add(mirrorMesh)
            // 1 区域
            const group1: Group = arrayModifier(localGroup, {
                xCol: 9,
                zCol: 5,
                xDistance: 50,
                zDistance: -16.1,
            })

            this.targetGroup.add(group1);
        }
    }

    initEvent() {

    }


}