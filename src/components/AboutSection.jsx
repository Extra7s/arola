import ScrollRevealText from './ScrollRevealText'

const ABOUT_TEXT =
  'In the high silence of the Himalayas, where earth rises above the clouds and time moves slowly, Arola begins. Before cities. Before industry. Before compromise. High in Nepal, near the presence of Mount Everest, snow rests for years in air that is thin, clean, and untouched. When it melts, gravity carries it through layers of ancient Himalayan rock, a natural filtration process shaped over millions of years. By the time it reaches the spring, it has been refined by altitude, mineralized by stone, and protected by isolation. We do not create this purity. We preserve it. Arola stands for elevation, not only in geography, but in standard.'

const AboutSection = () => (
  <div id="about" className="relative flex flex-col gap-0 overflow-x-hidden">
    <section className="flex flex-col px-0 relative h-auto">
      <div className="w-screen h-auto lg:h-screen flex flex-col lg:flex-row justify-center items-center">
        <video
          src="/videos/woman-drinking-2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="lg:w-1/2 h-[50vh] lg:h-full object-cover object-top pointer-events-none"
        />
        <div className="lg:w-1/2 bg-blue-950 h-fit lg:h-screen flex flex-col justify-center items-start py-4 md:py-8 lg:py-0 px-4 md:px-8 lg:px-20">
          <h2 className="text-2xl md:text-5xl block mb-3 text-white tracking-tight">Why Arola?</h2>
          <ScrollRevealText text={ABOUT_TEXT} pClassName="text-base!" />
        </div>
      </div>
    </section>
  </div>
)

export default AboutSection
