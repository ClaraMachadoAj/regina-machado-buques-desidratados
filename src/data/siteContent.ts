import { Heart, Leaf, PackageCheck, ShieldCheck, Sparkles, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProcessStep = {
  title: string;
  text: string;
};

export type Benefit = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export type GalleryItem = {
  title: string;
  text: string;
  position: string;
};

export const navigation = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Galeria", href: "#galeria" },
  { label: "Duvidas", href: "#duvidas" },
  { label: "Contato", href: "#contato" }
];

export const processSteps: ProcessStep[] = [
  {
    title: "Envio ou entrega do buque",
    text: "A noiva combina a melhor forma de entregar as flores, de preferencia logo apos a celebracao."
  },
  {
    title: "Avaliacao artesanal",
    text: "Cada flor e analisada com cuidado para definir o melhor caminho de desidratacao e preservacao."
  },
  {
    title: "Secagem e composicao",
    text: "As flores passam por um processo delicado e sao reorganizadas para valorizar textura, cor e memoria."
  },
  {
    title: "Entrega da lembranca",
    text: "O buque retorna em uma composicao afetiva, pronta para decorar e contar a historia do casamento."
  }
];

export const galleryItems: GalleryItem[] = [
  {
    title: "Buques preservados",
    text: "Composicoes delicadas com flores naturais desidratadas.",
    position: "center"
  },
  {
    title: "Detalhes do altar",
    text: "Texturas, tons e formas preservadas com olhar artesanal.",
    position: "top"
  },
  {
    title: "Memoria em quadro",
    text: "Uma peca decorativa que guarda o afeto do grande dia.",
    position: "bottom"
  }
];

export const benefits: Benefit[] = [
  {
    icon: Heart,
    title: "Valor afetivo",
    text: "O buque deixa de ser passageiro e vira uma lembranca fisica de um dia unico."
  },
  {
    icon: Leaf,
    title: "Flores naturais",
    text: "O processo respeita a beleza organica das flores, suas marcas e delicadezas."
  },
  {
    icon: ShieldCheck,
    title: "Cuidado experiente",
    text: "Sao mais de 22 anos dedicados a preservar historias, sonhos e flores."
  },
  {
    icon: PackageCheck,
    title: "Entrega especial",
    text: "A finalizacao e pensada para encantar e facilitar o armazenamento da lembranca."
  }
];

export const testimonials = [
  {
    name: "Mariana A.",
    text: "Quando recebi meu buque, parecia que um pedacinho do casamento tinha voltado para casa."
  },
  {
    name: "Camila R.",
    text: "O cuidado da Regina fez toda a diferenca. Ficou delicado, romantico e cheio de significado."
  },
  {
    name: "Juliana M.",
    text: "Foi uma das escolhas mais bonitas do pos-casamento. Hoje meu buque faz parte da decoracao."
  }
];

export const faqs = [
  {
    question: "Quanto tempo depois do casamento devo enviar o buque?",
    answer:
      "O ideal e combinar a entrega o quanto antes, preferencialmente nas primeiras 24 a 48 horas, para preservar melhor as flores."
  },
  {
    question: "Todas as flores podem ser desidratadas?",
    answer:
      "A maioria das flores pode passar pelo processo, mas o resultado varia conforme especie, estado das petalas e umidade."
  },
  {
    question: "O buque fica igual ao original?",
    answer:
      "A desidratacao transforma tons e textura de forma natural. A proposta e preservar a memoria com delicadeza, nao congelar a flor no tempo."
  },
  {
    question: "Como solicito um orcamento?",
    answer:
      "O atendimento e feito pelo WhatsApp. Envie fotos do buque, data do casamento e cidade para receber orientacoes."
  }
];

export const stats = [
  { value: "22+", label: "anos de experiencia" },
  { value: "100%", label: "processo artesanal" },
  { value: "24h", label: "prazo ideal para contato" }
];

export const heroHighlights = [
  { icon: Sparkles, text: "Acabamento delicado" },
  { icon: Timer, text: "Orientacao antes e depois da festa" }
];
