export const catalog = [
  {
    id: 1,
    slug: 'black-water-bottle',
    name: 'Black Water',
    category: 'Black Water',
    image: '/images/product/blue-spring-bottle/black-water-bottle.png',
    size: '750ml',
    price: 50,
    desc: 'Insulated stainless steel bottle built to keep water pure, cold and protected all day.',
  },
  {
    id: 2,
    slug: 'white-water-bottle',
    name: 'Sparkling Water',
    category: 'White Water',
    image: '/images/product/blue-spring-bottle/white-water.png',
    size: '1L',
    price: 100,
    desc: 'Crisp carbonated water bottled in premium glass for a clean, lively finish.',
  },
  {
    id: 3,
    slug: 'blue-spring-water-bottle',
    name: 'Blue Spring',
    category: 'Spring Water',
    image: '/images/product/blue-spring-bottle/blue-spring-bottle-front.png',
    size: '500ml',
    price: 3,
    desc: 'Multi-stage filtered and UV treated drinking water for everyday hydration.',
  },
  {
    id: 4,
    slug: 'nature-sip-water-bottle',
    name: 'Nature Sip',
    category: 'Mineral Water',
    image: '/images/product/nature-sip-bottle/nature-sip-bottle.png',
    size: '430ml',
    price: 4,
    desc: 'Naturally sourced water, purified and sealed for a smooth, refreshing taste.',
  },
  {
    id: 5,
    slug: 'peak-flow-water-bottle',
    name: 'Peak Flow',
    category: 'Mineral Water',
    image: '/images/product/peak-flow-bottle/peak-flow-bottle.png',
    size: '500ml',
    price: 5,
    desc: 'Natural mineral water with a balanced mineral profile for active days.',
  },
  {
    id: 6,
    slug: 'snow-drop-blue-water-bottle',
    name: 'Snow Drop Blue',
    category: 'Premium Glass',
    image: '/images/product/snow-drop-blue-bottle/snow-drop-blue-bottle.png',
    size: '1L',
    price: 500,
    desc: 'Fine-bubble sparkling water in an elegant glass bottle for the table.',
  },
]

export const collectionCards = catalog.map(({ name, slug, image, price }) => ({
  title: name,
  href: `/products/${slug}`,
  image,
  price,
}))

export const productFeatures = [
  { title: 'Free Shipping', text: 'On all orders over $99', icon: 'truck' },
  { title: 'Secure Payment', text: 'We ensure secure payment', icon: 'shield' },
  { title: '100% Money Back', text: '30 days return policy', icon: 'refund' },
  { title: 'Online Support', text: '24/7 dedicated support', icon: 'support' },
]

export const frameSequenceUrls = Array.from(
  { length: 239 },
  (_, index) => `/images/frame-seq/${index + 1}.webp`,
)
