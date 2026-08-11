import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { frameSequenceUrls } from '../data/catalog'
import { useResponsive } from '../hooks/useResponsive'

const drawCover = (canvas, image) => {
  const context = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const { width, height } = canvas.getBoundingClientRect()

  if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
  }

  const scale = Math.max(canvas.width / image.width, canvas.height / image.height)
  const drawWidth = image.width * scale
  const drawHeight = image.height * scale

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.drawImage(
    image,
    (canvas.width - drawWidth) / 2,
    (canvas.height - drawHeight) / 2,
    drawWidth,
    drawHeight,
  )
}

const FrameSequence = () => {
  const scopeRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const progressRef = useRef(0)
  const [progress, setProgress] = useState(0)
  const { isSmallerDevice } = useResponsive()

  useEffect(() => {
    let cancelled = false

    imagesRef.current = frameSequenceUrls.map((url, index) => {
      const image = new Image()
      image.src = url
      image.onload = () => {
        if (!cancelled && index === 0 && canvasRef.current) drawCover(canvasRef.current, image)
      }
      return image
    })

    return () => {
      cancelled = true
      imagesRef.current = []
    }
  }, [])

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const frames = imagesRef.current
      const index = Math.min(Math.floor(progressRef.current * (frames.length - 1)), frames.length - 1)
      const image = frames[index]
      if (image && image.complete && image.naturalWidth) drawCover(canvas, image)
    }

    render()
    window.addEventListener('resize', render)
    return () => window.removeEventListener('resize', render)
  }, [progress])

  useGSAP(
    () => {
      const trigger = ScrollTrigger.create({
        trigger: scopeRef.current,
        start: 'top top',
        end: `+=${15 * frameSequenceUrls.length}`,
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress
          setProgress((current) =>
            Math.abs(current - self.progress) < 0.001 ? current : self.progress,
          )
        },
      })

      const timer = setTimeout(() => ScrollTrigger.refresh(), 200)

      return () => {
        clearTimeout(timer)
        trigger.kill(true)
      }
    },
    { scope: scopeRef },
  )

  const activeFrame =
    frameSequenceUrls[
      Math.min(Math.floor(progress * (frameSequenceUrls.length - 1)), frameSequenceUrls.length - 1)
    ]

  return (
    <div className="relative">
      <div
        style={{ opacity: progress > 0.1 ? 0 : 1 }}
        className="absolute -top-px left-0 w-full h-40 bg-linear-to-b from-white via-transparent to-transparent z-45 transition-opacity duration-300"
      />
      <div className="absolute inset-0 w-full h-full bg-linear-to-t from-[#164466] via-transparent via-5% to-transparent z-45" />
      <div
        ref={scopeRef}
        className="relative w-full overflow-hidden px-0 z-10 min-h-screen"
        style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
      >
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white z-40 text-nowrap transition-opacity duration-300 pointer-events-none uppercase tracking-widest text-xs font-semibold"
          style={{ opacity: progress > 0.9 ? 0 : 1 }}
        >
          Scroll down
        </div>
        {isSmallerDevice ? (
          <div className="w-full h-full relative">
            <img
              src={activeFrame}
              alt="Water bottle sequence"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full overflow-hidden">
            <canvas ref={canvasRef} className="block w-full h-full" />
          </div>
        )}
      </div>
    </div>
  )
}

export default FrameSequence
