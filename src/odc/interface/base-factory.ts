import {Scene} from "three";

export class BaseFactory {
    scene: Scene;
    render: Function
    constructor(scene: Scene, render?:Function) {
        this.scene = scene;
        this.render = render;
        this.init();
    }

    init(): void {
    }

    update(): void {
    }
}
