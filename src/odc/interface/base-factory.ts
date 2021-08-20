import {Object3D} from "three";

export class BaseFactory {
    group: Object3D;

    constructor(group: Object3D) {
        this.group = group;
        this.init();
    }

    init(): void {
    }

    update(): void {
    }

    initEvent(): void {

    }
}
