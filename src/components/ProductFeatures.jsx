import { productFeatures } from '../data/catalog'

const icons = {
  truck: (
    <>
      <path d="M3 7h13v10H3z" />
      <path d="M16 10h3l2 3v4h-5z" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="17.5" cy="17.5" r="1.5" />
    </>
  ),
  shield: <path d="M12 21s-7-4.5-7-10a7 7 0 1114 0c0 5.5-7 10-7 10z" />,
  refund: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12h6M12 9v6" />
    </>
  ),
  support: <path d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4z" />,
}

const ProductFeatures = () => (
  <div className="w-full h-auto border-gray-200 px-4 md:px-8 lg:px-16 xl:px-24 bg-zinc-100">
    <div className="py-8 lg:py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {productFeatures.map((feature) => (
          <div key={feature.title} className="flex items-center gap-4 text-gray-700">
            <div className="text-primary">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                {icons[feature.icon]}
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm md:text-base">{feature.title}</p>
              <p className="text-xs md:text-sm text-gray-500">{feature.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default ProductFeatures
