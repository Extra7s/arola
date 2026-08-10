import { useResponsive } from '../hooks/useResponsive'
import { springWaterLists } from '../data/products'

const BlueSpringSection = () => {
  const { isSmallerDevice } = useResponsive()
  const product = springWaterLists[0]

  return (
    <section className="w-screen h-dvh relative bg-black flex items-center justify-center overflow-x-clip">
      <img
        src="/images/home/vitaminska-bush-bottom.png"
        alt=""
        className="absolute -top-8 lg:-top-28 -left-[15%] lg:-left-[10%] w-[80%] lg:w-[40%] z-30 pointer-events-none"
      />
      <img
        src="/images/home/vitaminska-bush-bottom.png"
        alt=""
        className="absolute -top-8 lg:-top-28 -right-[10%] w-[80%] lg:w-[40%] z-30 pointer-events-none"
      />
      {!isSmallerDevice && (
        <>
          <img
            src="/images/home/vitaminska-bush-bottom.png"
            alt=""
            className="absolute -top-8 lg:-top-28 left-[12%] w-[80%] lg:w-[40%] z-30 pointer-events-none"
          />
          <img
            src="/images/home/vitaminska-bush-bottom.png"
            alt=""
            className="absolute -top-8 lg:-top-28 right-[24%] w-[80%] lg:w-[40%] z-30 pointer-events-none"
          />
        </>
      )}
      <img
        src="/images/home/lijana.png"
        alt=""
        className="absolute top-0 right-[25%] w-[10%] z-25 pointer-events-none"
      />
      {isSmallerDevice && (
        <>
          <img
            src="/images/home/banner-tree-left.webp"
            alt=""
            className="absolute -top-[20%] -left-[30%] lg:left-0 w-[70%] lg:w-1/2 h-full object-contain object-left z-7 brightness-75"
          />
          <img
            src="/images/home/banner-tree-right.webp"
            alt=""
            className="absolute -top-[20%] -right-[30%] lg:right-0 w-[70%] lg:w-1/2 h-full object-contain object-right z-7 brightness-75"
          />
        </>
      )}
      <img
        src="/images/home/banner-tree-left.webp"
        alt=""
        className="absolute -bottom-[20%] lg:bottom-0 -left-[30%] lg:left-0 w-[70%] lg:w-1/2 h-full object-contain object-left z-7 brightness-75"
      />
      <img
        src="/images/home/banner-tree-right.webp"
        alt=""
        className="absolute -bottom-[20%] lg:bottom-0 -right-[30%] lg:right-0 w-[70%] lg:w-1/2 h-full object-contain object-right z-7 brightness-75"
      />
      <img
        src="/images/home/negazirana-rock.png"
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-screen lg:w-[45vw] brightness-125 z-5"
      />
      <img
        src="/images/home/negazirana-waterfall.gif"
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[55vw] lg:w-[25vw] brightness-125 z-6"
      />
      <div className="absolute inset-0 z-40 h-full w-full flex items-center justify-center pointer-events-none mt-16">
        <div className="absolute left-1/2 -translate-x-1/2 top-[70%] whitespace-nowrap text-white">
          <h3 className="text-3xl font-bold tracking-tighter uppercase font-poppins-bold">
            {product.name}
          </h3>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[80vw] md:h-[70vh] lg:w-[40vw] h-full flex items-center justify-center pointer-events-none mt-16">
        <div className="relative flex items-center justify-center h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-contain brightness-125"
          />
        </div>
      </div>
      {isSmallerDevice && (
        <img
          src="/images/home/negazirana-bush-bottom.png"
          alt=""
          className="absolute bottom-[15%] scale-x-[-1] w-full lg:w-[45%] left-1/2 -translate-x-1/2 z-10 brightness-90 pointer-events-none"
        />
      )}
      <img
        src="/images/home/negazirana-bush-bottom.png"
        alt=""
        className="absolute -bottom-[5%] lg:-bottom-[5%] scale-[1.3] lg:scale-[1] w-full lg:w-[45%] left-1/2 -translate-x-1/2 z-30 brightness-90 pointer-events-none"
      />
    </section>
  )
}

export default BlueSpringSection
