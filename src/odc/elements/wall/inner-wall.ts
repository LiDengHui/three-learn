import {WallElement} from "./wall";
import {Material, MeshLambertMaterial, Vec2} from "three";

export class InnerWall extends WallElement {
    constructor(begin: Vec2, end: Vec2, height: number, thickness: number) {
        super(begin, end, height, thickness);
    }

    initMaterial(): Material {
        return new MeshLambertMaterial()
    }
}