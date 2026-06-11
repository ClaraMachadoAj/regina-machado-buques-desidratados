import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "../data/siteContent";
import { WhatsAppButton } from "./WhatsAppButton";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Regina Machado - inicio">
        <span>Regina Machado</span>
        <small>Buques Desidratados</small>
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

      <WhatsAppButton className="header-cta">Falar pelo WhatsApp</WhatsAppButton>
    </header>
  );
}
