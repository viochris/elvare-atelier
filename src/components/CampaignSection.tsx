import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function CampaignSection() {
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

          // Parallax strictly on the background image layer, never on typography
          gsap.fromTo(
            '[data-campaign-parallax]',
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          );

          gsap.from('[data-campaign-text]', {
            y: 28,
            autoAlpha: 0,
            stagger: 0.14,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 62%',
              once: true,
            },
          });
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="campaign"
      ref={sectionRef}
      className="relative flex min-h-[88svh] w-full items-center overflow-hidden bg-[#151515] text-[#FFFFFF]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          data-campaign-parallax
          src="/images/campaign-spread.jpg"
          alt="Figure in sweeping obsidian wool cape coat moving through a monumental limestone colonnade at twilight."
          width={1920}
          height={1080}
          loading="lazy"
          className="absolute inset-x-0 -top-[9%] h-[118%] w-full object-cover object-[68%_center] md:object-center will-change-transform"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#151515]/85 via-[#151515]/45 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#151515]/70 via-transparent to-[#151515]/30"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 md:px-12 lg:px-16">
        <div className="max-w-2xl">
          <p
            data-campaign-text
            className="mb-6 text-[11px] font-medium tracking-[0.26em] text-[#F5F2EC] uppercase"
          >
            CAMPAIGN FILM &amp; PRINT · SEASON 2026
          </p>

          <h2
            data-campaign-text
            className="font-serif text-[clamp(3rem,6.5vw,5.75rem)] font-light leading-[0.94] tracking-[-0.02em] text-[#FFFFFF]"
          >
            FORM MEETS
            <span className="block italic font-normal">FREEDOM.</span>
          </h2>

          <p
            data-campaign-text
            className="mt-8 max-w-md border-l border-[#FFFFFF]/40 pl-5 text-sm leading-[1.85] text-[#F5F2EC]"
          >
            Photographed across stone colonnades at dusk. Tailoring engineered not to confine the
            body, but to amplify stride, posture, and silence.
          </p>
        </div>
      </div>
    </section>
  );
}
