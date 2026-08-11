// Shared low-level WebGL plumbing used by both WaterRipple (footer) and
// the frame-sequence ripple. Keeping this in one place means both surfaces
// run the exact same wave physics instead of two copies drifting apart.

export const QUAD_VERTEX_SHADER = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

// Height field stored as (current, previous) packed into r/g, 0.5 = rest,
// so it survives an 8-bit render target. Classic two-buffer ripple: each
// texel's new height comes from its neighbours' average minus its own
// previous height — a discrete wave equation, cheap enough to run per-pixel
// on the GPU every frame.
export const SIMULATION_SHADER = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uState;
uniform vec2 uTexel;
uniform vec2 uPointer;
uniform float uPointerStrength;
uniform float uPointerRadius;
uniform float uDamping;

float height(vec2 uv) {
  return texture2D(uState, uv).r * 2.0 - 1.0;
}

void main() {
  float previous = texture2D(uState, vUv).g * 2.0 - 1.0;

  float neighbours =
    height(vUv + vec2(uTexel.x, 0.0)) +
    height(vUv - vec2(uTexel.x, 0.0)) +
    height(vUv + vec2(0.0, uTexel.y)) +
    height(vUv - vec2(0.0, uTexel.y));

  float next = (neighbours * 0.5 - previous) * uDamping;

  float falloff = 1.0 - smoothstep(0.0, uPointerRadius, distance(vUv, uPointer));
  next += falloff * falloff * uPointerStrength;

  next = clamp(next, -1.0, 1.0);
  float current = height(vUv);
  gl_FragColor = vec4(next * 0.5 + 0.5, current * 0.5 + 0.5, 0.0, 1.0);
}
`

export const compile = (gl, type, source) => {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export const createProgram = (gl, fragmentSource, vertexSource = QUAD_VERTEX_SHADER) => {
  const program = gl.createProgram()
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource)
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource)
  if (!vertex || !fragment) return null
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
    return null
  }
  return program
}

export const createTarget = (gl, width, height) => {
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

  const framebuffer = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)

  return { texture, framebuffer, width, height }
}

export const uploadImageTexture = (gl, texture, source) => {
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
}

export const SIM_SCALE = 0.5
