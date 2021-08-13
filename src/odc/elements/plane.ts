import {BaseElement} from "./base-element";
import {Mesh, MeshLambertMaterial, PlaneGeometry, Scene} from "three";
import {BaseFactory} from "../interface/base-factory";

export class PlaneFactory extends BaseFactory {
    constructor(group: Scene) {
        super(group);
    }


    init() {
        const planeGeometry = new PlaneGeometry(60, 30);
        const planeMaterial = new MeshLambertMaterial({color: 0xffffff});
        const plane = new Mesh(planeGeometry, planeMaterial);

        plane.rotation.x = -0.5 * Math.PI;
        plane.position.set(15, 0, 0);
        plane.receiveShadow = true;
        this.group.add(plane);
    }
}