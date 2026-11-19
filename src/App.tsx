import { useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { COLLECTION_LOOKS, type LookItem } from './data/looks';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { CollectionSection } from './components/CollectionSection';
import { CampaignSection } from './components/CampaignSection';
import { PhilosophySection } from './components/PhilosophySection';
import { Footer } from './components/Footer';
import { LookDrawer } from './components/LookDrawer';
import { ContactModal } from './components/ContactModal';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function App() {
  const [selectedLookIndex, setSelectedLookIndex] = useState<number | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactLook, setContactLook] = useState('');

  const handleSelectLook = useCallback((look: LookItem) => {
    const idx = COLLECTION_LOOKS.findIndex((item) => item.id === look.id);
    if (idx !== -1) {
      setSelectedLookIndex(idx);
    }
  }, []);

  const handleCloseLook = useCallback(() => {
    setSelectedLookIndex(null);
  }, []);

  const handlePrevLook = useCallback(() => {
    setSelectedLookIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + COLLECTION_LOOKS.length) % COLLECTION_LOOKS.length;
    });
  }, []);

  const handleNextLook = useCallback(() => {
    setSelectedLookIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % COLLECTION_LOOKS.length;
    });
  }, []);

  const handleOpenContact = useCallback((lookLabel = '') => {
    setSelectedLookIndex(null);
    setContactLook(lookLabel);
    setContactOpen(true);
  }, []);

  const activeLook =
    selectedLookIndex !== null ? (COLLECTION_LOOKS[selectedLookIndex] ?? null) : null;

  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) {
        ScrollTrigger.refresh();
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F2EC] text-[#151515]">
      <Navbar />

      <main>
        <HeroSection />
        <ManifestoSection />
        <CollectionSection onSelectLook={handleSelectLook} />
        <CampaignSection />
        <PhilosophySection onOpenContact={() => handleOpenContact()} />
      </main>

      <Footer onOpenContact={() => handleOpenContact()} />

      <LookDrawer
        look={activeLook}
        totalLooks={COLLECTION_LOOKS.length}
        currentIndex={selectedLookIndex ?? 0}
        onClose={handleCloseLook}
        onPrev={handlePrevLook}
        onNext={handleNextLook}
        onRequestAppointment={(lookTitle) => handleOpenContact(lookTitle)}
      />

      <ContactModal
        isOpen={contactOpen}
        initialLook={contactLook}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}

export default App;
