import {useEffect, useRef} from 'react';

/** Shared keyboard, focus restoration and background isolation for modal dialogs. */
export function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!open || !ref.current) return;
    const dialog = ref.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusables = () => Array.from(dialog.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], input:not(:disabled), select, textarea, [tabindex="0"]'
    )).filter(el => el.getClientRects().length > 0);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const isolated: {element: HTMLElement; inert: boolean}[] = [];
    let branch: HTMLElement = dialog;
    while (branch.parentElement) {
      for (const sibling of Array.from(branch.parentElement.children)) {
        if (sibling !== branch && sibling instanceof HTMLElement && !['SCRIPT', 'STYLE'].includes(sibling.tagName)) {
          isolated.push({element: sibling, inert: sibling.inert});
          sibling.inert = true;
        }
      }
      branch = branch.parentElement;
      if (branch === document.body) break;
    }
    (focusables()[0] ?? dialog).focus({preventScroll: true});
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {event.preventDefault(); closeRef.current(); return;}
      if (event.key !== 'Tab') return;
      const elements = focusables();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!first) {event.preventDefault(); dialog.focus(); return;}
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = oldOverflow;
      isolated.forEach(({element, inert}) => {element.inert = inert;});
      if (previousFocus?.isConnected) previousFocus.focus({preventScroll: true});
    };
  }, [open]);
  return ref;
}
