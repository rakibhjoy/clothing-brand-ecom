import React from 'react';

export default function TriBanner({ onSelectCategory }) {
  const banners = [
    {
      category: 'T-SHIRTS',
      tag: 'DROP 01 // OVERSIZED',
      title: 'HEAVYWEIGHT WASHED TEES',
      image: '/images/wr_purple_tee.jpg'
    },
    {
      category: 'JEANS',
      tag: 'DROP 02 // RELAXED FIT',
      title: 'VINTAGE BAGGY DENIM',
      image: '/images/wr_baggy_denim.jpg'
    },
    {
      category: 'SHIRTS',
      tag: 'DROP 03 // LAYERING',
      title: 'BOXY CHECK FLANNELS',
      image: '/images/wr_flannel_brown.jpg'
    }
  ];

  return (
    <section className="tri-banner-section" id="tri-banner-section">
      {banners.map((b, idx) => (
        <div
          key={idx}
          className="tri-banner-card"
          onClick={() => onSelectCategory && onSelectCategory(b.category, true)}
          role="button"
          tabIndex={0}
          id={`tri-banner-${b.category.toLowerCase().replace('/', '-')}`}
        >
          <img src={b.image} alt={b.title} loading="lazy" />
          <div className="tri-banner-overlay" />
          <div className="tri-banner-caption">
            <div className="tri-banner-tag">{b.tag}</div>
            <div className="tri-banner-title">{b.title}</div>
            <span className="tri-banner-explore-link">[ EXPLORE COLLECTION → ]</span>
          </div>
        </div>
      ))}
    </section>
  );
}
