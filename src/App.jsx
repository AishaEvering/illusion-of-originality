import { useEffect} from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import CustomCursor from "./components/CustomCursor"
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import Illusion from "./components/sections/Illusion";
import Pipeline from "./components/sections/Pipeline";
import Timeline from "./components/sections/Timeline";
import Actors from "./components/sections/Actors";
import Rules from "./components/sections/Rules";
import Impacts from "./components/sections/Impacts";
import ChangeSection from "./components/sections/ChangeSection";
import Sources from "./components/sections/Sources";
import ProgressBar from "./components/ProgressBar"

function App() {

  useEffect(() => {
    //Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Refresh ScrollTrigger when the page is fully Loaded
    ScrollTrigger.refresh()

    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-night text-ink">
      <CustomCursor />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 space-y-32 py-16">
        <Hero />
        <Illusion />
        <Pipeline />
        <Timeline />
        <Actors />
        <Rules />
        <Impacts />
        <ChangeSection />
        <Sources />
        {/* <ProgressBar /> */}
      </main>
    </div>
  );
}

export default App;