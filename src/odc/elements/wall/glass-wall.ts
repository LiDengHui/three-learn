import {WallElement} from "./wall";
import {Material, MeshBasicMaterial, Vec2} from "three";

export class GlassWall extends WallElement {
    constructor(begin: Vec2, end: Vec2, height: number, thickness: number) {
        super(begin, end, height, thickness);
    }

    initMaterial(): Material {
        return new MeshBasicMaterial({color: '#ECF1F3', transparent: true, opacity: 0.4});
    }
}