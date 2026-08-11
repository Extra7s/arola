// Composite shader for the frame-sequence ripple. Unlike WaterRipple's
// composite pass, this one has no text layer — it just refracts each
// scroll-driven frame photo through the shared wave height field, and masks
// the effect to the lower "sea" portion of the frame so the sky and bottle
// stay crisp while the ocean visibly ripples.
export const FRAME_SEQUENCE_COMPOSITE_SHADER = `
precision highp float;
varying vec2 vUv;

uniform sampler2D uState;
uniform sampler2D uBackground;
uniform vec2 uTexel;
uniform vec2 uResolution;
uniform vec2 uBackgroundResolution;
uniform float uRefraction;
uniform float uSeaLevel;   // 0..1 from the bottom - how high the water line sits
uniform float uSeaFeather; // softness of the sky/water transition

float height(vec2 uv) {
  return texture2D(uState, uv).r * 2.0 - 1.0;
}

// gradient of the height field, used as a fake refraction normal
vec2 ripple(vec2 uv) {
  float dx = height(uv + vec2(uTexel.x, 0.0)) - height(uv - vec2(uTexel.x, 0.0));
  float dy = height(uv + vec2(0.0, uTexel.y)) - height(uv - vec2(0.0, uTexel.y));
  return vec2(dx, dy);
}

// "cover" fit so each frame photo fills the canvas without stretching
vec2 coverUv(vec2 uv) {
  float canvasAspect = uResolution.x / uResolution.y;
  float imageAspect = uBackgroundResolution.x / uBackgroundResolution.y;
  vec2 scale = canvasAspect > imageAspect
    ? vec2(1.0, imageAspect / canvasAspect)
    : vec2(canvasAspect / imageAspect, 1.0);
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  // vUv.y == 0 is the bottom of the canvas (the ocean), 1 is the top (sky).
  // Fade the ripple out above the water line so only the sea distorts and
  // the bottle/sky stay crisp.
  float seaMask = 1.0 - smoothstep(uSeaLevel - uSeaFeather, uSeaLevel + uSeaFeather, vUv.y);

  vec2 distortion = ripple(vUv) * uRefraction * seaMask;
  vec4 background = texture2D(uBackground, coverUv(vUv + distortion));

  vec3 color = background.rgb;
  // highlight the wave crests so the surface reads as water
  color += length(distortion) * 3.0 * vec3(0.55, 0.75, 1.0) * seaMask;

  gl_FragColor = vec4(color, background.a);
}
`
