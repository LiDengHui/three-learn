declare module 'three/examples/jsm/libs/dat.gui.module' {
    interface GUIConfig {}

    interface AddParams {
        color?: string;
        before?: any;
        [key: string]: any;
    }

    export class Controller {
        onChange(fn: (value: any) => void): void;
    }
    export class GUI {
        constructor(config?: GUIConfig);

        addFolder(name: string): GUI;
        add(obj: Object, params?: AddParams): Controller;
        add(
            obj: Object,
            property: string,
            min: number,
            max: number,
            step: number
        ): Controller;
        add(obj: Object, property: string, params?: AddParams): Controller;
        add(
            obj: Object,
            object: any,
            property: string,
            params: AddParams
        ): Controller;

        addColor(obj: Object, property: string, params?: AddParams): Controller;
    }

    export namespace Dat {
        const GUI: GUI;
    }
    export default Dat;
}
