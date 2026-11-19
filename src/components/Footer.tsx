interface FooterProps {
  readonly onOpenContact: () => void;
}

export function Footer({ onOpenContact }: FooterProps) {
  return (
    <footer className="border-t border-[#A6A39E]/20 bg-[#151515] py-16 text-[#F5F2EC] md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-serif text-2xl tracking-[0.26em] text-[#FFFFFF] uppercase md:text-3xl">
              ÉLVARÉ ATELIER
            </p>
            <p className="mt-3 text-[11px] font-medium tracking-[0.26em] text-[#A6A39E] uppercase">
              WEAR YOUR IDENTITY.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center text-[11px] font-medium tracking-[0.22em] text-[#F5F2EC] uppercase transition-opacity hover:opacity-65"
            >
              INSTAGRAM
            </a>

            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex min-h-[44px] items-center text-[11px] font-medium tracking-[0.22em] text-[#F5F2EC] uppercase transition-opacity hover:opacity-65"
            >
              CONTACT
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-[#A6A39E]/15 pt-8 text-[11px] tracking-[0.2em] text-[#A6A39E] uppercase sm:flex-row sm:items-center">
          <p>© 2026 ÉLVARÉ ATELIER</p>
          <p>PARIS · MILAN</p>
        </div>
      </div>
    </footer>
  );
}
