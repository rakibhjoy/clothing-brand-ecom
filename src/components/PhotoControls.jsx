import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PhotoControls({ total, index, onChange, label, showCount = false }) {
  if (total < 2) return null;

  return (
    <div className="photo-controls" role="group" aria-label={label}>
      <button type="button" className="icon-button photo-arrow photo-prev" aria-label="Previous photo"
        onClick={() => onChange((index + total - 1) % total)}><ChevronLeft size={20} /></button>
      <button type="button" className="icon-button photo-arrow photo-next" aria-label="Next photo"
        onClick={() => onChange((index + 1) % total)}><ChevronRight size={20} /></button>
      <span className={showCount ? "gallery-counter" : "sr-only"} role="status">
        <span className="sr-only">Photo </span>{index + 1} / {total}
      </span>
    </div>
  );
}
