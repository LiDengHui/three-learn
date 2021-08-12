import {AxesHelper, GridHelper, Scene} from "three";
import {BaseFactory} from "../interface/base-factory";

export class HelpFactory extends BaseFactory{

    constructor(scene: Scene) {
        super(scene)
    }

    init() {
        // 坐标轴
        const axesHelper = new AxesHelper(100)
        axesHelper.position.set(0, 100, 0);
        this.scene.add(axesHelper);
        this.scene.add(new GridHelper(1000, 50));
    }
}