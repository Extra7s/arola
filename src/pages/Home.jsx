import ScrollDownIndicator from '../components/ScrollDownIndicator'
import BottleIntro from '../components/BottleIntro'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import SunSection from '../components/SunSection'
import MountainSection from '../components/MountainSection'
import CloudHeadline from '../components/CloudHeadline'
import WaterfallSection from '../components/WaterfallSection'
import BlueSpringSection from '../components/BlueSpringSection'
import PeakFlowSection from '../components/PeakFlowSection'
import NatureSipSection from '../components/NatureSipSection'
import Footer from '../components/Footer'

const Home = () => (
  <div className="relative">
    <ScrollDownIndicator />
    <BottleIntro />
    <Hero />
    <AboutSection />
    <SunSection />
    <MountainSection />
    <CloudHeadline />
    <WaterfallSection />
    <BlueSpringSection />
    <PeakFlowSection />
    <NatureSipSection />
    <Footer />
  </div>
)

export default Home
