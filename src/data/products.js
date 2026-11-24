export const PRODUCTS = [
  // --- T-SHIRTS (ROGUE & RAW LIGHT WASH & KNIT COLLAR SERIES) ---
  {
    id: "wr-tee-01",
    name: "R&R Light Wash Purple T-Shirt",
    description: "A heavyweight cotton tee with a soft, sun-faded finish and a roomy boxy fit.",
    styleName: "Light Wash T-Shirt",
    category: "T-Shirts",
    price: 1399,
    originalPrice: 1799,
    rating: 4.9,
    reviewsCount: 184,
    badge: "New In",
    isRecommended: true,
    isBestSeller: true,
    isNewArrival: true,
    colorName: "Dark Purple",
    colors: [
      {
        name: "Dark Purple",
        hex: "#4d2938",
        thumb: "/images/wr_purple_tee.jpg"
      },
      {
        name: "Chocolate Plum",
        hex: "#4a3528",
        thumb: "/images/wr_brown_tee.jpg"
      },
      {
        name: "Crimson",
        hex: "#632d43",
        thumb: "/images/wr_crimson_tee.jpg"
      },
      {
        name: "Dark Blue",
        hex: "#1f2733",
        thumb: "/images/wr_navy_tee.jpg"
      },
      {
        name: "Fig",
        hex: "#734352",
        thumb: "/images/wr_fig_tee.jpg"
      }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    modelFit: "Male model is 6' & 73kg, wearing the size M, Female model is 5'6\" & 48kg, wearing the size S",
    image: "/images/wr_purple_tee.jpg",
    gallery: [
      "/images/wr_purple_tee.jpg",
      "/images/wr_brown_tee.jpg",
      "/images/wr_crimson_tee.jpg",
      "/images/wr_navy_tee.jpg",
      "/images/wr_fig_tee.jpg"
    ],
    details: [
      "300 GSM Heavyweight Combed Compact Cotton",
      "Signature R&R Sun-Faded Stone Enzyme Wash",
      "Drop shoulder boxy silhouette with thick ribbed collar",
      "Twin-needle reinforced stitching on hem and cuffs",
      "Custom embroidery logo on chest and tonal typography on nape"
    ],
    shippingInfo: [
      "Inside Dhaka: 2-3 business days (৳ 70)",
      "Outside Dhaka: 3-5 business days (৳ 130)",
      "Free express shipping on all orders over ৳ 3,000",
      "Easy 7-day hassle-free size exchange portal available"
    ]
  },
  {
    id: "wr-tee-02",
    name: "R&R Light Wash Dark Blue T-Shirt",
    description: "Deep indigo and a structured drape give this heavyweight cotton tee an easy, oversized shape.",
    styleName: "Light Wash T-Shirt",
    category: "T-Shirts",
    price: 1399,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 140,
    badge: "Trending",
    isRecommended: true,
    isBestSeller: true,
    isNewArrival: false,
    colorName: "Dark Blue",
    colors: [
      { name: "Dark Blue", hex: "#1f2733", thumb: "/images/wr_navy_tee.jpg" },
      { name: "Fig", hex: "#734352", thumb: "/images/wr_fig_tee.jpg" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    modelFit: "Male model is 6' & 73kg, wearing the size M, Female model is 5'6\" & 48kg, wearing the size S",
    image: "/images/wr_navy_tee.jpg",
    gallery: [
      "/images/wr_navy_tee.jpg",
      "/images/wr_fig_tee.jpg"
    ],
    details: [
      "100% Ring-Spun Heavyweight Cotton (290 GSM)",
      "Deep indigo garment dye wash",
      "Pre-shrunk architectural boxy drape"
    ],
    shippingInfo: [
      "Inside Dhaka: 2-3 business days (৳ 70)",
      "Outside Dhaka: 3-5 business days (৳ 130)"
    ]
  },
  {
    id: "wr-tee-03",
    name: "R&R Light Wash Chocolate Plum T-Shirt",
    description: "A soft compact-jersey tee in Chocolate Plum, finished with an earthy mineral dye.",
    category: "T-Shirts",
    price: 1399,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 96,
    badge: "Best Seller",
    isRecommended: true,
    isBestSeller: true,
    isNewArrival: false,
    colorName: "Chocolate Plum",
    colors: [
      { name: "Chocolate Plum", hex: "#4a3528", thumb: "/images/wr_brown_tee.jpg" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    modelFit: "Male model is 6' & 73kg, wearing the size M, Female model is 5'6\" & 48kg, wearing the size S",
    image: "/images/wr_brown_tee.jpg",
    gallery: [],
    details: [
      "280 GSM Compact Jersey",
      "Earth mineral dye with soft-hand finish"
    ],
    shippingInfo: [
      "Inside Dhaka: 2-3 business days",
      "Free shipping over ৳ 3,000"
    ]
  },
  {
    id: "wr-tee-04",
    name: "R&R Light Wash Crimson T-Shirt",
    description: "A relaxed cotton tee with dropped shoulders and a vintage-faded Crimson wash.",
    category: "T-Shirts",
    price: 1399,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 78,
    badge: null,
    isRecommended: true,
    isBestSeller: false,
    isNewArrival: true,
    colorName: "Crimson",
    colors: [
      { name: "Crimson", hex: "#632d43", thumb: "/images/wr_crimson_tee.jpg" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    modelFit: "Male model is 6' & 73kg, wearing the size M, Female model is 5'6\" & 48kg, wearing the size S",
    image: "/images/wr_crimson_tee.jpg",
    gallery: [],
    details: [
      "100% Cotton with acid vintage fading",
      "Relaxed drop shoulder cut"
    ],
    shippingInfo: [
      "Standard delivery in 2-4 days"
    ]
  },
  {
    id: "wr-tee-05",
    name: "R&R Light Wash Fig T-Shirt",
    description: "Heavyweight cotton gives this washed Fig tee a structured feel.",
    category: "T-Shirts",
    price: 1399,
    originalPrice: 1699,
    rating: 4.9,
    reviewsCount: 112,
    badge: "Sale",
    isRecommended: true,
    isBestSeller: true,
    isNewArrival: false,
    colorName: "Fig",
    colors: [
      { name: "Fig", hex: "#734352", thumb: "/images/wr_fig_tee.jpg" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    modelFit: "Male model is 6' & 73kg, wearing the size M, Female model is 5'6\" & 48kg, wearing the size S",
    image: "/images/wr_fig_tee.jpg",
    gallery: [],
    details: [
      "R&R Signature washed fig hue",
      "Heavyweight 300 GSM cotton construction"
    ],
    shippingInfo: [
      "Delivery within 48-72 hours"
    ]
  },

  // --- KNIT COLLAR SERIES ---
  {
    id: "wr-knit-01",
    name: "R&R Brown Knit Collar Boxy T-Shirt",
    description: "A boxy French terry tee with a textured contrast collar and varsity chest branding.",
    category: "T-Shirts",
    price: 1699,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 64,
    badge: "Premium",
    isRecommended: false,
    isBestSeller: true,
    isNewArrival: true,
    colorName: "Earth Brown",
    colors: [
      { name: "Earth Brown", hex: "#3b2a22", thumb: "/images/wr_knit_brown.jpg" }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    modelFit: "Model is 6'1\" wearing size L",
    image: "/images/wr_knit_brown.jpg",
    gallery: [],
    details: [
      "Jacquard knit textured ribbed contrast collar",
      "Heavy French terry knit cotton blend",
      "Embossed ROGUE & RAW varsity branding across chest"
    ],
    shippingInfo: [
      "Free express shipping on all orders over ৳ 3,000"
    ]
  },
  {
    id: "wr-knit-02",
    name: "R&R Black Knit Collar Boxy T-Shirt",
    description: "Dense black jersey and a contrast knit collar give this boxy tee a structured finish.",
    category: "T-Shirts",
    price: 1699,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 88,
    badge: "Core",
    isRecommended: false,
    isBestSeller: true,
    isNewArrival: false,
    colorName: "Pitch Black",
    colors: [
      { name: "Pitch Black", hex: "#121212", thumb: "/images/wr_knit_black.jpg" }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    modelFit: "Model is 6' wearing size M",
    image: "/images/wr_knit_black.jpg",
    gallery: [],
    details: [
      "Dense 320 GSM combed jersey",
      "Knit collar with contrast detailing"
    ],
    shippingInfo: ["Delivered in 2-4 days"]
  },
  {
    id: "wr-knit-03",
    name: "R&R Sky Knit Collar Boxy T-Shirt",
    description: "A sky-blue boxy tee with a knit collar and an embroidered script logo.",
    category: "T-Shirts",
    price: 1699,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 52,
    badge: "New In",
    isRecommended: false,
    isBestSeller: false,
    isNewArrival: true,
    colorName: "Sky Blue",
    colors: [
      { name: "Sky Blue", hex: "#93c5fd", thumb: "/images/wr_knit_sky.jpg" }
    ],
    sizes: ["S", "M", "L", "XL"],
    modelFit: "Model is 5'11\" wearing size M",
    image: "/images/wr_knit_sky.jpg",
    gallery: [],
    details: [
      "Pastel sky garment dye",
      "Embroidered script logo"
    ],
    shippingInfo: ["Standard shipping available"]
  },
  {
    id: "wr-knit-04",
    name: "R&R Beige Knit Collar Boxy T-Shirt",
    description: "A boxy tee in a soft oat wash with a contrast double-rib collar.",
    category: "T-Shirts",
    price: 1699,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 71,
    badge: "Trending",
    isRecommended: false,
    isBestSeller: false,
    isNewArrival: true,
    colorName: "Beige Cream",
    colors: [
      { name: "Beige Cream", hex: "#eae6df", thumb: "/images/wr_knit_beige.jpg" }
    ],
    sizes: ["S", "M", "L", "XL"],
    modelFit: "Model is 6' wearing size L",
    image: "/images/wr_knit_beige.jpg",
    gallery: [],
    details: [
      "Neutral oat cream wash",
      "Contrast double rib knitted crewneck"
    ],
    shippingInfo: ["Free shipping over ৳ 3,000"]
  },

  // --- DENIM & PANTS ---
  {
    id: "wr-denim-01",
    name: "R&R Vintage Tint Baggy Denim Jeans",
    description: "Heavyweight vintage-wash jeans with a wide skater leg and room to stack at the ankle.",
    category: "Denim",
    price: 2499,
    originalPrice: 2999,
    rating: 5.0,
    reviewsCount: 162,
    badge: "Iconic",
    isRecommended: true,
    isBestSeller: true,
    isNewArrival: false,
    colorName: "Tinted Indigo Blue",
    colors: [
      { name: "Tinted Indigo", hex: "#4f657a", thumb: "/images/wr_baggy_denim.jpg" }
    ],
    sizes: ["28", "30", "32", "34", "36"],
    modelFit: "Male model is 6' wearing size 32 waist",
    image: "/images/wr_baggy_denim.jpg",
    gallery: [],
    details: [
      "14 oz Heavyweight Rigid Cotton Denim",
      "Dirty mud tint stone wash with knee whiskering",
      "Wide skater leg with exaggerated ankle stacking"
    ],
    shippingInfo: ["Inside Dhaka: 2-3 business days"]
  },
  {
    id: "wr-denim-02",
    name: "R&R Bleach Distressed Skater Jeans",
    description: "Bleach-washed skater jeans with distressed knees and raw hems.",
    category: "Denim",
    price: 2599,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 88,
    badge: "Trending",
    isRecommended: true,
    isBestSeller: false,
    isNewArrival: true,
    colorName: "Bleach Stone",
    colors: [
      { name: "Bleach Stone", hex: "#9ab2c7", thumb: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=400&q=80" }
    ],
    sizes: ["28", "30", "32", "34"],
    modelFit: "Model is 5'11\" wearing size 30",
    image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=85",
    gallery: [],
    details: [
      "Hand-distressed knee rips and raw hems",
      "Custom gunmetal R&R rivets"
    ],
    shippingInfo: ["Delivered in 2-4 days"]
  },

  // --- SHIRTS & FLANNELS ---
  {
    id: "wr-shirt-01",
    name: "R&R Heavyweight Boxy Check Flannel",
    description: "A boxy flannel cut from heavyweight brushed twill, with oversized chest pockets for layering.",
    category: "Shirts",
    price: 2199,
    originalPrice: 2599,
    rating: 4.9,
    reviewsCount: 130,
    badge: "Best Seller",
    isRecommended: true,
    isBestSeller: true,
    isNewArrival: false,
    colorName: "Brown Tartan",
    colors: [
      { name: "Brown Tartan", hex: "#5e3e29", thumb: "/images/wr_flannel_brown.jpg" }
    ],
    sizes: ["S", "M", "L", "XL"],
    modelFit: "Model is 6' wearing size L over t-shirt",
    image: "/images/wr_flannel_brown.jpg",
    gallery: [],
    details: [
      "360 GSM Heavy Brushed Twill Flannel",
      "Two-way button placket and oversized chest pockets"
    ],
    shippingInfo: ["Free shipping over ৳ 3,000"]
  },
  {
    id: "wr-shirt-02",
    name: "R&R Monochrome Houndstooth Zip Overshirt",
    description: "A structured houndstooth overshirt with a boxy fit and a two-way metal zip.",
    category: "Shirts",
    price: 2399,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 74,
    badge: "Signature",
    isRecommended: false,
    isBestSeller: false,
    isNewArrival: true,
    colorName: "Monochrome Check",
    colors: [
      { name: "Monochrome Check", hex: "#3a3a3a", thumb: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80" }
    ],
    sizes: ["S", "M", "L", "XL"],
    modelFit: "Model is 6'1\" wearing size L",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    gallery: [],
    details: [
      "Heavy duty two-way metal silver zipper",
      "Structured boxy drape"
    ],
    shippingInfo: ["Free shipping over ৳ 3,000"]
  },
  {
    id: "wr-tee-06",
    name: "R&R Heavyweight Graphic Ghost Tee",
    description: "A boxy off-white tee in heavyweight cotton with screen-printed archive artwork on the back.",
    category: "T-Shirts",
    price: 1499,
    originalPrice: 1899,
    rating: 4.9,
    reviewsCount: 94,
    badge: "Limited",
    isRecommended: true,
    isBestSeller: false,
    isNewArrival: true,
    colorName: "Off-White",
    colors: [
      { name: "Off-White", hex: "#f5f5f0", thumb: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80" }
    ],
    sizes: ["S", "M", "L", "XL"],
    modelFit: "Model is 6' wearing size L",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=85",
    gallery: [],
    details: [
      "Screen-printed back archive artwork",
      "Boxy drop-shoulder 300 GSM cotton"
    ],
    shippingInfo: ["Delivered in 2-4 days"]
  },
  {
    id: "wr-tee-07",
    name: "R&R Cyber Archive Oversized Tee",
    description: "An oversized black tee with an acid wash and distressed edges at the neck and hem.",
    category: "T-Shirts",
    price: 1499,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 120,
    badge: "Trending",
    isRecommended: true,
    isBestSeller: true,
    isNewArrival: false,
    colorName: "Pitch Black",
    colors: [
      { name: "Pitch Black", hex: "#111111", thumb: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    modelFit: "Model is 5'11\" wearing size M",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85",
    gallery: [],
    details: [
      "Acid enzyme wash finish",
      "Distressed neck and hem edges"
    ],
    shippingInfo: ["Free shipping over ৳ 3,000"]
  },
  {
    id: "wr-tee-08",
    name: "R&R Pine Forest Heavy Cotton Tee",
    description: "A relaxed heavyweight cotton tee with a deep pine pigment dye.",
    category: "T-Shirts",
    price: 1399,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 46,
    badge: null,
    isRecommended: false,
    isBestSeller: false,
    isNewArrival: true,
    colorName: "Pine Green",
    colors: [
      { name: "Pine Green", hex: "#1e3a2f", thumb: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=400&q=80" }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    modelFit: "Model is 6'1\" wearing size L",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85",
    gallery: [],
    details: [
      "Deep botanical pigment dye",
      "Signature relaxed boxy cut"
    ],
    shippingInfo: ["Inside Dhaka: 2-3 days"]
  },
  {
    id: "wr-denim-03",
    name: "R&R Raw Indigo Carpenter Denim",
    description: "Rigid raw indigo denim with reinforced knees and a carpenter hammer loop.",
    category: "Denim",
    price: 2699,
    originalPrice: 3199,
    rating: 4.9,
    reviewsCount: 89,
    badge: "Heavyweight",
    isRecommended: true,
    isBestSeller: false,
    isNewArrival: true,
    colorName: "Deep Indigo",
    colors: [
      { name: "Deep Indigo", hex: "#1c2c44", thumb: "/images/rr_carpenter_mockup.jpg" }
    ],
    sizes: ["28", "30", "32", "34", "36"],
    modelFit: "Model is 6' wearing waist 32",
    image: "/images/rr_carpenter_mockup.jpg",
    imageIsMockup: true,
    gallery: [],
    details: [
      "14.5 oz Rigid Raw Denim",
      "Double knee carpenter panels and utility hammer loop"
    ],
    shippingInfo: ["Free shipping over ৳ 3,000"]
  },
  {
    id: "wr-denim-04",
    name: "R&R Washed Jet Black Baggy Jeans",
    description: "Baggy black jeans with a stone-washed charcoal finish and a loose skater fit.",
    category: "Denim",
    price: 2499,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 145,
    badge: "Core",
    isRecommended: true,
    isBestSeller: true,
    isNewArrival: false,
    colorName: "Washed Black",
    colors: [
      { name: "Washed Black", hex: "#222222", thumb: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=400&q=80" }
    ],
    sizes: ["28", "30", "32", "34", "36"],
    modelFit: "Model is 6' wearing waist 32",
    image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=85",
    gallery: [],
    details: [
      "Heavy stone wash with charcoal fading",
      "Skater drape with loose thigh opening"
    ],
    shippingInfo: ["Delivered in 2-4 days"]
  },
  {
    id: "wr-shirt-03",
    name: "R&R Cobalt Blue Buffalo Check Shirt",
    description: "A cobalt buffalo-check shirt in brushed cotton flannel with oversized flap pockets.",
    category: "Shirts",
    price: 2199,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 62,
    badge: "New In",
    isRecommended: true,
    isBestSeller: false,
    isNewArrival: true,
    colorName: "Cobalt Check",
    colors: [
      { name: "Cobalt Check", hex: "#2b4c7e", thumb: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80" }
    ],
    sizes: ["S", "M", "L", "XL"],
    modelFit: "Model is 5'11\" wearing size L",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
    gallery: [],
    details: [
      "100% Brushed cotton flannel",
      "Oversized dual flap pockets"
    ],
    shippingInfo: ["Free shipping over ৳ 3,000"]
  },
  {
    id: "wr-shirt-04",
    name: "R&R Sun-Bleached Beige Plaid Overshirt",
    description: "A brushed twill overshirt with a sun-bleached plaid pattern and tonal matte buttons.",
    category: "Shirts",
    price: 2299,
    originalPrice: 2699,
    rating: 4.9,
    reviewsCount: 78,
    badge: "Trending",
    isRecommended: true,
    isBestSeller: true,
    isNewArrival: false,
    colorName: "Sun-Bleached Tan",
    colors: [
      { name: "Sun-Bleached Tan", hex: "#c7b299", thumb: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80" }
    ],
    sizes: ["S", "M", "L", "XL"],
    modelFit: "Model is 6' wearing size L",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    gallery: [],
    details: [
      "Heavy twill check weave with soft brushed face",
      "Double yoke and tonal matte buttons"
    ],
    shippingInfo: ["Free shipping over ৳ 3,000"]
  },

  // --- ACCESSORIES ---
  {
    id: "wr-acc-01",
    name: "R&R Distressed Leather Hardware Belt",
    description: "A full-grain leather belt with distressed edges and antique-silver hardware.",
    category: "Accessories",
    price: 1499,
    originalPrice: 1899,
    rating: 4.9,
    reviewsCount: 52,
    badge: "Trending",
    isRecommended: true,
    isBestSeller: true,
    isNewArrival: false,
    colorName: "Washed Black",
    colors: [
      { name: "Washed Black", hex: "#1c1c1c", thumb: "/images/wr_leather_belt.jpg" }
    ],
    sizes: ["85cm (30-32)", "95cm (32-34)", "105cm (34-36)"],
    modelFit: "Fits true to waist size, roller prong buckle",
    image: "/images/wr_leather_belt.jpg",
    gallery: [],
    details: [
      "100% Full-grain vegetable tanned cowhide leather",
      "Hand-distressed vintage edges with heavy silver eyelets",
      "Antique silver metal hardware with engraved logo"
    ],
    shippingInfo: ["Delivered in 2-4 days"]
  },
  {
    id: "wr-acc-02",
    name: "R&R Sun-Bleached Heavyweight Rogue Cap",
    description: "A heavyweight cotton twill cap with a washed finish, tonal embroidery, and an adjustable strap.",
    category: "Accessories",
    price: 999,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 77,
    badge: "Core",
    isRecommended: true,
    isBestSeller: true,
    isNewArrival: true,
    colorName: "Washed Carbon",
    colors: [
      { name: "Washed Carbon", hex: "#2b2b2b", thumb: "/images/wr_rebel_cap.jpg" }
    ],
    sizes: ["One Size (Adjustable)"],
    modelFit: "Adjustable back strap with antique brass slider",
    image: "/images/wr_rebel_cap.jpg",
    gallery: [],
    details: [
      "Heavyweight washed cotton twill with enzyme treatment",
      "Subtle tonal 3D embroidery on front crown",
      "Distressed brim edge detailing"
    ],
    shippingInfo: ["Inside Dhaka: 2-3 business days"]
  },
  {
    id: "wr-acc-03",
    name: "R&R Archive Silver Carabiner Lanyard",
    description: "A cobalt woven lanyard with a silver spring-gate carabiner for clipping onto a bag or belt loop.",
    category: "Accessories",
    price: 799,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 43,
    badge: "New In",
    isRecommended: false,
    isBestSeller: false,
    isNewArrival: true,
    colorName: "Cobalt & Silver",
    colors: [
      { name: "Cobalt & Silver", hex: "#1e3a8a", thumb: "/images/rr_carabiner_mockup.jpg" }
    ],
    sizes: ["One Size"],
    modelFit: "Belt loop or bag clip attachment",
    image: "/images/rr_carabiner_mockup.jpg",
    imageIsMockup: true,
    gallery: [],
    details: [
      "Heavy-duty climbing-grade spring carabiner",
      "High tensile woven cord lanyard with laser etched tag"
    ],
    shippingInfo: ["Delivered in 2-4 days"]
  }
];

export const CATEGORIES = [
  "ALL",
  "NEW ARRIVALS",
  "BEST SELLERS",
  "YOU MAY LIKE",
  "T-SHIRTS",
  "SHIRTS",
  "JEANS",
  "ACCESSORIES",
  "KNIT COLLAR"
];

export const PROMO_CODES = {
  ROGUE10: { discount: 0.10, label: "10% First Order" },
  RAW15: { discount: 0.15, label: "15% Spring Drop" },
  REBELS10: { discount: 0.10, label: "10% First Order" },
  SPRING26: { discount: 0.15, label: "15% Spring Drop" }
};
