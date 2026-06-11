import { faqs, processSteps, testimonials } from "../data/siteContent";
import type { ProcessStep } from "../data/siteContent";

export type FaqItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  name: string;
  text: string;
};

export type SiteApiContent = {
  processSteps: ProcessStep[];
  faqs: FaqItem[];
  testimonials: Testimonial[];
};

export const fallbackSiteContent: SiteApiContent = {
  processSteps,
  faqs,
  testimonials
};

export async function fetchSiteContent(): Promise<SiteApiContent> {
  const response = await fetch("/api/site");

  if (!response.ok) {
    throw new Error("Nao foi possivel carregar o conteudo do site.");
  }

  return response.json() as Promise<SiteApiContent>;
}
