import {Group, Object3D} from "three";

export function isGroup(obj: Object3D): obj is Group {
    return !!(obj as Group).isGroup;
}