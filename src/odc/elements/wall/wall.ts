import {BaseElement} from "../base-element";
import {BoxGeometry, BufferGeometry, Mesh, MeshLambertMaterial, Vec2} from "three";
import {Material} from "three/src/materials/Material";

export class WallElement extends BaseElement {
    begin: Vec2;
    end: Vec2;
    height: number;
    thickness: number;
    mesh: Mesh

    constructor(begin: Vec2, end: Vec2, height: number, thickness: number) {
        super();
        this.begin = begin;
        this.end = end;
        this.height = height;
        this.thickness = thickness;

        this.mesh = new Mesh(this.initGeometry(), this.initMaterial());

        this.mesh.position.set(...this.calculatePosition(begin, end, height));
        this.mesh.rotation.y = this.calculateRotation(begin, end);
    }

    initGeometry(): BufferGeometry {
        const {x: beginX, y: beginY} = this.begin;
        const {x: endX, y: endY} = this.end;
        const a = endX - beginX;
        const b = endY - beginY;
        const length = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        return new BoxGeometry(this.thickness, this.height, length);
    }

    initMaterial(): Material {
        return new MeshLambertMaterial({color: '#67C23A'});
    }

    getMesh(): Mesh {
        return this.mesh;
    }

    /**
     * 计算坐标
     */
    calculatePosition(begin: Vec2, end: Vec2, height) {
        const {x: beginX, y: beginY} = begin;
        const {x: endX, y: endY} = end;
        return [(endY + beginY) / 2, height / 2, (endX + beginX) / 2] as const;
    }

    /**
     * 计算倾斜角度
     * @param begin
     * @param end
     * @returns {number}
     */
    calculateRotation(begin: Vec2, end: Vec2,) {
        const {x: beginX, y: beginY} = begin;
        const {x: endX, y: endY} = end;
        return Math.atan2(endY - beginY, endX - beginX);
    }

}