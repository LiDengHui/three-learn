varying vec3 vp;
uniform vec3 u_color;
uniform vec3 u_pointer;

void main() {
    float len = distance(vp, u_pointer);
    float uOpacity = 1.0;

    if (len >= 1.0) {
        uOpacity = 0.2;
    } else {
        uOpacity = clamp(1.0- len, 0.3 , 1.0) * 2.0;
    }

    // 越靠近中心点亮度越高
    gl_FragColor = vec4(u_color, uOpacity);
}
