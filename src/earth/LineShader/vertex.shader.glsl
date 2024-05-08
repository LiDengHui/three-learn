uniform vec3 u_color;
uniform float u_time;
varying vec4 vColor;
void main() {
    vec3 vp = position;

    float d = uv.x - u_time;
    float opacity = 0.0;
    float m = mod(d, 1.0);
    if(m < 0.1) {
        opacity = 1.0;
        vp = position + normal * m;
    } else {
        opacity = 0.2;
    }
    vColor = vec4(u_color, opacity);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vp, 1.0);
}
