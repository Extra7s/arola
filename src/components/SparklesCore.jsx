import { useEffect, useRef } from 'react'

const SparklesCore = ({
  className = '',
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 1200,
  particleColor = '#FFFFFF',
}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let frame
    let particles = []

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.max(8, Math.round((width * height * particleDensity) / 1e6))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: minSize + Math.random() * (maxSize - minSize),
        opacity: Math.random(),
        speed: 0.005 + Math.random() * 0.02,
      }))
    }

    const render = () => {
      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = particleColor
      for (const particle of particles) {
        particle.opacity += particle.speed
        if (particle.opacity > 1 || particle.opacity < 0) particle.speed *= -1
        ctx.globalAlpha = Math.max(0, Math.min(1, particle.opacity))
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
        ctx.fill()
      }
      frame = requestAnimationFrame(render)
    }

    resize()
    render()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [minSize, maxSize, particleDensity, particleColor])

  return <canvas ref={canvasRef} className={className} />
}

export default SparklesCore
