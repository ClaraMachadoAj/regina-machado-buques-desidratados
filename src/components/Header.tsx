import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "../data/siteContent";
import type { SiteContent } from "../data/siteContent";
import { WhatsAppButton } from "./WhatsAppButton";

type HeaderProps = {
  content: SiteContent;
};

export function Header({ content }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Regina Machado - inicio">
        <span>{content.brand.name}</span>
        <small>{content.brand.subtitle}</small>
      </a>

      <button
        className="icon-button menu-toggle"
        type="button"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <nav className={`main-nav ${isOpen ? "is-open" : ""}`} aria-label="Navegacao principal">
        {navigation.map((item) => (
          <a href={item.href} key={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
      </nav>

      <WhatsAppButton
        className="header-cta"
        phone={content.contact.whatsapp}
        message={content.contact.whatsappMessage}
      >
        Falar pelo WhatsApp
      </WhatsAppButton>
    </header>
  );
}
