import { useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import WaterRipple from './WaterRipple'
import { frameSequenceUrls } from '../data/catalog'
import { useResponsive } from '../hooks/useResponsive'

const FrameSequence = () => {
  const scopeRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const { isSmallerDevice } = useResponsive()

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
          <WaterRipple frameUrls={frameSequenceUrls} progress={progress} />
        )}
      </div>
    </div>
  )
}

export default FrameSequence
