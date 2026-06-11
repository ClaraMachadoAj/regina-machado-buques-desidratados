export const contactConfig = {
  whatsappPhone: "55NUMERODOTELEFONE",
  whatsappMessage:
    "Ola, Regina! Gostaria de saber mais sobre o servico de desidratacao de buque de noiva.",
  instagramUrl: "https://www.instagram.com/",
  email: "contato@reginamachado.com.br"
};

export function buildWhatsappUrl(
  phone = contactConfig.whatsappPhone,
  message = contactConfig.whatsappMessage
) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
