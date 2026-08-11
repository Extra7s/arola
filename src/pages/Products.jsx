import ProductShowcase from '../components/ProductShowcase'
import ProductFeatures from '../components/ProductFeatures'
import ProductCollections from '../components/ProductCollections'
import FrameSequence from '../components/FrameSequence'
import SiteFooter from '../components/SiteFooter'

const Products = () => (
  <div className="relative">
    <ProductShowcase />
    <ProductFeatures />
    <ProductCollections />
    <FrameSequence />
    <SiteFooter />
  </div>
)

export default Products
