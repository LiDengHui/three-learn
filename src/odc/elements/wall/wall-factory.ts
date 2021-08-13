import {BaseFactory} from "../../interface/base-factory";
import {Mesh, Object3D} from "three";
import {ExternalWall} from './external-wall';
import {InnerWall} from './inner-wall';
import {GlassWall} from './glass-wall';
import {WALL_HEIGHT, WALL_THICKNESS, walls} from '../../data/buildings-data'

export class WallFactory extends BaseFactory {
    constructor(group: Object3D) {
        super(group);
    }

    init() {
        walls.forEach(({type, begin, end}) => {
            let mesh: Mesh;
            if (type === 'inner') {
                mesh = new InnerWall(begin, end, WALL_HEIGHT, WALL_THICKNESS).getMesh();
            } else if (type === 'external') {
                mesh = new ExternalWall(begin, end, WALL_HEIGHT, WALL_THICKNESS).getMesh();
            } else if (type === 'glass') {
                mesh = new GlassWall(begin, end, WALL_HEIGHT, WALL_THICKNESS).getMesh();
            }
            this.group.add(mesh);
        })
    }
}