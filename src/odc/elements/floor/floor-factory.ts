import { BaseFactory } from '../../interface/base-factory';
import { Material, Mesh, MeshLambertMaterial, PlaneGeometry, RepeatWrapping, Scene, TextureLoader } from 'three';
import { floor } from '../../data/buildings-data';

const { begin, end } = floor;
const [beginX, beginY] = begin;
const [endX, endY] = end;

const width = endX - beginX;
const height = endY - beginY;

export class FloorFactory extends BaseFactory {
    geometry: PlaneGeometry;
    mesh: Mesh;
    material: Material;
    render: Function;

    constructor(scene: Scene, render) {
        super(scene, render);
    }

    init() {
        this.geometry = new PlaneGeometry(width, height);
        this.material = this.initMaterial();
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(height / 2, 0, width / 2);
        this.mesh.rotateX(0.5 * Math.PI);
        this.scene.add(this.mesh);
    }

    initMaterial() {
        const loader = new TextureLoader();
        const texture = loader.load('/texture/floor.jpeg', () => {
            this.render();
        });
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        // uv两个方向纹理重复数量
        texture.repeat.set(2, 1);
        return new MeshLambertMaterial({
            shininess: 0,
            roughness: 1,
            map: texture,
        });
    }


}