import {Scene} from "three";

export class BaseFactory {
    scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
        this.init();
    }

    init(): void {
    }

    update(): void {
    }
}
