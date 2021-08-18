import {BaseFactory} from "./interface/base-factory";
import {AxesHelper, GridHelper, Object3D, Scene} from "three";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";


export class TableFactory extends BaseFactory {
    gltf: GLTF;

    constructor(group: Object3D) {
        super(group)
    }

    init() {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/odc/');
        loader.setDRACOLoader(dracoLoader);
        loader.load('/odc/table.gltf', (gltf: GLTF) => {
            this.gltf = gltf;
            this.group.add(this.gltf.scene)
        })
    }

}