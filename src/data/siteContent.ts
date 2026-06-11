export type TextBlock = {
  title: string;
  text: string;
};

export type ProcessStep = TextBlock;

export type Benefit = TextBlock & {
  icon: "heart" | "leaf" | "shield" | "package";
};

export type GalleryItem = TextBlock & {
  image: string;
  position: string;
};

export type Testimonial = {
  name: string;
  text: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SiteContent = {
  brand: {
    name: string;
    subtitle: string;
    responsibleName: string;
  };
  contact: {
    whatsapp: string;
    email: string;
    instagram: string;
    location: string;
    whatsappMessage: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    highlight: string;
    image: string;
    imageTag: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    noteTitle: string;
    noteText: string;
  };
  processTitle: {
    eyebrow: string;
    title: string;
    description: string;
  };
  galleryTitle: {
    eyebrow: string;
    title: string;
    description: string;
  };
  beforeAfter: {
    eyebrow: string;
    title: string;
    description: string;
    beforeImage: string;
    beforeLabel: string;
    afterImage: string;
    afterLabel: string;
  };
  benefitsTitle: {
    eyebrow: string;
    title: string;
    description: string;
  };
  testimonialsTitle: {
    eyebrow: string;
    title: string;
  };
  faqTitle: {
    eyebrow: string;
    title: string;
  };
  contactTitle: {
    eyebrow: string;
    title: string;
    text: string;
  };
  processSteps: ProcessStep[];
  gallery: GalleryItem[];
  benefits: Benefit[];
  testimonials: Testimonial[];
  faq: FaqItem[];
  stats: Array<{ value: string; label: string }>;
  heroHighlights: string[];
};

const defaultImage = "/assets/buques-desidratados.png";

export const navigation = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Galeria", href: "#galeria" },
  { label: "Antes e depois", href: "#antes-depois" },
  { label: "Duvidas", href: "#duvidas" },
  { label: "Contato", href: "#contato" }
];

export const defaultSiteContent: SiteContent = {
  brand: {
    name: "Regina Machado",
    subtitle: "Buques Desidratados",
    responsibleName: "Regina Machado"
  },
  contact: {
    whatsapp: "55NUMERODOTELEFONE",
    email: "contato@reginamachado.com.br",
    instagram: "https://www.instagram.com/",
    location: "Atendimento sob combinacao",
    whatsappMessage:
      "Ola, Regina! Gostaria de saber mais sobre o servico de desidratacao de buque de noiva."
  },
  hero: {
    eyebrow: "Flores passam, memorias ficam",
    title: "Eternize o buque do seu casamento",
    subtitle:
      "Seu buque carrega a emocao de um dos dias mais importantes da sua vida. Por meio de um processo artesanal de desidratacao, suas flores se transformam em uma lembranca delicada, afetiva e duradoura.",
    highlight: "Ha 22 anos preservando historias, sonhos e flores.",
    image: defaultImage,
    imageTag: "Do altar para a eternidade"
  },
  about: {
    eyebrow: "Regina Machado",
    title: "Uma historia dedicada a eternizar momentos",
    paragraphs: [
      "Regina Machado trabalha ha mais de 22 anos com a preservacao de buques de noivas, transformando flores naturais em lembrancas cheias de significado.",
      "Cada buque e recebido com cuidado, sensibilidade e atencao aos detalhes. O resultado une memoria, beleza organica e acabamento artesanal."
    ],
    noteTitle: "Atendimento cuidadoso",
    noteText:
      "O buque e tratado como parte da sua historia. Antes de qualquer etapa, Regina orienta sobre envio, conservacao e expectativas do resultado final."
  },
  processTitle: {
    eyebrow: "Como funciona",
    title: "Um processo simples, sensivel e bem acompanhado",
    description:
      "Da entrega das flores ao acabamento final, cada etapa e pensada para preservar o significado do buque."
  },
  galleryTitle: {
    eyebrow: "Galeria",
    title: "Flores preservadas com aparencia romantica e natural",
    description: "Uma direcao visual inspirada em casamento, afeto e pecas feitas a mao."
  },
  beforeAfter: {
    eyebrow: "Antes e depois",
    title: "A transformacao das flores em lembranca",
    description:
      "O processo preserva a memoria do buque e revela uma beleza nova, com tons suaves e textura natural.",
    beforeImage: defaultImage,
    beforeLabel: "Antes: buque natural",
    afterImage: defaultImage,
    afterLabel: "Depois: buque preservado"
  },
  benefitsTitle: {
    eyebrow: "Beneficios",
    title: "Por que preservar o buque?",
    description:
      "A desidratacao transforma as flores em uma lembranca decorativa e cheia de afeto."
  },
  testimonialsTitle: {
    eyebrow: "Depoimentos",
    title: "O que as noivas costumam sentir ao receber"
  },
  faqTitle: {
    eyebrow: "Duvidas frequentes",
    title: "Antes de enviar o seu buque"
  },
  contactTitle: {
    eyebrow: "Contato",
    title: "Vamos cuidar do seu buque?",
    text:
      "Envie uma mensagem com a data do casamento, cidade e fotos do buque. Regina responde com as orientacoes para entrega e orcamento."
  },
  processSteps: [
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
  ],
  gallery: [
    {
      title: "Buques preservados",
      text: "Composicoes delicadas com flores naturais desidratadas.",
      image: defaultImage,
      position: "center"
    },
    {
      title: "Detalhes do altar",
      text: "Texturas, tons e formas preservadas com olhar artesanal.",
      image: defaultImage,
      position: "top"
    },
    {
      title: "Memoria em quadro",
      text: "Uma peca decorativa que guarda o afeto do grande dia.",
      image: defaultImage,
      position: "bottom"
    }
  ],
  benefits: [
    {
      icon: "heart",
      title: "Valor afetivo",
      text: "O buque deixa de ser passageiro e vira uma lembranca fisica de um dia unico."
    },
    {
      icon: "leaf",
      title: "Flores naturais",
      text: "O processo respeita a beleza organica das flores, suas marcas e delicadezas."
    },
    {
      icon: "shield",
      title: "Cuidado experiente",
      text: "Sao mais de 22 anos dedicados a preservar historias, sonhos e flores."
    },
    {
      icon: "package",
      title: "Entrega especial",
      text: "A finalizacao e pensada para encantar e facilitar o armazenamento da lembranca."
    }
  ],
  testimonials: [
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
  ],
  faq: [
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
  ],
  stats: [
    { value: "22+", label: "anos de experiencia" },
    { value: "100%", label: "processo artesanal" },
    { value: "24h", label: "prazo ideal para contato" }
  ],
  heroHighlights: ["Acabamento delicado", "Orientacao antes e depois da festa"]
};
