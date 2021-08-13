import {Object3D, Scene} from "three";
import {BaseFactory} from "../../interface/base-factory";
import {Table} from "./table-element"

export class TableFactory extends BaseFactory {
    constructor(group: Object3D) {
        super(group);
    }

    init() {
        const table = new Table();
        table.getGroup((obj) => {
            this.group.add(obj)
        })
    }

    addTables(obj) {
        
    }
}


