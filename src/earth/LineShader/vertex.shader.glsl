varying vec3 vp;

float getLength(vec3 v1, vec3 v2) {
    return sqrt(pow(v2.x - v1.x, 2.0) +
                pow(v2.y - v1.y, 2.0) +
                pow(v2.z - v1.z, 2.0)
    );
}


void main() {
    vp = position;
    vec3 newPosition = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
