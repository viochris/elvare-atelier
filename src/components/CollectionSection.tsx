import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { COLLECTION_LOOKS, type LookItem } from '../data/looks';

gsap.registerPlugin(ScrollTrigger);

interface CollectionSectionProps {
  readonly onSelectLook: (look: LookItem) => void;
}

const LOOK_PLACEMENT: readonly string[] = [
  'lg:col-span-6 lg:pr-8',
  'lg:col-span-5 lg:col-start-8 lg:mt-24',
  'lg:col-span-5 lg:col-start-2 lg:mt-10',
  'lg:col-span-6 lg:col-start-7 lg:-mt-8',
];

export function CollectionSection({ onSelectLook }: CollectionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const reduceMotion = context.conditions?.['reduceMotion'] ?? false;
          if (reduceMotion) return;

          gsap.from('[data-collection-header]', {
            y: 24,
            autoAlpha: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '[data-collection-header]',
              start: 'top 84%',
              once: true,
            },
          });

          const items = gsap.utils.toArray<HTMLElement>('[data-look-article]');
          items.forEach((item) => {
            const frame = item.querySelector('[data-look-frame]');
            const meta = item.querySelector('[data-look-meta]');

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                once: true,
              },
            });

            if (frame) {
              tl.fromTo(
                frame,
                { clipPath: 'inset(100% 0% 0% 0%)' },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  duration: 1.05,
                  ease: 'power3.inOut',
                }
              );
            }

            if (meta) {
              tl.from(
                meta,
                {
                  y: 16,
                  autoAlpha: 0,
                  duration: 0.7,
                  ease: 'power2.out',
                },
                '-=0.55'
              );
            }
          });
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="bg-[#151515] py-24 text-[#F5F2EC] md:py-36 lg:py-44"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div
          data-collection-header
          className="mb-16 flex flex-col justify-between gap-8 border-b border-[#A6A39E]/20 pb-10 md:mb-24 lg:flex-row lg:items-end"
        >
          <div>
            <p className="mb-4 text-[11px] font-medium tracking-[0.24em] text-[#A6A39E] uppercase">
              READY-TO-WEAR ARCHIVE · FOUR SILHOUETTES
            </p>
            <h2 className="font-serif text-[clamp(2.35rem,4.8vw,4.5rem)] font-light leading-[0.98] tracking-[-0.02em] text-[#FFFFFF]">
              THE NEW PERSPECTIVE — 2026
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-[1.75] text-[#A6A39E]">
            Select any silhouette to inspect atelier pattern architecture, textile origin, and
            private fitting availability.
          </p>
        </div>

        {/* Asymmetrical editorial lookbook grid with varied proportions and negative space */}
        <div className="grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-10 lg:grid-cols-12 lg:gap-y-24">
          {COLLECTION_LOOKS.map((look, index) => (
            <article
              key={look.id}
              data-look-article
              className={LOOK_PLACEMENT[index] ?? 'lg:col-span-6'}
            >
              <button
                type="button"
                onClick={() => onSelectLook(look)}
                aria-label={`Inspect ${look.number}: ${look.title}`}
                className="group block w-full text-left"
              >
                <div
                  data-look-frame
                  className={`editorial-image-wrap relative w-full bg-[#222222] ${look.aspectClass}`}
                >
                  <img
                    src={look.image}
                    alt={look.alt}
                    width={look.width}
                    height={look.height}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#151515]/85 via-[#151515]/35 to-transparent px-6 pb-5 pt-14 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <span className="text-[11px] font-medium tracking-[0.22em] text-[#FFFFFF] uppercase">
                      VIEW LOOK DOSSIER
                    </span>
                    <span className="text-[11px] tracking-[0.2em] text-[#F5F2EC] uppercase">
                      {look.number}
                    </span>
                  </div>
                </div>

                <div data-look-meta className="mt-5 border-t border-[#A6A39E]/20 pt-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="text-[11px] font-medium tracking-[0.24em] text-[#A6A39E] uppercase">
                      {look.number}
                    </span>
                    <span className="text-[11px] tracking-[0.18em] text-[#A6A39E] uppercase">
                      {look.collection}
                    </span>
                  </div>

                  <h3 className="mt-2 font-serif text-2xl font-normal tracking-[0.01em] text-[#FFFFFF] transition-colors group-hover:text-[#F5F2EC] md:text-[1.85rem]">
                    {look.title}
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-[1.7] text-[#A6A39E]">
                    {look.editorialNote}
                  </p>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
