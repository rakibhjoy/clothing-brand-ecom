import { useState } from 'react';
import { imageUrl } from '../urls';
import { ImageOff } from 'lucide-react';

export function ProductImage({ src, alt, loading = 'lazy', className = '' }) {
  const [failed, setFailed] = useState('');
  if (!src || failed === src) {
    return (
      <span className={`image-placeholder ${className}`} role="img" aria-label={alt ? alt + ' image unavailable' : 'Image unavailable'}>
        <ImageOff size={24} aria-hidden="true" />
      </span>
    );
  }
  return <img className={className} src={imageUrl(src)} alt={alt} loading={loading} decoding="async" onError={() => setFailed(src)} />;
}
