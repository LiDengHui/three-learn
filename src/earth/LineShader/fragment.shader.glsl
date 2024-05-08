uniform float u_time;
varying vec4 vColor;

void main() {


    // 越靠近中心点亮度越高
    gl_FragColor = vec4(vColor);
}
