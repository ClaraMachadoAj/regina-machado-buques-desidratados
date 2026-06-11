import { Heart, Instagram, Leaf, Mail, MapPin, PackageCheck, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Benefit, FaqItem, ProcessStep, SiteContent, Testimonial } from "../data/siteContent";
import { SectionTitle } from "./SectionTitle";
import { WhatsAppButton } from "./WhatsAppButton";

type ContentProps = {
  content: SiteContent;
};

const benefitIcons: Record<Benefit["icon"], LucideIcon> = {
  heart: Heart,
  leaf: Leaf,
  shield: ShieldCheck,
  package: PackageCheck
};

export function AboutSection({ content }: ContentProps) {
  return (
    <section className="section split" id="sobre">
      <div>
        <p className="eyebrow">{content.about.eyebrow}</p>
        <h2>{content.about.title}</h2>
        {content.about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <aside className="note-panel" aria-label="Mensagem da Regina Machado">
        <span>{content.about.noteTitle}</span>
        <p>{content.about.noteText}</p>
      </aside>
    </section>
  );
}

type ProcessSectionProps = {
  steps: ProcessStep[];
  content: SiteContent;
};

export function ProcessSection({ content, steps }: ProcessSectionProps) {
  return (
    <section className="section" id="como-funciona">
      <SectionTitle
        eyebrow={content.processTitle.eyebrow}
        title={content.processTitle.title}
        description={content.processTitle.description}
      />
      <div className="process-grid">
        {steps.map((step, index) => (
          <article className="process-card" key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function GallerySection({ content }: ContentProps) {
  return (
    <section className="section gallery-section" id="galeria">
      <SectionTitle
        eyebrow={content.galleryTitle.eyebrow}
        title={content.galleryTitle.title}
        description={content.galleryTitle.description}
      />
      <div className="gallery-grid">
        {content.gallery.map((item) => (
          <article className="gallery-card" key={item.title}>
            <img
              src={item.image}
              alt={item.title}
              style={{ objectPosition: item.position }}
            />
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BeforeAfterSection({ content }: ContentProps) {
  return (
    <section className="section before-after" id="antes-depois">
      <SectionTitle
        eyebrow={content.beforeAfter.eyebrow}
        title={content.beforeAfter.title}
        description={content.beforeAfter.description}
      />
      <div className="before-after-grid">
        <figure>
          <img src={content.beforeAfter.beforeImage} alt={content.beforeAfter.beforeLabel} />
          <figcaption>{content.beforeAfter.beforeLabel}</figcaption>
        </figure>
        <figure>
          <img src={content.beforeAfter.afterImage} alt={content.beforeAfter.afterLabel} />
          <figcaption>{content.beforeAfter.afterLabel}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function BenefitsSection({ content }: ContentProps) {
  return (
    <section className="section muted-band">
      <SectionTitle
        eyebrow={content.benefitsTitle.eyebrow}
        title={content.benefitsTitle.title}
        description={content.benefitsTitle.description}
      />
      <div className="benefits-grid">
        {content.benefits.map(({ icon, title, text }) => {
          const Icon = benefitIcons[icon] ?? Heart;
          return (
            <article className="benefit-card" key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
  content: SiteContent;
};

export function TestimonialsSection({ content, testimonials }: TestimonialsSectionProps) {
  return (
    <section className="section testimonials">
      <SectionTitle
        eyebrow={content.testimonialsTitle.eyebrow}
        title={content.testimonialsTitle.title}
      />
      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.name}>
            <blockquote>{testimonial.text}</blockquote>
            <figcaption>{testimonial.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

type FaqSectionProps = {
  faqs: FaqItem[];
  content: SiteContent;
};

export function FaqSection({ content, faqs }: FaqSectionProps) {
  return (
    <section className="section faq" id="duvidas">
      <SectionTitle eyebrow={content.faqTitle.eyebrow} title={content.faqTitle.title} />
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ContactSection({ content }: ContentProps) {
  return (
    <section className="section contact-section" id="contato">
      <div>
        <p className="eyebrow">{content.contactTitle.eyebrow}</p>
        <h2>{content.contactTitle.title}</h2>
        <p>{content.contactTitle.text}</p>
        <WhatsAppButton
          phone={content.contact.whatsapp}
          message={content.contact.whatsappMessage}
        >
          Solicitar orcamento pelo WhatsApp
        </WhatsAppButton>
      </div>
      <address className="contact-list">
        <a href={`mailto:${content.contact.email}`}>
          <Mail aria-hidden="true" />
          {content.contact.email}
        </a>
        <a href={content.contact.instagram} target="_blank" rel="noreferrer">
          <Instagram aria-hidden="true" />
          Instagram
        </a>
        <span>
          <MapPin aria-hidden="true" />
          {content.contact.location}
        </span>
      </address>
    </section>
  );
}
