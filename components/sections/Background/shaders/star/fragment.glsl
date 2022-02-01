uniform vec3 uColor;

void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(0.1));
  float strength = 0.05 / distanceToCenter;
  gl_FragColor = vec4(uColor, strength);
}