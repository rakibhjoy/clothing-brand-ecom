import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function ShopDialog({ title, onClose, children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      const active = document.activeElement;
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if ((active === document.body || dialog.contains(active)) && opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className={`shop-dialog ${className}`}
      aria-label={title}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="dialog-inner">
        <div className="dialog-heading">
          <h2>{title}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={21} /></button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
