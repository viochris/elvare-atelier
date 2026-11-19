import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { ATELIER_SALONS, COLLECTION_LOOKS } from '../data/looks';
import { trapFocusInContainer } from '../utils/focusTrap';

interface ContactModalProps {
  readonly isOpen: boolean;
  readonly initialLook: string;
  readonly onClose: () => void;
}

type FormStatus = 'idle' | 'submitting' | 'submitted';

interface FormErrors {
  name?: string;
  email?: string;
}

export function ContactModal({ isOpen, initialLook, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [salon, setSalon] = useState<string>(ATELIER_SALONS[0].id);
  const [selectedLook, setSelectedLook] = useState(initialLook);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const handleResetAndClose = useCallback(() => {
    setStatus('idle');
    setErrors({});
    setName('');
    setEmail('');
    setSalon(ATELIER_SALONS[0].id);
    setSelectedLook(initialLook);
    setMessage('');
    onClose();
  }, [initialLook, onClose]);

  useEffect(() => {
    setSelectedLook(initialLook);
  }, [initialLook]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleResetAndClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      previousFocusRef.current?.focus();
    };
  }, [isOpen, handleResetAndClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please provide a valid email address.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    timerRef.current = window.setTimeout(() => {
      setStatus('submitted');
    }, 450);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#151515]/80 p-4 md:p-8"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onKeyDown={(e) => trapFocusInContainer(e, dialogRef.current)}
        className="max-h-[92svh] w-full max-w-xl overflow-y-auto overflow-x-hidden border border-[#151515]/15 bg-[#F5F2EC] p-5 text-[#151515] sm:p-7 md:p-8"
      >
        <div className="flex items-start justify-between border-b border-[#151515]/15 pb-4">
          <div>
            <p className="text-[11px] font-medium tracking-[0.24em] text-[#524E48] uppercase">
              PRIVATE CLIENTELING
            </p>
            <h2 id="contact-modal-title" className="mt-1.5 font-serif text-2xl font-light sm:text-3xl md:text-4xl">
              ATELIER APPOINTMENT
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close appointment dialog"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-end text-[#151515] transition-opacity hover:opacity-65"
          >
            <X className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
          </button>
        </div>

        {status === 'submitted' ? (
          <div className="py-10">
            <p className="text-[11px] font-medium tracking-[0.24em] text-[#524E48] uppercase">
              REQUEST REGISTERED
            </p>
            <h3 className="mt-3 font-serif text-2xl font-normal text-[#151515]">
              Thank you, {name.trim()}.
            </h3>
            <p className="mt-4 text-sm leading-[1.8] text-[#383838]">
              Our private client concierge will respond to{' '}
              <span className="font-medium text-[#151515]">{email.trim()}</span> within 24 hours to
              confirm your salon appointment
              {selectedLook ? ` regarding ${selectedLook}` : ''}.
            </p>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-8 min-h-[46px] bg-[#151515] px-8 py-3 text-[11px] font-medium tracking-[0.22em] text-[#FFFFFF] uppercase transition-colors hover:bg-[#383838]"
            >
              RETURN TO ATELIER
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="atelier-name"
                className="block text-[11px] font-medium tracking-[0.22em] text-[#383838] uppercase"
              >
                FULL NAME *
              </label>
              <input
                id="atelier-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={Boolean(errors.name)}
                className="mt-1.5 w-full min-w-0 border-b border-[#151515]/30 bg-transparent py-2 text-sm text-[#151515] focus:border-[#151515]"
                placeholder="Camille Laurent"
              />
              {errors.name && (
                <p role="alert" className="mt-1 text-xs text-[#991B1B]">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="atelier-email"
                className="block text-[11px] font-medium tracking-[0.22em] text-[#383838] uppercase"
              >
                EMAIL ADDRESS *
              </label>
              <input
                id="atelier-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(errors.email)}
                className="mt-1.5 w-full min-w-0 border-b border-[#151515]/30 bg-transparent py-2 text-sm text-[#151515] focus:border-[#151515]"
                placeholder="client@domain.com"
              />
              {errors.email && (
                <p role="alert" className="mt-1 text-xs text-[#991B1B]">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="min-w-0">
                <label
                  htmlFor="atelier-salon"
                  className="block text-[11px] font-medium tracking-[0.22em] text-[#383838] uppercase"
                >
                  SALON LOCATION
                </label>
                <select
                  id="atelier-salon"
                  value={salon}
                  onChange={(e) => setSalon(e.target.value)}
                  className="mt-1.5 w-full min-w-0 truncate border-b border-[#151515]/30 bg-[#F5F2EC] py-2 text-sm text-[#151515] focus:border-[#151515]"
                >
                  {ATELIER_SALONS.map((item) => (
                    <option key={item.id} value={item.id} className="bg-[#F5F2EC] text-[#151515]">
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="atelier-look"
                  className="block text-[11px] font-medium tracking-[0.22em] text-[#383838] uppercase"
                >
                  SILHOUETTE OF INTEREST
                </label>
                <select
                  id="atelier-look"
                  value={selectedLook}
                  onChange={(e) => setSelectedLook(e.target.value)}
                  className="mt-1.5 w-full min-w-0 truncate border-b border-[#151515]/30 bg-[#F5F2EC] py-2 text-sm text-[#151515] focus:border-[#151515]"
                >
                  <option value="" className="bg-[#F5F2EC] text-[#151515]">
                    General Collection Viewing
                  </option>
                  {COLLECTION_LOOKS.map((look) => {
                    const label = `${look.number}: ${look.title}`;
                    return (
                      <option key={look.id} value={label} className="bg-[#F5F2EC] text-[#151515]">
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="atelier-note"
                className="block text-[11px] font-medium tracking-[0.22em] text-[#383838] uppercase"
              >
                PRIVATE NOTE (OPTIONAL)
              </label>
              <textarea
                id="atelier-note"
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 w-full resize-none border-b border-[#151515]/30 bg-transparent py-2 text-sm text-[#151515] focus:border-[#151515]"
                placeholder="Preferred dates or sizing notes"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full min-h-[48px] bg-[#151515] px-6 py-3.5 text-[11px] font-medium tracking-[0.22em] text-[#FFFFFF] uppercase transition-colors hover:bg-[#383838] disabled:opacity-60"
              >
                {status === 'submitting' ? 'REGISTERING REQUEST...' : 'SUBMIT APPOINTMENT REQUEST'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
