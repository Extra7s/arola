import { Link } from 'react-router-dom'
import SparklesCore from './SparklesCore'
import WaterRipple from './WaterRipple'
import { useResponsive } from '../hooks/useResponsive'
import { footerNavGroups, navLinks } from '../data/products'

const SiteFooter = () => {
  const { isSmallerDevice } = useResponsive()

  return (
    <section
      id="footer"
      className="relative w-screen h-dvh overflow-hidden flex items-center justify-center"
    >
      {isSmallerDevice ? (
        <>
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/images/home/sea-bed-footer.png"
              alt="sea bed"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-[35%] left-1/2 -translate-x-1/2 w-full h-full flex items-center justify-center z-50">
            <p className="uppercase font-poppins-bold text-white text-7xl">arola</p>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <WaterRipple
            imageUrl="/images/home/sea-bed-footer.png"
            text="AROLA"
            fontSize={220}
            textOffsetY={0.3}
          />
        </div>
      )}

      <div className="absolute inset-0 w-full h-full bg-linear-to-b from-[#164466] via-transparent via-100% lg:via-10% to-transparent z-45" />
      <div className="absolute inset-0 w-full h-full bg-linear-to-t from-black via-transparent via-70% to-transparent z-45" />

      <div className="px-4 w-full md:px-8 lg:px-16 xl:px-24 py-8 z-50 absolute bottom-0 space-y-8 lg:space-y-16">
        <div className="flex justify-between gap-8 lg:gap-12 text-sm">
          {footerNavGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-2 w-full">
              <h4 className="font-semibold uppercase tracking-wide text-xl text-white">
                {group.title}
              </h4>
              <ul className="grid grid-cols-1 lg:grid-cols-6 gap-4 lg:gap-12 w-full">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-white hover:text-primary/50 transition-colors duration-300 uppercase"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col items-end gap-2 w-full">
            <h4 className="font-semibold uppercase tracking-wide text-xl text-white">
              Quick Links
            </h4>
            <ul className="flex flex-col lg:flex-row items-end lg:items-center lg:justify-end gap-4 lg:gap-12 w-full">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className="text-white hover:text-primary/50 transition-colors duration-300 whitespace-nowrap uppercase"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/" className="flex justify-center">
              <img src="/darkLogo.png" alt="Arola logo" className="w-16 xl:w-24 object-contain" />
            </Link>
            <p className="text-white">© 2026 AROLA.</p>
          </div>
          <div className="flex items-center gap-6 flex-wrap justify-center md:justify-end">
            <a
              href="https://webxnepal.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:opacity-90 transition"
            >
              <span className="text-white">DESIGN AND DEVELOPED BY</span>
              <div className="relative">
                <img
                  src="/images/logo/webx-logo.png"
                  alt="WebX Nepal"
                  className="h-5 lg:h-6 hover:scale-105 transition-transform"
                />
                <div className="absolute -bottom-[100%] left-1/2 -translate-x-1/2 w-full h-full z-40">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-white to-transparent h-[2px] w-[120%]" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-white to-transparent h-px w-[120%]" />
                  <SparklesCore
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={1200}
                    particleColor="#FFFFFF"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 w-full h-full mask-[radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SiteFooter
