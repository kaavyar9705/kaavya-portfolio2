import Hero from "@/components/hero";
import About from "@/components/about";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Navigation from "@/components/navigation";
import "./index.css";
import ChatBot from "./components/ChatBot";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation></Navigation>
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <ChatBot></ChatBot>
    </div>
  );
}
