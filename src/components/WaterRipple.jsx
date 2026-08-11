import { useEffect, useRef } from 'react'

const QUAD_VERTEX_SHADER = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

// Height field is stored as (current, previous) packed into the r/g channels
// with 0.5 as the rest position, so it survives an 8 bit render target.
const SIMULATION_SHADER = `
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
  float current = height(vUv);
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
  gl_FragColor = vec4(next * 0.5 + 0.5, current * 0.5 + 0.5, 0.0, 1.0);
}
`

const COMPOSITE_SHADER = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uState;
uniform sampler2D uBackground;
uniform sampler2D uText;
uniform vec2 uTexel;
uniform vec2 uResolution;
uniform vec2 uBackgroundResolution;
uniform float uTime;
uniform float uRefraction;
uniform float uWobble;
uniform vec3 uTextColor;

float height(vec2 uv) {
  return texture2D(uState, uv).r * 2.0 - 1.0;
}

// gradient of the height field, used as a fake refraction normal
vec2 ripple(vec2 uv) {
  float dx = height(uv + vec2(uTexel.x, 0.0)) - height(uv - vec2(uTexel.x, 0.0));
  float dy = height(uv + vec2(0.0, uTexel.y)) - height(uv - vec2(0.0, uTexel.y));
  return vec2(dx, dy);
}

// "cover" fit so the still image never stretches with the viewport
vec2 coverUv(vec2 uv) {
  float canvasAspect = uResolution.x / uResolution.y;
  float imageAspect = uBackgroundResolution.x / uBackgroundResolution.y;
  vec2 scale = canvasAspect > imageAspect
    ? vec2(1.0, imageAspect / canvasAspect)
    : vec2(canvasAspect / imageAspect, 1.0);
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  vec2 distortion = ripple(vUv) * uRefraction;

  vec4 background = texture2D(uBackground, coverUv(vUv + distortion));

  vec2 textUv = vUv + distortion * 0.6;
  textUv.x += sin(textUv.y * 9.0 + uTime * 1.1) * uWobble;
  textUv.y += sin(textUv.x * 7.0 + uTime * 0.8) * uWobble * 0.6;
  float text = texture2D(uText, textUv).a;

  vec3 color = mix(background.rgb, uTextColor, text);
  // highlight the wave crests so the surface reads as water
  color += length(distortion) * 3.0 * vec3(0.55, 0.75, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`

const SIM_SCALE = 0.5

const compile = (gl, type, source) => {
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

const createProgram = (gl, fragmentSource) => {
  const program = gl.createProgram()
  const vertex = compile(gl, gl.VERTEX_SHADER, QUAD_VERTEX_SHADER)
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

const createTarget = (gl, width, height) => {
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

const uploadCanvasTexture = (gl, texture, source) => {
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
}

// '#rrggbb' -> normalized rgb triplet
const parseColor = (value) => {
  const hex = value.replace('#', '')
  const full =
    hex.length === 3
      ? hex
          .split('')
          .map((char) => char + char)
          .join('')
      : hex
  const int = parseInt(full, 16)
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255]
}

const drawTextCanvas = ({ text, color, fontSize, offsetY, width, height }) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, width, height)
  context.fillStyle = color
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.font = `700 ${fontSize}px Poppins, Montserrat, sans-serif`
  context.letterSpacing = `${fontSize * 0.02}px`
  context.fillText(text.toUpperCase(), width / 2, height * offsetY)
  return canvas
}

const WaterRipple = ({
  imageUrl,
  frameUrls,
  progress = 0,
  text = '',
  textColor = '#ffffff',
  fontSize = 220,
  textOffsetY = 0.3,
  refraction = 0.12,
  wobble = 0.005,
  className = '',
}) => {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const progressRef = useRef(progress)
  progressRef.current = progress

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    const simulationProgram = createProgram(gl, SIMULATION_SHADER)
    const compositeProgram = createProgram(gl, COMPOSITE_SHADER)
    if (!simulationProgram || !compositeProgram) return

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)

    const bindQuad = (program) => {
      const location = gl.getAttribLocation(program, 'aPosition')
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.enableVertexAttribArray(location)
      gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0)
    }

    const backgroundTexture = gl.createTexture()
    const textTexture = gl.createTexture()
    const backgroundResolution = [1, 1]
    const textRgb = parseColor(textColor)
    let disposed = false

    let targets = []
    let read = 0
    let dpr = 1
    let frame = 0
    let time = 0
    const pointer = { x: 0.5, y: 0.5, strength: 0, active: false }

    const resize = () => {
      if (disposed) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { width, height } = container.getBoundingClientRect()
      if (!width || !height) return
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)

      const simWidth = Math.max(2, Math.round(canvas.width * SIM_SCALE))
      const simHeight = Math.max(2, Math.round(canvas.height * SIM_SCALE))
      targets.forEach((target) => {
        gl.deleteTexture(target.texture)
        gl.deleteFramebuffer(target.framebuffer)
      })
      targets = [createTarget(gl, simWidth, simHeight), createTarget(gl, simWidth, simHeight)]

      if (text) {
        uploadCanvasTexture(
          gl,
          textTexture,
          drawTextCanvas({
            text,
            color: textColor,
            fontSize: fontSize * dpr,
            offsetY: textOffsetY,
            width: canvas.width,
            height: canvas.height,
          }),
        )
      }
    }

    let uploadedFrame = -1
    const frames = frameUrls
      ? frameUrls.map((url) => {
          const frame = new Image()
          frame.src = url
          return frame
        })
      : []

    // frames arrive as the sequence downloads, so upload whichever one the
    // scroll progress currently points at and only when it actually changes
    const syncFrame = () => {
      const index = Math.min(
        Math.floor(progressRef.current * (frames.length - 1)),
        frames.length - 1,
      )
      if (index === uploadedFrame) return
      const frame = frames[index]
      if (!frame || !frame.complete || !frame.naturalWidth) return
      uploadedFrame = index
      backgroundResolution[0] = frame.naturalWidth
      backgroundResolution[1] = frame.naturalHeight
      uploadCanvasTexture(gl, backgroundTexture, frame)
    }

    if (imageUrl) {
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.src = imageUrl
      image.onload = () => {
        if (disposed) return
        backgroundResolution[0] = image.naturalWidth
        backgroundResolution[1] = image.naturalHeight
        uploadCanvasTexture(gl, backgroundTexture, image)
      }
    }

    if (!text)
      uploadCanvasTexture(
        gl,
        textTexture,
        drawTextCanvas({
          text: '',
          color: '#000',
          fontSize: 1,
          offsetY: 0.5,
          width: 2,
          height: 2,
        }),
      )

    const onPointerMove = (event) => {
      const rect = container.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = 1 - (event.clientY - rect.top) / rect.height
      if (x < 0 || x > 1 || y < 0 || y > 1) {
        pointer.active = false
        return
      }
      pointer.active = true
      pointer.x = x
      pointer.y = y
      pointer.strength = 0.14
    }

    const step = () => {
      const simulation = targets[read]
      const output = targets[1 - read]

      gl.bindFramebuffer(gl.FRAMEBUFFER, output.framebuffer)
      gl.viewport(0, 0, output.width, output.height)
      gl.useProgram(simulationProgram)
      bindQuad(simulationProgram)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, simulation.texture)
      gl.uniform1i(gl.getUniformLocation(simulationProgram, 'uState'), 0)
      gl.uniform2f(
        gl.getUniformLocation(simulationProgram, 'uTexel'),
        1 / output.width,
        1 / output.height,
      )
      gl.uniform2f(gl.getUniformLocation(simulationProgram, 'uPointer'), pointer.x, pointer.y)
      gl.uniform1f(
        gl.getUniformLocation(simulationProgram, 'uPointerStrength'),
        pointer.active ? pointer.strength : 0,
      )
      gl.uniform1f(gl.getUniformLocation(simulationProgram, 'uPointerRadius'), 0.035)
      gl.uniform1f(gl.getUniformLocation(simulationProgram, 'uDamping'), 0.994)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      read = 1 - read
      pointer.strength *= 0.82

      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.useProgram(compositeProgram)
      bindQuad(compositeProgram)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, targets[read].texture)
      gl.uniform1i(gl.getUniformLocation(compositeProgram, 'uState'), 0)
      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, backgroundTexture)
      gl.uniform1i(gl.getUniformLocation(compositeProgram, 'uBackground'), 1)
      gl.activeTexture(gl.TEXTURE2)
      gl.bindTexture(gl.TEXTURE_2D, textTexture)
      gl.uniform1i(gl.getUniformLocation(compositeProgram, 'uText'), 2)
      gl.uniform2f(
        gl.getUniformLocation(compositeProgram, 'uTexel'),
        1 / targets[read].width,
        1 / targets[read].height,
      )
      gl.uniform2f(
        gl.getUniformLocation(compositeProgram, 'uResolution'),
        canvas.width,
        canvas.height,
      )
      gl.uniform2f(
        gl.getUniformLocation(compositeProgram, 'uBackgroundResolution'),
        backgroundResolution[0],
        backgroundResolution[1],
      )
      gl.uniform1f(gl.getUniformLocation(compositeProgram, 'uTime'), time)
      gl.uniform1f(gl.getUniformLocation(compositeProgram, 'uRefraction'), refraction)
      gl.uniform1f(gl.getUniformLocation(compositeProgram, 'uWobble'), wobble)
      gl.uniform3f(
        gl.getUniformLocation(compositeProgram, 'uTextColor'),
        textRgb[0],
        textRgb[1],
        textRgb[2],
      )
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const render = (now) => {
      time = now / 1000
      if (frames.length) syncFrame()
      step()
      frame = requestAnimationFrame(render)
    }

    resize()
    frame = requestAnimationFrame(render)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      targets.forEach((target) => {
        gl.deleteTexture(target.texture)
        gl.deleteFramebuffer(target.framebuffer)
      })
      gl.deleteTexture(backgroundTexture)
      gl.deleteTexture(textTexture)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(simulationProgram)
      gl.deleteProgram(compositeProgram)
    }
  }, [imageUrl, frameUrls, text, textColor, fontSize, textOffsetY, refraction, wobble])

  return (
    <div ref={containerRef} className={`w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default WaterRipple
