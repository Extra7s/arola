import { Link, useParams } from 'react-router-dom'
import { catalog } from '../data/catalog'

const ProductDetail = () => {
  const { slug } = useParams()
  const product = catalog.find((item) => item.slug === slug)

  if (!product) {
    return (
      <div className="min-h-screen px-6 py-12 lg:px-24 bg-white text-slate-900 flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <p className="max-w-xl text-center text-base text-slate-700">
          We could not find the product you are looking for. Please return to the products page and try again.
        </p>
        <Link to="/products" className="text-primary underline">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-white text-slate-900 px-6 py-12 lg:px-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
        <div className="flex-1 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-[1.5rem] object-contain"
          />
        </div>

        <div className="flex-1 space-y-6">
          <Link to="/products" className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            ← Back to Products
          </Link>
          <div className="space-y-3">
            <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold sm:text-5xl">{product.name}</h1>
            <p className="text-xl text-slate-700">{product.desc}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-100 p-6">
              <h2 className="text-sm uppercase tracking-[0.2em] text-slate-500">Price</h2>
              <p className="mt-3 text-3xl font-bold text-slate-900">${product.price}</p>
            </div>
            <div className="rounded-3xl bg-slate-100 p-6">
              <h2 className="text-sm uppercase tracking-[0.2em] text-slate-500">Size</h2>
              <p className="mt-3 text-3xl font-bold text-slate-900">{product.size}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Browse other products
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
