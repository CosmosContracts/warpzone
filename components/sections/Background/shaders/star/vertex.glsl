uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;
uniform float uScale;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPostion = projectionMatrix * viewPosition;   

  gl_Position = projectionPostion;
  gl_PointSize = uSize * uScale * uPixelRatio;
}
        