import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import { useSmoothScroll, useViewportHeight } from './hooks/useSmoothScroll'

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
