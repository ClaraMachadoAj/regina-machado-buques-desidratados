import { ArrowDown } from "lucide-react";
import { heroHighlights, stats } from "../data/siteContent";
import { WhatsAppButton } from "./WhatsAppButton";

export function Hero() {
  return (
    <section className="hero section" id="inicio">
      <div className="hero-copy">
        <p className="eyebrow">Flores passam, memorias ficam</p>
        <h1>Eternize o buque do seu casamento</h1>
        <p className="lead">
          Seu buque carrega a emocao de um dos dias mais importantes da sua vida. Por meio
          de um processo artesanal de desidratacao, suas flores se transformam em uma
          lembranca delicada, afetiva e duradoura.
        </p>

        <div className="hero-actions">
          <WhatsAppButton>Quero eternizar meu buque</WhatsAppButton>
          <a className="button button-secondary" href="#como-funciona">
            <ArrowDown aria-hidden="true" size={18} />
            <span>Ver como funciona</span>
          </a>
        </div>

        <div className="hero-highlights" aria-label="Diferenciais">
          {heroHighlights.map(({ icon: Icon, text }) => (
            <span key={text}>
              <Icon aria-hidden="true" size={18} />
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-visual">
        <img src="/assets/buques-desidratados.png" alt="Buque desidratado em composicao delicada" />
        <span className="image-tag">Do altar para a eternidade</span>
      </div>

      <div className="stats-strip" aria-label="Resumo da experiencia">
        {stats.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
