import Hero from "./(sections)/hero/Hero";

import About from "./(sections)/about/page";
import Projects from "./(sections)/projects/page";
import Contact from "./(sections)/contact/page";

export default function Home() {
  return (
    <main className="bg-gray-900 min-h-screen text-white">

      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}