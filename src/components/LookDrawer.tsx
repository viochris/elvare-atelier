import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { type LookItem } from '../data/looks';
import { trapFocusInContainer } from '../utils/focusTrap';

interface LookDrawerProps {
  readonly look: LookItem | null;
  readonly totalLooks: number;
  readonly currentIndex: number;
  readonly onClose: () => void;
  readonly onPrev: () => void;
  readonly onNext: () => void;
  readonly onRequestAppointment: (lookTitle: string) => void;
}

export function LookDrawer({
  look,
  totalLooks,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onRequestAppointment,
}: LookDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!look || !dialogRef.current) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          dialogRef.current,
          { x: 24, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.35, ease: 'power3.out' }
        );
      });
    },
    { dependencies: [look?.id], scope: dialogRef }
  );

  useEffect(() => {
    if (!look) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        onPrev();
      } else if (event.key === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [look, onClose, onPrev, onNext]);

  if (!look) return null;

  const formattedCurrent = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalLooks).padStart(2, '0');

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#151515]/80"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="look-drawer-title"
        onKeyDown={(e) => trapFocusInContainer(e, dialogRef.current)}
        className="flex h-full w-full max-w-4xl flex-col overflow-y-auto bg-[#F5F2EC] text-[#151515] md:grid md:grid-cols-12 md:overflow-hidden"
      >
        {/* Left photographic column */}
        <div className="relative shrink-0 bg-[#151515] md:col-span-6 md:h-full">
          <img
            src={look.image}
            alt={look.alt}
            width={look.width}
            height={look.height}
            className="h-[46svh] max-h-[420px] w-full object-cover object-top md:h-full md:max-h-none"
          />
        </div>

        {/* Right dossier details */}
        <div className="flex flex-col justify-between p-6 md:col-span-6 md:h-full md:overflow-y-auto md:p-8 lg:p-10">
          <div>
            <div className="flex items-center justify-between border-b border-[#151515]/15 pb-4">
              <span className="text-[11px] font-medium tracking-[0.24em] text-[#524E48] uppercase">
                {look.number} OF {formattedTotal} · {look.collection}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close look dossier"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-end text-[#151515] transition-opacity hover:opacity-65"
              >
                <X className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
              </button>
            </div>

            <h2
              id="look-drawer-title"
              className="mt-5 font-serif text-3xl font-light tracking-[-0.01em] text-[#151515] md:text-[2.15rem]"
            >
              {look.title}
            </h2>

            <p className="mt-3 text-sm leading-[1.7] text-[#383838]">{look.editorialNote}</p>

            <dl className="mt-5 space-y-4 border-t border-[#151515]/15 pt-4 text-sm">
              <div>
                <dt className="text-[11px] font-medium tracking-[0.22em] text-[#524E48] uppercase">
                  SILHOUETTE ARCHITECTURE
                </dt>
                <dd className="mt-1 leading-[1.6] text-[#151515]">{look.silhouette}</dd>
              </div>

              <div>
                <dt className="text-[11px] font-medium tracking-[0.22em] text-[#524E48] uppercase">
                  TEXTILE COMPOSITION
                </dt>
                <dd className="mt-1 leading-[1.6] text-[#151515]">{look.fabric}</dd>
              </div>

              <div>
                <dt className="text-[11px] font-medium tracking-[0.22em] text-[#524E48] uppercase">
                  ATELIER EXECUTION
                </dt>
                <dd className="mt-1 leading-[1.6] text-[#151515]">{look.craftDetail}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 border-t border-[#151515]/15 pt-5">
            <button
              type="button"
              onClick={() => onRequestAppointment(`${look.number}: ${look.title}`)}
              className="w-full min-h-[48px] bg-[#151515] px-6 py-3.5 text-[11px] font-medium tracking-[0.22em] text-[#FFFFFF] uppercase transition-colors hover:bg-[#383838]"
            >
              REQUEST PRIVATE FITTING
            </button>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous look"
                className="inline-flex min-h-[44px] items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-[#151515] uppercase transition-opacity hover:opacity-65"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
                PREVIOUS
              </button>

              <span className="text-[11px] tracking-[0.2em] text-[#524E48]">
                {formattedCurrent} / {formattedTotal}
              </span>

              <button
                type="button"
                onClick={onNext}
                aria-label="Next look"
                className="inline-flex min-h-[44px] items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-[#151515] uppercase transition-opacity hover:opacity-65"
              >
                NEXT
                <ChevronRight className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
