import { Header } from "./components/Header";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { AdminPage } from "./components/AdminPage";
import {
  AboutSection,
  BeforeAfterSection,
  BenefitsSection,
  ContactSection,
  FaqSection,
  GallerySection,
  ProcessSection,
  TestimonialsSection
} from "./components/SiteSections";
import { Hero } from "./components/Hero";
import { useEditableSiteContent } from "./hooks/useEditableSiteContent";

export function App() {
  const { content, saveContent } = useEditableSiteContent();
  const isAdminRoute = ["/admin", "/editar-site"].includes(window.location.pathname);

  if (isAdminRoute) {
    return <AdminPage content={content} onSave={saveContent} />;
  }

  return (
    <>
      <Header content={content} />
      <main>
        <Hero content={content} />
        <AboutSection content={content} />
        <ProcessSection content={content} steps={content.processSteps} />
        <GallerySection content={content} />
        <BeforeAfterSection content={content} />
        <BenefitsSection content={content} />
        <TestimonialsSection content={content} testimonials={content.testimonials} />
        <FaqSection content={content} faqs={content.faq} />
        <ContactSection content={content} />
      </main>
      <WhatsAppButton
        variant="floating"
        className="floating-whatsapp"
        phone={content.contact.whatsapp}
        message={content.contact.whatsappMessage}
      >
        WhatsApp
      </WhatsAppButton>
      <footer className="site-footer">
        <span>
          {content.brand.name} - {content.brand.subtitle}
        </span>
        <span>Feito para preservar memorias de casamento.</span>
      </footer>
    </>
  );
}
