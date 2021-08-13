import {BaseElement} from "../base-element";
import {BoxGeometry, BufferGeometry, Mesh, MeshLambertMaterial, PlaneGeometry, Vec2} from "three";
import {Material} from "three/src/materials/Material";


export class Workstation extends BaseElement {
    begin: Vec2
    end: Vec2
    mesh: Mesh

    constructor(begin: Vec2, end: Vec2) {
        super();
        this.begin = begin;
        this.end = end;
    }

    initGeometry(): BufferGeometry {
        const {x: beginX, y: beginY} = this.begin;
        const {x: endX, y: endY} = this.end;
        const a = endX - beginX;
        const b = endY - beginY;
        return new PlaneGeometry(a, b)
    }

    initMaterial(): Material {
        return new MeshLambertMaterial({color: '#CCCCCC'});
    }

    getMesh(): Mesh {
        const mesh = new Mesh(this.initGeometry(), this.initMaterial());
        const {x: beginX, y: beginY} = this.begin;
        const {x: endX, y: endY} = this.end;
        const a = (endX - beginX) / 2 + beginX;
        const b = (endY - beginY) / 2 + beginY;
        mesh.rotation.x = -0.5 * Math.PI;
        mesh.rotation.z = 0.5 * Math.PI;

        mesh.position.set(b, 0, a);
        return mesh;
    }

}