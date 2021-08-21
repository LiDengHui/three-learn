import { BaseFactory } from './interface/base-factory';
import { Object3D } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { publicPath } from './utils/public-path';


export class Workstation extends BaseFactory {
    static obj: Object3D;

    constructor(group: Object3D) {
        super(group);
    }

    init() {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(publicPath('/odc/'));
        loader.setDRACOLoader(dracoLoader);
        loader.load(publicPath('/odc/odc.gltf'), (obj: GLTF) => {
            this.group.add(obj.scene);
        });
    }

}