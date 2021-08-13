import {WallElement} from "./wall";
import {Material, MeshLambertMaterial, TextureLoader, Vec2} from "three";

export class ExternalWall extends WallElement {
    constructor(begin: Vec2, end: Vec2, height: number, thickness: number) {
        super(begin, end, height, thickness);
    }

    initMaterial(): Material {
        const loader = new TextureLoader();
        const wallLoader = loader.load('/texture/brick_diffuse.png', () => {

        });
        return new MeshLambertMaterial({
            map: wallLoader
        });
    }
}