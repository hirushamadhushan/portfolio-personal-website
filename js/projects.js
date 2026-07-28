/* ==========================================================================
   PROJECTS  —  this is the only file you edit to change the Work section.

   Easiest way: open admin.html in your browser, use the form, then hit
   "Download projects.js" and drop the new file here (overwrite this one).

   Or edit by hand. Each project is one object:

     title        card heading
     glyph        big text on the thumbnail — only used when there is no logo
     badge        small pill at the top-left of the thumbnail
     theme        "p1" … "p6"  — which gradient the thumbnail uses
     live         true = show the green "LIVE" pill, false = hide it
     logo         centred logo on the gradient, e.g. "assets/logo-medisync.svg"
     image        full-bleed screenshot — covers the gradient and the logo
     description  the paragraph under the title
     tech         array of tag names
     code         GitHub URL          ("" hides the CODE link)
     demo         live site URL       ("" hides the LIVE DEMO link)

   Thumbnail falls back gracefully: image → logo → glyph text.
   Order in this array = order on the page.
   ========================================================================== */

window.PROJECTS = [
  {
    title: "MediSync",
    glyph: "MediSync",
    badge: "Full Stack · MERN",
    theme: "p1",
    live: true,
    logo: "assets/logo-medisync.svg",
    image: "",
    description: "Bilingual smart OPD queue and clinic management system for government hospitals — session booking, real-time token queues on patient, doctor and waiting-room screens, four role-based dashboards, cross-clinic records with PDF reports and automated emails.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Socket.IO", "Tailwind", "JWT", "Cloudinary", "Vercel"],
    code: "https://github.com/hirushamadhushan/medisync",
    demo: "https://medisynclk.dev"
  },
  {
    title: "Madhushan Tech Store",
    glyph: "Tech Store",
    badge: "E-Commerce · PHP",
    theme: "p2",
    live: true,
    logo: "assets/logo-techstore.svg",
    image: "",
    description: "Computer-hardware storefront on a hand-written PHP MVC framework with zero external dependencies — filterable catalogue, live AJAX search, cart, wishlist, promo codes and a full admin panel with CSV reports. CSRF, prepared statements and hardened sessions throughout.",
    tech: ["PHP 8", "MySQL", "Custom MVC", "JavaScript", "Docker", "Railway"],
    code: "https://github.com/hirushamadhushan/Madhushan-Tech-Store",
    demo: "https://madhushan-tech-store-production.up.railway.app"
  },
  {
    title: "Heart Disease Prediction",
    glyph: "Heart Disease AI",
    badge: "Machine Learning",
    theme: "p3",
    live: false,
    logo: "assets/logo-heart.svg",
    image: "",
    description: "Flask web app predicting heart disease risk from 13 clinical measurements on the UCI Cleveland dataset. Five algorithms compared and Random Forest selected after Grid Search tuning — 80.3% accuracy and 0.881 ROC-AUC, confirmed by 5-fold cross-validation.",
    tech: ["Python", "scikit-learn", "pandas", "NumPy", "Flask", "Google Colab"],
    code: "https://github.com/hirushamadhushan/heart-disease-prediction",
    demo: ""
  }
];
