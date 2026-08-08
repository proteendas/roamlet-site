import {useEffect} from 'react';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';

import {Footer} from './components/Footer';
import {Nav} from './components/Nav';
import {Contact} from './pages/Contact';
import {Home} from './pages/Home';
import {WhatsNew} from './pages/WhatsNew';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <div className="grain relative min-h-screen">
        <Nav />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/whats-new" element={<WhatsNew />} />
            <Route path="/contact" element={<Contact />} />
            {/* Anything else is the landing page — a marketing site should never 404. */}
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

/**
 * Router navigation does not move the scroll position by itself, and an anchor
 * like `/#features` arriving from another route lands before the section has
 * mounted. This handles both: top on a plain route change, the anchor once the
 * new page has painted.
 */
function ScrollManager() {
  const {pathname, hash} = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({top: 0, behavior: 'auto'});
      return;
    }
    const id = hash.slice(1);
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
