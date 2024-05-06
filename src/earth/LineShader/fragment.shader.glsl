varying vec3 vp;
uniform vec3 u_color;
uniform vec3 u_pointer;

// 得到两点之间的距离
float getLength(vec3 v1, vec3 v2) {
    return sqrt(pow(v2.x - v1.x, 2.0) +
                pow(v2.y - v1.y, 2.0) +
                pow(v2.z - v1.z, 2.0)
    );
}

void main() {
    float t = 1.0;
    float len = t - getLength(u_pointer, vp);
    float uOpacity = 1.0;

    if (len < 0.2) {
        uOpacity = 0.2;
    } else {
        uOpacity = 1.0;
    }

    // 越靠近中心点亮度越高
    gl_FragColor = vec4(u_color, uOpacity);
}
