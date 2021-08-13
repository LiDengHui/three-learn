import {BaseFactory} from "../../interface/base-factory";
import {Object3D} from "three";
import {TableFactory} from "../table/table-factory";
import {Workstation} from "./workstation";
import {southWorkstationArea} from "../../data/workstations-data";

const {begin, end} = southWorkstationArea;

export class WorkstationFactory extends BaseFactory {
    constructor(group: Object3D) {
        super(group);
    }

    init() {
        this.group.add(new Workstation(begin, end).getMesh());
        new TableFactory(this.group)
    }
}