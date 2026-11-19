import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { trapFocusInContainer } from '../utils/focusTrap';

const NAV_LINKS = [
  { label: 'COLLECTION', href: '#collection' },
  { label: 'CAMPAIGN', href: '#campaign' },
  { label: 'ABOUT', href: '#about' },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (mobileOpen) {
      wasOpenRef.current = true;
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        menuButtonRef.current?.focus();
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40 bg-transparent text-[#FFFFFF]">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-12 lg:px-16">
          <a
            href="#hero"
            className="font-serif text-lg tracking-[0.26em] uppercase transition-opacity hover:opacity-75 md:text-xl"
          >
            ÉLVARÉ ATELIER
          </a>

          <nav aria-label="Primary navigation" className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-2 text-[11px] font-medium tracking-[0.22em] uppercase transition-opacity hover:opacity-65"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center md:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          ref={drawerRef}
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          onKeyDown={(e) => trapFocusInContainer(e, drawerRef.current)}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#151515] px-6 py-8 text-[#F5F2EC] md:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="font-serif text-lg tracking-[0.26em] uppercase">
              ÉLVARÉ ATELIER
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[#F5F2EC]"
            >
              <X className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile sections" className="flex flex-col gap-6">
            <a
              href="#hero"
              onClick={handleLinkClick}
              className="border-b border-[#A6A39E]/20 pb-4 font-serif text-3xl tracking-[0.06em] uppercase"
            >
              Maison
            </a>
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="border-b border-[#A6A39E]/20 pb-4 font-serif text-3xl tracking-[0.06em] uppercase"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <p className="text-[11px] tracking-[0.22em] text-[#A6A39E] uppercase">
            PARIS · MILAN · SEASON 2026
          </p>
        </div>
      )}
    </>
  );
}
