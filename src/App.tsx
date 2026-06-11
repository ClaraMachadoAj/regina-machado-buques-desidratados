import { Header } from "./components/Header";
import { WhatsAppButton } from "./components/WhatsAppButton";
import {
  AboutSection,
  BenefitsSection,
  ContactSection,
  FaqSection,
  GallerySection,
  ProcessSection,
  TestimonialsSection
} from "./components/SiteSections";
import { Hero } from "./components/Hero";
import { useSiteContent } from "./hooks/useSiteContent";

export function App() {
  const { content } = useSiteContent();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <ProcessSection steps={content.processSteps} />
        <GallerySection />
        <BenefitsSection />
        <TestimonialsSection testimonials={content.testimonials} />
        <FaqSection faqs={content.faqs} />
        <ContactSection />
      </main>
      <WhatsAppButton variant="floating" className="floating-whatsapp">
        WhatsApp
      </WhatsAppButton>
      <footer className="site-footer">
        <span>Regina Machado - Buques Desidratados</span>
        <span>Feito para preservar memorias de casamento.</span>
      </footer>
    </>
  );
}
