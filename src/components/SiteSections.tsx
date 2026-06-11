import { Instagram, Mail, MapPin } from "lucide-react";
import { benefits, galleryItems } from "../data/siteContent";
import { contactConfig } from "../config/contact";
import { SectionTitle } from "./SectionTitle";
import { WhatsAppButton } from "./WhatsAppButton";
import type { FaqItem, Testimonial } from "../services/siteApi";
import type { ProcessStep } from "../data/siteContent";

export function AboutSection() {
  return (
    <section className="section split" id="sobre">
      <div>
        <p className="eyebrow">Regina Machado</p>
        <h2>Uma historia dedicada a eternizar momentos</h2>
        <p>
          Regina Machado trabalha ha mais de 22 anos com a preservacao de buques de
          noivas, transformando flores naturais em lembrancas cheias de significado.
          Cada buque e recebido com cuidado, sensibilidade e atencao aos detalhes.
        </p>
        <p>
          O resultado une memoria, beleza organica e acabamento artesanal para que o
          casamento continue presente na casa e na historia da familia.
        </p>
      </div>
      <aside className="note-panel" aria-label="Mensagem da Regina Machado">
        <span>Atendimento cuidadoso</span>
        <p>
          O buque e tratado como parte da sua historia. Antes de qualquer etapa, Regina
          orienta sobre envio, conservacao e expectativas do resultado final.
        </p>
      </aside>
    </section>
  );
}

type ProcessSectionProps = {
  steps: ProcessStep[];
};

export function ProcessSection({ steps }: ProcessSectionProps) {
  return (
    <section className="section" id="como-funciona">
      <SectionTitle
        eyebrow="Como funciona"
        title="Um processo simples, sensivel e bem acompanhado"
        description="Da entrega das flores ao acabamento final, cada etapa e pensada para preservar o significado do buque."
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

export function GallerySection() {
  return (
    <section className="section gallery-section" id="galeria">
      <SectionTitle
        eyebrow="Galeria"
        title="Flores preservadas com aparencia romantica e natural"
        description="Uma direcao visual inspirada em casamento, afeto e pecas feitas a mao."
      />
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <article className="gallery-card" key={item.title}>
            <img
              src="/assets/buques-desidratados.png"
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

export function BenefitsSection() {
  return (
    <section className="section muted-band">
      <SectionTitle
        eyebrow="Beneficios"
        title="Por que preservar o buque?"
        description="A desidratacao transforma as flores em uma lembranca decorativa e cheia de afeto."
      />
      <div className="benefits-grid">
        {benefits.map(({ icon: Icon, title, text }) => (
          <article className="benefit-card" key={title}>
            <Icon aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
};

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="section testimonials">
      <SectionTitle eyebrow="Depoimentos" title="O que as noivas costumam sentir ao receber" />
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
};

export function FaqSection({ faqs }: FaqSectionProps) {
  return (
    <section className="section faq" id="duvidas">
      <SectionTitle eyebrow="Duvidas frequentes" title="Antes de enviar o seu buque" />
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

export function ContactSection() {
  return (
    <section className="section contact-section" id="contato">
      <div>
        <p className="eyebrow">Contato</p>
        <h2>Vamos cuidar do seu buque?</h2>
        <p>
          Envie uma mensagem com a data do casamento, cidade e fotos do buque. Regina
          responde com as orientacoes para entrega e orcamento.
        </p>
        <WhatsAppButton>Solicitar orcamento pelo WhatsApp</WhatsAppButton>
      </div>
      <address className="contact-list">
        <a href={`mailto:${contactConfig.email}`}>
          <Mail aria-hidden="true" />
          {contactConfig.email}
        </a>
        <a href={contactConfig.instagramUrl} target="_blank" rel="noreferrer">
          <Instagram aria-hidden="true" />
          Instagram
        </a>
        <span>
          <MapPin aria-hidden="true" />
          Atendimento sob combinacao
        </span>
      </address>
    </section>
  );
}
