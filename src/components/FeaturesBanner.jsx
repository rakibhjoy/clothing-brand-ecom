import React from 'react';
import { Sparkles, Truck, RefreshCw, Feather } from 'lucide-react';

export default function FeaturesBanner() {
  const features = [
    {
      icon: <Feather size={22} />,
      title: "Master Tailoring",
      description: "Artisanal cuts from Mongolian cashmere and Italian merino."
    },
    {
      icon: <Truck size={22} />,
      title: "Carbon-Neutral Delivery",
      description: "100% offset express shipping delivered to your doorstep."
    },
    {
      icon: <RefreshCw size={22} />,
      title: "Effortless 30-Day Returns",
      description: "Complimentary doorstep pickups on all exchange requests."
    },
    {
      icon: <Sparkles size={22} />,
      title: "Sustainable Transparency",
      description: "OEKO-TEX certified organic yarns with zero toxic dyes."
    }
  ];

  return (
    <section className="features-section" id="brand-values">
      <div className="container">
        <div className="features-grid">
          {features.map((item, idx) => (
            <div key={idx} className="feature-box">
              <div className="feature-icon-wrapper">
                {item.icon}
              </div>
              <div>
                <h4 className="feature-title">{item.title}</h4>
                <p className="feature-text">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
