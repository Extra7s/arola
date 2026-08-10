import { useEffect, useState } from 'react'
import { useResponsive } from '../hooks/useResponsive'
import { navLinks } from '../data/products'

const Navbar = ({ lenis }) => {
  const { isSmallerDevice } = useResponsive()
  const [visible, setVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!lenis) return
    return lenis.on('scroll', ({ scroll, direction }) => {
      if (scroll < 100) setVisible(true)
      else if (direction === 1) setVisible(false)
      else if (direction === -1) setVisible(true)
    })
  }, [lenis])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  return (
    <nav
      id="navbarSection"
      className={`fixed py-2 xl:py-4 w-screen z-1000 transition-all duration-500 ease-in-out bg-white ${
        visible || menuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center relative w-full">
        {isSmallerDevice ? (
          <div className="grid grid-cols-3 items-center w-full h-full relative">
            <div />
            <div className="flex justify-center items-center">
              <a href="/">
                <img src="/lightLogo.png" alt="Arola logo" className="w-14 md:w-16 object-contain" />
              </a>
            </div>
            <div className="flex justify-end items-center pr-4">
              <button
                onClick={() => setMenuOpen((open) => !open)}
                className="z-1001 p-2 focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                <div className="relative w-6 h-5 flex flex-col justify-between overflow-hidden">
                  <span
                    className={`w-full h-0.5 block bg-primary transition-transform duration-300 ${
                      menuOpen ? 'rotate-45 translate-y-[9px]' : ''
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 block bg-primary transition-all duration-300 ${
                      menuOpen ? 'opacity-0 translate-x-5' : ''
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 block bg-primary transition-transform duration-300 ${
                      menuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="hidden w-full lg:flex justify-center items-center gap-12 xl:gap-16">
            <ul className="flex items-center gap-8">
              {navLinks.slice(0, 2).map((link) => (
                <li key={link.id}>
                  <a
                    href={link.path}
                    className={`transition-colors duration-300 ${
                      link.path === '/' ? 'text-primary font-bold' : 'text-black'
                    }`}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
            <a className="shrink-0" href="/">
              <img
                src="/lightLogo.png"
                alt="Arola logo"
                className="w-16 md:w-20 xl:w-24 object-contain"
              />
            </a>
            <ul className="flex items-center gap-8">
              {navLinks.slice(2).map((link) => (
                <li key={link.id}>
                  <a href={link.path} className="transition-colors duration-300 text-black">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {isSmallerDevice && menuOpen && (
        <div className="fixed inset-0 top-full bg-white z-1000 flex flex-col items-center gap-8 pt-16">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.path}
              className="text-primary text-xl uppercase tracking-widest"
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
