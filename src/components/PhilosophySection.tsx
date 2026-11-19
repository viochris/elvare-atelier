import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface PhilosophySectionProps {
  readonly onOpenContact: () => void;
}

export function PhilosophySection({ onOpenContact }: PhilosophySectionProps) {
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

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 74%',
              once: true,
            },
          });

          tl.fromTo(
            '[data-philosophy-frame]',
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.15,
              ease: 'power3.inOut',
            }
          )
            .from(
              '[data-philosophy-img]',
              {
                scale: 1.07,
                duration: 1.35,
                ease: 'power2.out',
              },
              0
            )
            .from(
              '[data-philosophy-copy]',
              {
                y: 26,
                autoAlpha: 0,
                stagger: 0.12,
                duration: 0.9,
                ease: 'power3.out',
              },
              0.22
            );
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="bg-[#F5F2EC] py-24 text-[#151515] md:py-36 lg:py-48"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Left architectural fashion portrait */}
          <div className="lg:col-span-5">
            <div
              data-philosophy-frame
              className="editorial-image-wrap aspect-[3/4] w-full bg-[#383838]"
            >
              <img
                data-philosophy-img
                src="/images/philosophy-portrait.jpg"
                alt="Three-quarter back profile highlighting the sculptural collar and center back seam of an ivory double-faced cashmere coat."
                width={900}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover object-center will-change-transform"
              />
            </div>
          </div>

          {/* Right oversized statement with generous negative space */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p
              data-philosophy-copy
              className="mb-8 text-[11px] font-medium tracking-[0.26em] text-[#524E48] uppercase"
            >
              HOUSE PHILOSOPHY · DISCIPLINE &amp; POISE
            </p>

            <h2
              data-philosophy-copy
              className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.02em] text-[#151515]"
            >
              &ldquo;WE DO NOT FOLLOW THE MOMENT.{' '}
              <span className="italic font-normal">WE DEFINE IT.&rdquo;</span>
            </h2>

            <div
              data-philosophy-copy
              className="mt-12 flex flex-col items-start gap-8 border-t border-[#151515]/15 pt-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="max-w-xs text-sm leading-[1.8] text-[#383838]">
                Private salon viewings and bespoke fittings are hosted by appointment in Paris and
                Milan.
              </p>

              <button
                type="button"
                onClick={onOpenContact}
                className="min-h-[44px] border border-[#151515] px-7 py-3 text-[11px] font-medium tracking-[0.22em] text-[#151515] uppercase transition-colors hover:bg-[#151515] hover:text-[#FFFFFF]"
              >
                BOOK PRIVATE SALON
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
