import { defaultSiteContent } from "../data/siteContent";
import type { SiteContent } from "../data/siteContent";

const STORAGE_KEY = "regina-machado-site-content";
export const SITE_CONTENT_UPDATED_EVENT = "regina-machado-site-content-updated";

export function getStoredSiteContent(): SiteContent {
  if (typeof window === "undefined") return defaultSiteContent;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultSiteContent;
    return mergeSiteContent(defaultSiteContent, JSON.parse(stored) as Partial<SiteContent>);
  } catch {
    return defaultSiteContent;
  }
}

export function saveStoredSiteContent(content: SiteContent) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  window.dispatchEvent(new CustomEvent(SITE_CONTENT_UPDATED_EVENT, { detail: content }));
}

export function resetStoredSiteContent() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(
    new CustomEvent(SITE_CONTENT_UPDATED_EVENT, { detail: defaultSiteContent })
  );
}

// Temporary prototype persistence: localStorage lets Regina test edits without a database.
// This shape is intentionally isolated so a future backend/CMS can replace only this file.
function mergeSiteContent(defaults: SiteContent, stored: Partial<SiteContent>): SiteContent {
  return {
    ...defaults,
    ...stored,
    brand: { ...defaults.brand, ...stored.brand },
    contact: { ...defaults.contact, ...stored.contact },
    hero: { ...defaults.hero, ...stored.hero },
    about: { ...defaults.about, ...stored.about },
    processTitle: { ...defaults.processTitle, ...stored.processTitle },
    galleryTitle: { ...defaults.galleryTitle, ...stored.galleryTitle },
    beforeAfter: { ...defaults.beforeAfter, ...stored.beforeAfter },
    benefitsTitle: { ...defaults.benefitsTitle, ...stored.benefitsTitle },
    testimonialsTitle: { ...defaults.testimonialsTitle, ...stored.testimonialsTitle },
    faqTitle: { ...defaults.faqTitle, ...stored.faqTitle },
    contactTitle: { ...defaults.contactTitle, ...stored.contactTitle },
    processSteps: stored.processSteps ?? defaults.processSteps,
    gallery: stored.gallery ?? defaults.gallery,
    benefits: stored.benefits ?? defaults.benefits,
    testimonials: stored.testimonials ?? defaults.testimonials,
    faq: stored.faq ?? defaults.faq,
    stats: stored.stats ?? defaults.stats,
    heroHighlights: stored.heroHighlights ?? defaults.heroHighlights
  };
}
