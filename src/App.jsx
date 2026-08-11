import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useSmoothScroll, useViewportHeight } from './hooks/useSmoothScroll'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'

const App = () => {
  const lenis = useSmoothScroll()
  const { pathname } = useLocation()
  useViewportHeight()

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [pathname, lenis])

  return (
    <div className="relative">
      <Navbar lenis={lenis} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
      </Routes>
    </div>
  )
}

export default App
