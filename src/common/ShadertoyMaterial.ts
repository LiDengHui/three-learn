import { ShaderMaterial, Texture, Vector3, Vector4 } from 'three';

export class ShadertoyMaterial extends ShaderMaterial {
    private _startTime = performance.now();
    private _lastTime = this._startTime;
    private _frame = 0;
    private _mouseDown = false;
    private _mouse = new Vector4();

    constructor(fragmentShader: string, textures: (Texture | null)[] = []) {
        const now = new Date();

        const uniforms = {
            iResolution: {
                value: new Vector4(
                    window.innerWidth,
                    window.innerHeight,
                    window.devicePixelRatio,
                    0
                ),
            },
            iTime: {
                value: 0.0,
            },
            iTimeDelta: {
                value: 0.0,
            },
            iFrameRate: {
                value: 60.0,
            },
            iFrame: {
                value: 0,
            },
            iChannelTime: {
                value: [0.0, 0.0, 0.0, 0.0],
            },
            iChannelResolution: {
                value: [new Vector3(), new Vector3(), new Vector3(), new Vector3()],
            },
            iMouse: {
                value: new Vector4()
            },
            iDate: {
                value: new Vector4(
                    now.getFullYear(),
                    now.getMonth() + 1,
                    now.getDate(),
                    now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds()
                ),
            },
            iChannel0: {
                value: textures[0]|| null,
            },
            iChannel1: {
                value: textures[1] || null,
            },
            iChannel2: {
                value: textures[2] || null,
            },
            iChannel3: {
                value: textures[3] || null,
            },

        }
        super({
            uniforms,
            transparent: true,
            fragmentShader,
            vertexShader:`
            varying vec2 vUv;
            void main(void) {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
            `
        })

        this._initMouseListeners();
        this._updateChannelResolution(textures);
    }

    update() {
        const now = performance.now();
        const delta = (now - this._lastTime) / 1000;
        this._lastTime = now;

        this.uniforms.iTime.value = (now - this._startTime) / 1000;
        this.uniforms.iTimeDelta.value = delta;
        this.uniforms.iFrameRate.value = 1 / delta;
        this.uniforms.iFrame.value = this._frame++;

        const d = new Date();
        this.uniforms.iDate.value.set(
            d.getFullYear(),
            d.getMonth() + 1,
            d.getDate(),
            d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds()
        );

        this.uniforms.iMouse.value = this._mouse;
    }

    private _initMouseListeners() {
        window.addEventListener('mousemove', (e) => {
            if (this._mouseDown) {
                this._mouse.x = e.clientX;
                this._mouse.y = window.innerHeight - e.clientY;
            }
        });
        window.addEventListener('mousedown', (e) => {
            this._mouse.x = e.clientX;
            this._mouse.y = window.innerHeight - e.clientY;
            this._mouse.z = this._mouse.x;
            this._mouse.w = this._mouse.y;
            this._mouseDown = true;
        });
        window.addEventListener('mouseup', (event) => {
            this._mouseDown = false;
        })

        window.addEventListener('resize', () => {
            this.uniforms.iResolution.value = new Vector4(
                window.innerWidth,
                window.innerHeight,
                window.devicePixelRatio,
                0
            );
        });
    }

    private _updateChannelResolution(textures: (Texture | null)[] = []) {

        for (let i = 0; i< 4; i++) {
            if (textures[i]?.image) {
                this.uniforms.iChannelResolution.value[i].set(
                    textures[i].image.width,
                    textures[i].image.height,
                    1.0
                );
            }
        }
    }
}
