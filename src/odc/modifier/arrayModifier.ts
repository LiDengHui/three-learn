import {Group, Object3D} from "three";

export function arrayModifier(obj: Object3D,
                              {
                                  xCol = 1,
                                  yCol = 1, zCol = 1, xDistance = 0, yDistance = 0, zDistance = 0
                              }, callback = (mesh: Object3D) => {
    },
): Group {
    let targetGroup = new Group();
    for (let x = 0; x < xCol; x++) {
        for (let y = 0; y < yCol; y++) {
            for (let z = 0; z < zCol; z++) {
                const mesh = obj.clone();
                mesh.position.x += x * xDistance;
                mesh.position.y += y * yDistance;
                mesh.position.z += z * zDistance;
                callback(mesh);
                targetGroup.add(mesh);
            }
        }
    }
    return targetGroup;
}