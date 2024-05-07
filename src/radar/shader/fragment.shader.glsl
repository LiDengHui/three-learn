uniform vec3 vColor;
uniform float uRadius;
uniform float uTime;
uniform float uSpeed;
uniform float uFollowWidth;

varying vec3 vPosition;
// 获取扫描角度函数（参数：三维向量空间坐标）
//A·B = |A||B|Cos(θ)
float calcAngle(vec3 oFrag) {

    // 当前图元所在角度
    float fragAngle = degrees(atan(oFrag.z, oFrag.x));

    // 时间单位移动角度
    float scanAngle =uTime * uSpeed;
    float angle = scanAngle + fragAngle;

    return mod(angle, 360.0);
}

void main() {
    // length内置函数，取向量的长度
    float angle = calcAngle(vPosition);
    if(length(vPosition) > 0.0 && length(vPosition) < uRadius) {
        gl_FragColor = mix(gl_FragColor.rbga, vec4(vColor, 1.0), clamp(1.0- angle / uFollowWidth, 0.0, 1.0));
    }

}
