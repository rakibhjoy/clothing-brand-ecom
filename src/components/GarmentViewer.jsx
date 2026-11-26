import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, ZoomIn, ZoomOut } from 'lucide-react';
import { getStudioPiece } from '../data/studio';
import { getProductPhotos, productName } from '../storefront';
import { imageUrl } from '../urls';
import { ProductImage } from './Media';

const angles = [
  { label: 'Front', left: '0', top: '0' },
  { label: 'Right', left: '-100%', top: '0' },
  { label: 'Back', left: '0', top: '-100%' },
  { label: 'Left', left: '-100%', top: '-100%' }
];
const zoomLevels = [1, 1.75, 2.5];
const panKeys = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] };
const center = { x: 50, y: 50 };
const clamp = (value) => Math.min(100, Math.max(0, value));

export default function GarmentViewer({
  product, initialPhoto = 0, initialMode = 'photos', initialAngle = 0, loading = 'eager', onViewChange, paused = false
}) {
  const piece = getStudioPiece(product.id);
  const photos = getProductPhotos(product);
  const name = productName(product);
  const [mode, setMode] = useState(piece ? initialMode : 'photos');
  const [photoIndex, setPhotoIndex] = useState(initialPhoto);
  const [angleIndex, setAngleIndex] = useState(initialAngle);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [origin, setOrigin] = useState(center);
  const [playing, setPlaying] = useState(false);
  const drag = useRef(null);
  const showingAngles = mode === 'angles';
  const zoomed = zoomIndex > 0;
  const angle = angles[angleIndex];
  const count = showingAngles ? angles.length : photos.length;
  const keyboardHint = zoomed
    ? 'Use arrow keys to pan, plus and minus to zoom.'
    : 'Use left and right arrow keys to change views, plus and minus to zoom.';

  useEffect(() => {
    if (!playing || paused) return;
    const interval = window.setInterval(() => setAngleIndex((current) => (current + 1) % angles.length), 820);
    return () => window.clearInterval(interval);
  }, [playing, paused]);

  useEffect(() => {
    onViewChange?.({ mode, photoIndex, angleIndex });
  }, [mode, photoIndex, angleIndex, onViewChange]);

  function resetZoom() {
    setZoomIndex(0);
    setOrigin(center);
  }

  function selectAngle(index) {
    setPlaying(false);
    setAngleIndex(index);
    resetZoom();
  }

  function move(offset) {
    if (count < 2) return;
    if (showingAngles) {
      selectAngle((angleIndex + offset + count) % count);
    } else {
      setPhotoIndex((current) => (current + offset + count) % count);
      resetZoom();
    }
  }

  function changeMode(next) {
    setPlaying(false);
    setMode(next);
    resetZoom();
  }

  function changeZoom(offset) {
    const next = Math.max(0, Math.min(zoomLevels.length - 1, zoomIndex + offset));
    setPlaying(false);
    setZoomIndex(next);
    if (next === 0) setOrigin(center);
  }

  function handleKey(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (zoomed && Object.hasOwn(panKeys, event.key)) {
      const [x, y] = panKeys[event.key];
      setOrigin((current) => ({ x: clamp(current.x + x), y: clamp(current.y + y) }));
      event.preventDefault();
      return;
    }
    switch (event.key) {
      case 'ArrowLeft': move(-1); break;
      case 'ArrowRight': move(1); break;
      case '+':
      case '=': changeZoom(1); break;
      case '-': changeZoom(-1); break;
      case '0': setPlaying(false); resetZoom(); break;
      default: return;
    }
    event.preventDefault();
  }

  function startDrag(event) {
    if (!event.isPrimary || event.button !== 0 || (!zoomed && count < 2)) return;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, origin };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function pan(event) {
    const start = drag.current;
    if (!zoomed || start?.id !== event.pointerId) return;
    const { width, height } = event.currentTarget.getBoundingClientRect();
    const scale = zoomLevels[zoomIndex] - 1;
    setOrigin({
      x: clamp(start.origin.x - (event.clientX - start.x) / width / scale * 100),
      y: clamp(start.origin.y - (event.clientY - start.y) / height / scale * 100)
    });
  }

  function endDrag(event) {
    const start = drag.current;
    if (start?.id !== event.pointerId) return;
    drag.current = null;
    if (zoomed) return;
    const distance = event.clientX - start.x;
    if (Math.abs(distance) > 30 && Math.abs(distance) > Math.abs(event.clientY - start.y)) {
      move(distance < 0 ? 1 : -1);
    }
  }

  return (
    <div className="garment-viewer">
      <div className="viewer-stage">
        <div className="viewer-surface" tabIndex={0} role="group"
          aria-label={name + ' image viewer. ' + keyboardHint}
          data-draggable={count > 1 || zoomed} data-zoomed={zoomed}
          onKeyDown={handleKey} onPointerDown={startDrag} onPointerMove={pan} onPointerUp={endDrag}
          onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }}>
          <div className="viewer-zoom-layer" style={{ transform: 'scale(' + zoomLevels[zoomIndex] + ')', transformOrigin: origin.x + '% ' + origin.y + '%' }}>
            {showingAngles ? (
              <div className="viewer-angle-stack" role="img" aria-label={angle.label + ' angle preview of ' + name}>
                {angles.map(({ label, left, top }, index) => (
                  <div className="viewer-angle" key={label} data-active={angleIndex === index} aria-hidden="true">
                    <img src={imageUrl(piece.sheet)} alt="" loading={loading} decoding="async" draggable={false} style={{ left, top }} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="viewer-photo" key={photos[photoIndex]}>
                <ProductImage src={photos[photoIndex]} alt={name + ', photo ' + (photoIndex + 1)} loading={loading} />
              </div>
            )}
          </div>
        </div>
        <div className="viewer-zoom-controls" role="group" aria-label="Zoom">
          <button type="button" className="icon-button" aria-label="Zoom out" disabled={!zoomed} onClick={() => changeZoom(-1)}><ZoomOut size={19} /></button>
          <button type="button" className="icon-button" aria-label="Zoom in" disabled={zoomIndex === zoomLevels.length - 1} onClick={() => changeZoom(1)}><ZoomIn size={19} /></button>
        </div>
        {showingAngles && <span className="viewer-stage-label" aria-hidden="true">{angle.label} view</span>}
      </div>
      <div className="viewer-toolbar">
        {piece && (
          <div className="viewer-modes" role="group" aria-label="Image type">
            <button type="button" aria-pressed={showingAngles} onClick={() => changeMode('angles')}>Angle preview</button>
            <button type="button" aria-pressed={!showingAngles} onClick={() => changeMode('photos')}>Photos</button>
          </div>
        )}
        {showingAngles && (
          <button type="button" className="viewer-play" aria-pressed={playing} onClick={() => { resetZoom(); setPlaying(!playing); }}>
            {playing ? <Pause size={15} /> : <Play size={15} />}{playing ? 'Pause' : 'Rotate'}
          </button>
        )}
        {!showingAngles && count > 1 && (
          <div className="viewer-photo-nav" role="group" aria-label="Catalog photos">
            <button type="button" className="icon-button" aria-label="Previous catalog photo" onClick={() => move(-1)}><ChevronLeft size={19} /></button>
            <span role="status">{photoIndex + 1} / {count}</span>
            <button type="button" className="icon-button" aria-label="Next catalog photo" onClick={() => move(1)}><ChevronRight size={19} /></button>
          </div>
        )}
      </div>
      {showingAngles && (
        <>
          <div className="viewer-angles" role="group" aria-label="Garment angle">
            {angles.map(({ label }, index) => (
              <button type="button" key={label} aria-pressed={angleIndex === index} onClick={() => selectAngle(index)}>{label}</button>
            ))}
          </div>
          <p className="viewer-disclosure">AI-generated angle previews for {product.colorName}. Details may differ from the garment.</p>
        </>
      )}
      {!showingAngles && product.imageIsMockup && <p className="viewer-disclosure">Product mockup</p>}
    </div>
  );
}
