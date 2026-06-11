import { ArrowDown, Sparkles, Timer } from "lucide-react";
import type { SiteContent } from "../data/siteContent";
import { WhatsAppButton } from "./WhatsAppButton";

type HeroProps = {
  content: SiteContent;
};

const highlightIcons = [Sparkles, Timer];

export function Hero({ content }: HeroProps) {
  return (
    <section className="hero section" id="inicio">
      <div className="hero-copy">
        <p className="eyebrow">{content.hero.eyebrow}</p>
        <h1>{content.hero.title}</h1>
        <p className="lead">{content.hero.subtitle}</p>

        <div className="hero-actions">
          <WhatsAppButton
            phone={content.contact.whatsapp}
            message={content.contact.whatsappMessage}
          >
            Quero eternizar meu buque
          </WhatsAppButton>
          <a className="button button-secondary" href="#como-funciona">
            <ArrowDown aria-hidden="true" size={18} />
            <span>Ver como funciona</span>
          </a>
        </div>

        <div className="hero-highlights" aria-label="Diferenciais">
          {content.heroHighlights.map((text, index) => {
            const Icon = highlightIcons[index % highlightIcons.length];
            return (
            <span key={text}>
              <Icon aria-hidden="true" size={18} />
              {text}
            </span>
            );
          })}
        </div>
        <p className="highlight-line">{content.hero.highlight}</p>
      </div>

      <div className="hero-visual">
        <img src={content.hero.image} alt="Buque desidratado em composicao delicada" />
        <span className="image-tag">{content.hero.imageTag}</span>
      </div>

      <div className="stats-strip" aria-label="Resumo da experiencia">
        {content.stats.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
