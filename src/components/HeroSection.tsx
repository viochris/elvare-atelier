import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function HeroSection() {
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
            defaults: { ease: 'power3.out', duration: 1.05 },
          });

          tl.from('[data-hero-image]', {
            scale: 1.06,
            duration: 1.6,
            ease: 'power2.out',
          })
            .from(
              '[data-hero-micro]',
              {
                y: 16,
                autoAlpha: 0,
                duration: 0.8,
              },
              0.25
            )
            .from(
              '[data-hero-line]',
              {
                y: 36,
                autoAlpha: 0,
                stagger: 0.14,
                duration: 1.0,
              },
              0.38
            )
            .from(
              '[data-hero-cta]',
              {
                y: 16,
                autoAlpha: 0,
                duration: 0.75,
              },
              0.72
            );
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-[#151515] text-[#FFFFFF]"
    >
      {/* Hero photograph with fetchPriority="high" and explicit intrinsic dimensions */}
      <div className="absolute inset-0">
        <img
          data-hero-image
          src="/images/hero-editorial.jpg"
          alt="Model in an architectural obsidian virgin wool trench coat inside a minimalist limestone gallery."
          width={1920}
          height={1080}
          fetchPriority="high"
          className="h-full w-full object-cover object-[72%_center] md:object-center will-change-transform"
        />
        {/* Controlled directional contrast scrim ensuring AAA legibility over photography */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#151515]/55 via-transparent to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#151515]/85 via-[#151515]/35 to-[#151515]/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#151515]/75 via-[#151515]/25 to-transparent"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-32 md:px-12 md:pb-24 lg:px-16">
        <div className="max-w-3xl">
          <p
            data-hero-micro
            className="mb-6 text-[11px] font-medium tracking-[0.26em] text-[#F5F2EC] uppercase"
          >
            A STUDY IN FORM, IDENTITY &amp; EXPRESSION.
          </p>

          <h1 className="font-serif text-[clamp(3rem,7.2vw,6.25rem)] font-light leading-[0.94] tracking-[-0.02em] text-[#FFFFFF]">
            <span data-hero-line className="block">
              THE ART OF
            </span>
            <span data-hero-line className="block italic font-normal">
              BEING DIFFERENT.
            </span>
          </h1>

          <div data-hero-cta className="mt-10 flex items-center">
            <a
              href="#collection"
              className="group inline-flex min-h-[44px] items-center border-b border-[#FFFFFF]/65 pb-1.5 text-[11px] font-medium tracking-[0.24em] text-[#FFFFFF] uppercase transition-colors hover:border-[#FFFFFF] hover:text-[#F5F2EC]"
            >
              EXPLORE THE COLLECTION.
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
