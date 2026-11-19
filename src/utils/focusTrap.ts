import type React from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/** Traps keyboard Tab navigation inside a modal or drawer container. */
export function trapFocusInContainer(
  event: React.KeyboardEvent<HTMLElement>,
  container: HTMLElement | null
): void {
  if (event.key !== 'Tab' || !container) return;

  const focusable = Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  ).filter((el) => el.offsetParent !== null);

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!first || !last) return;

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
