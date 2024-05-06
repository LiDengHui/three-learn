uniform vec3 u_color;
uniform vec3 u_tcolor;
uniform float u_r;
uniform float u_length;
uniform float u_max;
varying vec3 vp;


float getLeng(float x, float y) {
    return sqrt((x - 0.0) * ( x - 0.0 ) + ( y - 0.0 )* (y - 0.0));
}
void main() {

    float PI = 3.1415926;
    float uOpacity = 0.0;

    float uLenght = getLeng(vp.x, vp.z);

    if (uLenght < u_r && uLenght >  u_r - uLenght) {

        float op = sin(((u_r * 20.0) - uLenght) / uLenght);
        uOpacity = op;
        if (vp.y < 0.0) {
            uOpacity = 0.0;
        }
    }
    gl_FragColor = vec4(u_tcolor,  uOpacity);
}
