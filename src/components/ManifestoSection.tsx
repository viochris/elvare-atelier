import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function ManifestoSection() {
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
              start: 'top 76%',
              once: true,
            },
            defaults: { ease: 'power3.out', duration: 0.95 },
          });

          tl.from('[data-manifesto-meta]', {
            y: 16,
            autoAlpha: 0,
            duration: 0.7,
          })
            .from(
              '[data-manifesto-heading]',
              {
                y: 28,
                autoAlpha: 0,
              },
              0.12
            )
            .fromTo(
              '[data-manifesto-frame]',
              { clipPath: 'inset(100% 0% 0% 0%)' },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.15,
                ease: 'power3.inOut',
              },
              0.18
            )
            .from(
              '[data-manifesto-img]',
              {
                scale: 1.08,
                duration: 1.35,
                ease: 'power2.out',
              },
              0.18
            )
            .from(
              '[data-manifesto-copy]',
              {
                y: 22,
                autoAlpha: 0,
                stagger: 0.12,
              },
              0.38
            );
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#F5F2EC] py-24 text-[#151515] md:py-36 lg:py-44"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Left editorial column: metadata + oversized headline + quiet statement */}
          <div className="flex flex-col justify-between lg:col-span-6 lg:pr-10">
            <div>
              <p
                data-manifesto-meta
                className="mb-8 text-[11px] font-medium tracking-[0.24em] text-[#524E48] uppercase"
              >
                ATELIER NOTES · PARIS / MILAN · SEASON 2026
              </p>

              <h2
                data-manifesto-heading
                className="font-serif text-[clamp(2.75rem,5.4vw,5rem)] font-light leading-[0.95] tracking-[-0.02em] text-[#151515]"
              >
                BEYOND THE
                <span className="block italic font-normal">ORDINARY.</span>
              </h2>
            </div>

            <div className="mt-12 border-t border-[#151515]/15 pt-8 lg:mt-28">
              <blockquote
                data-manifesto-copy
                className="max-w-lg font-serif text-2xl font-normal leading-[1.35] text-[#151515] md:text-[1.75rem]"
              >
                &ldquo;Fashion is not simply what we wear. It is the language of individuality,
                the expression of identity, and the freedom to become something extraordinary.&rdquo;
              </blockquote>

              <p
                data-manifesto-copy
                className="mt-8 max-w-md text-sm leading-[1.8] text-[#383838]"
              >
                Founded on architectural restraint and tactile discipline, ÉLVARÉ ATELIER strips
                away seasonal noise. Every coat, column, and seam is proportioned to hold space
                without raising its voice.
              </p>
            </div>
          </div>

          {/* Right asymmetrical column: sculptural atelier portrait */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div
              data-manifesto-frame
              className="editorial-image-wrap aspect-[3/4] w-full bg-[#383838]"
            >
              <img
                data-manifesto-img
                src="/images/manifesto-atelier.jpg"
                alt="Sculptural warm-ivory raw silk and cashmere cape in a sunlit Parisian atelier."
                width={900}
                height={1200}
                className="h-full w-full object-cover object-center will-change-transform"
              />
            </div>

            <div
              data-manifesto-copy
              className="mt-4 flex items-center justify-between text-[11px] tracking-[0.2em] text-[#524E48] uppercase"
            >
              <span>PLATE 01 · SILHOUETTE STUDY</span>
              <span>ARCHIVE EDITION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
