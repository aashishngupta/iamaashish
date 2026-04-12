import { motion } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import Nav from './components/Nav';
import Footer from './components/Footer';
import QuoteBlock from './components/QuoteBlock';

import Hero from './sections/Hero';
import About from './sections/About';
import Work from './sections/Work';
import Thinking from './sections/Thinking';
import BeyondWork from './sections/BeyondWork';
import Achievements from './sections/Achievements';
import Recommendations from './sections/Recommendations';
import Expertise from './sections/Expertise';
import FeaturedBook from './components/FeaturedBook';
import Now from './sections/Now';
import Contact from './sections/Contact';

function S({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 72, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.04 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggle} />

      <main>
        {/* Hero — has its own entrance, no wrapper */}
        <Hero />

        <S><About /></S>
        <S><FeaturedBook /></S>
        <S><QuoteBlock
          quote="PMs won't be replaced by AI. But PMs who can't think like engineers will be."
          attribution="— Aashish Kumar Gupta"
        /></S>
        <S><Work /></S>
        <S><QuoteBlock
          quote="The PMs who win the next 5 years will build an agent before breakfast, write a prompt that replaces a 3-week research cycle, and walk into an engineering room and actually belong there."
          attribution="— Aashish Kumar Gupta"
        /></S>
        <S><Expertise /></S>
        <S><Recommendations /></S>
        <S><Thinking /></S>
        <S><BeyondWork /></S>
        <S><QuoteBlock
          quote="I grew up in a small town in Haryana with a dream at age 3 to become a CEO. That dream hasn't changed — only the scope has."
          attribution="— Aashish Kumar Gupta"
        /></S>
        <S><Achievements /></S>
        <S><Now /></S>
        <S><Contact /></S>
      </main>

      <Footer />
    </>
  );
}
