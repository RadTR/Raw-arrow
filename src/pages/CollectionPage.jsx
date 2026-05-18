import React from 'react';
import ProductListingSection from '../components/ProductListingSection';

const pageConfig = {
  collection: {
    title: "Shop Collection",
    eyebrow: "RawArrow Store",
    copy: "Every current RawArrow piece in one place: denim, heavyweight cotton, caps, and coming accessories.",
    heroTagline: "Filter by fit, fabric, color, and drop status."
  },
  "new-arrivals": {
    title: "New Arrivals",
    eyebrow: "Latest Drop",
    copy: "Fresh silhouettes and newly released staples from the RawArrow rotation.",
    heroTagline: "Start with the newest, then filter by fit."
  },
  denim: {
    title: "Denim",
    eyebrow: "Fit System",
    copy: "RawArrow denim is built around straight, tapered, loose, stacked, and utility proportions.",
    heroTagline: "Sharp cuts, Tunisian city energy."
  },
  men: {
    title: "Men",
    eyebrow: "Editorial Shop",
    copy: "A focused edit of RawArrow denim and streetwear pieces styled for everyday utility.",
    heroTagline: "A complete menswear edit is coming soon."
  },
  women: {
    title: "Women",
    eyebrow: "Editorial Shop",
    copy: "Streetwear staples and denim silhouettes with RawArrow's sharper edge.",
    heroTagline: "A complete womenswear edit is coming soon."
  }
};

export default function CollectionPage({ page = "collection" }) {
  const config = pageConfig[page] || pageConfig.collection;
  const initialCategory = page === "denim" ? "pants" : "all";

  return (
    <ProductListingSection
      title={config.title}
      eyebrow={config.eyebrow}
      copy={config.copy}
      heroTagline={config.heroTagline}
      initialCategory={initialCategory}
      initialStatus={page === "new-arrivals" ? "new" : "all"}
      heroImage="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop"
    />
  );
}
