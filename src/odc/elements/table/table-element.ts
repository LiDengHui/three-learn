import {BaseElement} from "../base-element";
import {BoxGeometry, BufferGeometry, Mesh, MeshLambertMaterial} from "three";
import {Material} from "three/src/materials/Material";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";

export class Table extends BaseElement {
    static objLoader: OBJLoader = new OBJLoader();

    constructor() {
        super();
    }


    getGroup(callback): void {
        Table.objLoader.load('/workstation/table.obj', (obj) => {
            obj.rotation.x = -0.5 * Math.PI;
            obj.rotation.z = 0.5 * Math.PI;
            obj.scale.set(0.25, 0.25, 0.25)
            callback(obj);
        })
    }
}