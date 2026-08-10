import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useResponsive } from '../hooks/useResponsive'

gsap.registerPlugin(useGSAP)

const CLOUD_IMG = 'w-200 lg:w-260 h-160 lg:h-180 object-contain will-change-transform opacity-80 brightness-150'

const CloudHeadline = () => {
  const scopeRef = useRef(null)
  const { isSmallerDevice } = useResponsive()

  useGSAP(
    () => {
      gsap.to('.cloud-fg-left', { x: 100, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.cloud-fg-center', { x: -80, duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.cloud-fg-right', { x: 120, duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    },
    { scope: scopeRef },
  )

  return (
    <div
      ref={scopeRef}
      className="relative w-full h-[20.5vh] lg:h-[30.5vh] -mt-px flex justify-center pt-16 bg-white z-180 overflow-x-hidden lg:overflow-visible"
    >
      {!isSmallerDevice && (
        <>
          <div className="cloud-fg-left absolute -top-[100%] -left-[20%] w-full h-full z-180">
            <img src="/images/home/cloud4.png" alt="cloud" className={CLOUD_IMG} />
          </div>
          <div className="cloud-fg-center absolute -top-[100%] left-[20%] w-full h-full z-180">
            <img src="/images/home/cloud6.png" alt="cloud" className={CLOUD_IMG} />
          </div>
          <div className="cloud-fg-right absolute -top-[100%] -right-[40%] w-full h-full z-180">
            <img src="/images/home/cloud4.png" alt="cloud" className={CLOUD_IMG} />
          </div>
        </>
      )}

      <p className="max-w-4xl px-6 text-2xl md:text-4xl lg:text-6xl font-bold text-center text-primary z-200 relative">
        Experience Himalayan water with Arola
      </p>

      <div className="absolute -top-[20%] -left-[20%] w-full h-full z-210 cloud-fg-left">
        <img src="/images/home/cloud4.png" alt="cloud" className={CLOUD_IMG} />
      </div>
      <div className="absolute -top-[20%] left-[20%] w-full h-full z-210 cloud-fg-center">
        <img src="/images/home/cloud6.png" alt="cloud" className={CLOUD_IMG} />
      </div>
      <div className="absolute -top-[20%] -right-[40%] w-full h-full z-210 cloud-fg-right">
        <img src="/images/home/cloud4.png" alt="cloud" className={CLOUD_IMG} />
      </div>
    </div>
  )
}

export default CloudHeadline
