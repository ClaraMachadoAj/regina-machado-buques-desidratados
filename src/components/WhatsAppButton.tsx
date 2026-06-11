import { MessageCircle } from "lucide-react";
import { buildWhatsappUrl } from "../config/contact";

type WhatsAppButtonProps = {
  children: string;
  variant?: "primary" | "ghost" | "floating";
  className?: string;
  phone?: string;
  message?: string;
};

export function WhatsAppButton({
  children,
  variant = "primary",
  className = "",
  phone,
  message
}: WhatsAppButtonProps) {
  return (
    <a
      className={`button button-${variant} ${className}`.trim()}
      href={buildWhatsappUrl(phone, message)}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle aria-hidden="true" size={18} />
      <span>{children}</span>
    </a>
  );
}
