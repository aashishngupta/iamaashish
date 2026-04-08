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
import Now from './sections/Now';
import Contact from './sections/Contact';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggle} />

      <main>
        {/* 2. Hero */}
        <Hero />

        {/* 3. About */}
        <About />

        {/* 4. Quote */}
        <QuoteBlock
          quote="PMs won't be replaced by AI. But PMs who can't think like engineers will be."
          attribution="— Aashish Kumar Gupta"
        />

        {/* 5. Work */}
        <Work />

        {/* 6. Quote */}
        <QuoteBlock
          quote="The PMs who win the next 5 years will build an agent before breakfast, write a prompt that replaces a 3-week research cycle, and walk into an engineering room and actually belong there."
          attribution="— Aashish Kumar Gupta"
        />

        {/* 6b. Recommendations */}
        <Recommendations />

        {/* 7. Thinking */}
        <Thinking />

        {/* 8. Beyond Work */}
        <BeyondWork />

        {/* 9. Quote */}
        <QuoteBlock
          quote="I grew up in a small town in Haryana with a dream at age 3 to become a CEO. That dream hasn't changed — only the scope has."
          attribution="— Aashish Kumar Gupta"
        />

        {/* 10. Achievements */}
        <Achievements />

        {/* 11. Now */}
        <Now />

        {/* 12. Contact */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}
