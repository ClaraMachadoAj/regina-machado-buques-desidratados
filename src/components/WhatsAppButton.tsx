import { MessageCircle } from "lucide-react";
import { buildWhatsappUrl } from "../config/contact";

type WhatsAppButtonProps = {
  children: string;
  variant?: "primary" | "ghost" | "floating";
  className?: string;
};

export function WhatsAppButton({
  children,
  variant = "primary",
  className = ""
}: WhatsAppButtonProps) {
  return (
    <a
      className={`button button-${variant} ${className}`.trim()}
      href={buildWhatsappUrl()}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle aria-hidden="true" size={18} />
      <span>{children}</span>
    </a>
  );
}
