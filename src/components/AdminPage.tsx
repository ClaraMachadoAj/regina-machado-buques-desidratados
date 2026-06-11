import { Eye, LogOut, Plus, RotateCcw, Save, Trash2, Upload } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";
import { defaultSiteContent } from "../data/siteContent";
import type { FaqItem, GalleryItem, SiteContent, Testimonial } from "../data/siteContent";
import { resetStoredSiteContent } from "../storage/siteContentStorage";

const ADMIN_SESSION_KEY = "regina-machado-admin-session";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "regina2026";

type AdminPageProps = {
  content: SiteContent;
  onSave: (content: SiteContent) => void;
};

type PanelSection =
  | "principal"
  | "contato"
  | "textos"
  | "fotos"
  | "antesDepois"
  | "depoimentos"
  | "duvidas";

const sections: Array<{ id: PanelSection; title: string; description: string }> = [
  {
    id: "principal",
    title: "Informacoes principais",
    description: "Nome do site, nome da responsavel e frases curtas."
  },
  {
    id: "contato",
    title: "Contato",
    description: "WhatsApp, e-mail, Instagram e cidade de atendimento."
  },
  {
    id: "textos",
    title: "Textos do site",
    description: "Texto do inicio, sobre Regina e chamada final."
  },
  {
    id: "fotos",
    title: "Fotos dos buques",
    description: "Trocar, adicionar ou remover fotos da galeria."
  },
  {
    id: "antesDepois",
    title: "Antes e depois",
    description: "Escolher as imagens que mostram a transformacao."
  },
  {
    id: "depoimentos",
    title: "Depoimentos de clientes",
    description: "Editar frases de clientes que aparecem no site."
  },
  {
    id: "duvidas",
    title: "Duvidas frequentes",
    description: "Adicionar perguntas e respostas simples."
  }
];

export function AdminPage({ content, onSave }: AdminPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => window.localStorage.getItem(ADMIN_SESSION_KEY) === "true"
  );
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [draft, setDraft] = useState<SiteContent>(content);
  const [activeSection, setActiveSection] = useState<PanelSection>("principal");
  const [successMessage, setSuccessMessage] = useState("");

  const activeTitle = useMemo(
    () => sections.find((section) => section.id === activeSection)?.title ?? "Editar meu site",
    [activeSection]
  );

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password === ADMIN_PASSWORD) {
      window.localStorage.setItem(ADMIN_SESSION_KEY, "true");
      setIsLoggedIn(true);
      setLoginError("");
      return;
    }
    setLoginError("Senha incorreta. Tente novamente com calma.");
  }

  function updateDraft(updater: (current: SiteContent) => SiteContent) {
    setDraft((current) => updater(current));
    setSuccessMessage("");
  }

  function saveChanges() {
    onSave(draft);
    setSuccessMessage("Pronto, Regina! Suas alteracoes foram salvas.");
  }

  function cancelChanges() {
    setDraft(content);
    setSuccessMessage("As alteracoes desta tela foram canceladas.");
  }

  function resetContent() {
    resetStoredSiteContent();
    setDraft(defaultSiteContent);
    onSave(defaultSiteContent);
    setSuccessMessage("O site voltou para os textos e fotos iniciais.");
  }

  if (!isLoggedIn) {
    return (
      <main className="admin-login-page">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <p className="admin-kicker">Painel da Regina</p>
          <h1>Entrar no Painel da Regina</h1>
          <p>Acesse para editar as informacoes do seu site.</p>
          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoFocus
            />
          </label>
          {loginError ? <strong className="admin-error">{loginError}</strong> : null}
          <button className="admin-primary-button" type="submit">
            Entrar
          </button>
          <a className="admin-secondary-button" href="/">
            Ver meu site
          </a>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <div>
          <p className="admin-kicker">Painel da Regina</p>
          <h1>Ola, Regina.</h1>
          <p>Aqui voce pode atualizar as informacoes que aparecem no seu site.</p>
        </div>
        <div className="admin-topbar-actions">
          <a className="admin-secondary-button" href="/">
            <Eye aria-hidden="true" />
            Ver meu site
          </a>
          <button
            className="admin-light-button"
            type="button"
            onClick={() => {
              window.localStorage.removeItem(ADMIN_SESSION_KEY);
              setIsLoggedIn(false);
            }}
          >
            <LogOut aria-hidden="true" />
            Sair
          </button>
        </div>
      </header>

      <section className="admin-layout">
        <nav className="admin-menu" aria-label="Areas para editar">
          {sections.map((section) => (
            <button
              className={section.id === activeSection ? "is-active" : ""}
              type="button"
              key={section.id}
              onClick={() => setActiveSection(section.id)}
            >
              <span>{section.title}</span>
              <small>{section.description}</small>
            </button>
          ))}
        </nav>

        <section className="admin-editor" aria-labelledby="admin-editor-title">
          <div className="admin-editor-heading">
            <div>
              <p className="admin-kicker">Editar</p>
              <h2 id="admin-editor-title">{activeTitle}</h2>
            </div>
            {successMessage ? <strong className="admin-success">{successMessage}</strong> : null}
          </div>

          {activeSection === "principal" ? (
            <PrincipalFields draft={draft} updateDraft={updateDraft} />
          ) : null}
          {activeSection === "contato" ? (
            <ContactFields draft={draft} updateDraft={updateDraft} />
          ) : null}
          {activeSection === "textos" ? <TextFields draft={draft} updateDraft={updateDraft} /> : null}
          {activeSection === "fotos" ? <GalleryFields draft={draft} updateDraft={updateDraft} /> : null}
          {activeSection === "antesDepois" ? (
            <BeforeAfterFields draft={draft} updateDraft={updateDraft} />
          ) : null}
          {activeSection === "depoimentos" ? (
            <TestimonialsFields draft={draft} updateDraft={updateDraft} />
          ) : null}
          {activeSection === "duvidas" ? <FaqFields draft={draft} updateDraft={updateDraft} /> : null}

          <div className="admin-actions">
            <button className="admin-primary-button" type="button" onClick={saveChanges}>
              <Save aria-hidden="true" />
              Salvar alteracoes
            </button>
            <button className="admin-secondary-button" type="button" onClick={cancelChanges}>
              Cancelar
            </button>
            <a className="admin-secondary-button" href="/">
              <Eye aria-hidden="true" />
              Ver como ficou no site
            </a>
            <button className="admin-light-button" type="button" onClick={resetContent}>
              <RotateCcw aria-hidden="true" />
              Voltar ao inicio
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

type FieldProps = {
  draft: SiteContent;
  updateDraft: (updater: (current: SiteContent) => SiteContent) => void;
};

function PrincipalFields({ draft, updateDraft }: FieldProps) {
  return (
    <div className="admin-form-grid">
      <TextInput
        label="Nome da marca"
        value={draft.brand.name}
        onChange={(value) =>
          updateDraft((current) => ({ ...current, brand: { ...current.brand, name: value } }))
        }
      />
      <TextInput
        label="Subtitulo do site"
        value={draft.brand.subtitle}
        onChange={(value) =>
          updateDraft((current) => ({ ...current, brand: { ...current.brand, subtitle: value } }))
        }
      />
      <TextInput
        label="Nome da responsavel"
        value={draft.brand.responsibleName}
        onChange={(value) =>
          updateDraft((current) => ({
            ...current,
            brand: { ...current.brand, responsibleName: value }
          }))
        }
      />
      <TextInput
        label="Frase de destaque"
        value={draft.hero.highlight}
        onChange={(value) =>
          updateDraft((current) => ({ ...current, hero: { ...current.hero, highlight: value } }))
        }
      />
    </div>
  );
}

function ContactFields({ draft, updateDraft }: FieldProps) {
  return (
    <div className="admin-form-grid">
      <TextInput
        label="Digite aqui o numero do WhatsApp"
        value={draft.contact.whatsapp}
        helper="Use DDI e DDD, apenas numeros. Exemplo: 5585999999999."
        onChange={(value) =>
          updateDraft((current) => ({
            ...current,
            contact: { ...current.contact, whatsapp: value }
          }))
        }
      />
      <TextInput
        label="Digite aqui o e-mail de contato"
        value={draft.contact.email}
        onChange={(value) =>
          updateDraft((current) => ({ ...current, contact: { ...current.contact, email: value } }))
        }
      />
      <TextInput
        label="Cole aqui o link do Instagram"
        value={draft.contact.instagram}
        onChange={(value) =>
          updateDraft((current) => ({
            ...current,
            contact: { ...current.contact, instagram: value }
          }))
        }
      />
      <TextInput
        label="Cidade ou local de atendimento"
        value={draft.contact.location}
        onChange={(value) =>
          updateDraft((current) => ({
            ...current,
            contact: { ...current.contact, location: value }
          }))
        }
      />
      <Textarea
        label="Mensagem automatica do WhatsApp"
        value={draft.contact.whatsappMessage}
        onChange={(value) =>
          updateDraft((current) => ({
            ...current,
            contact: { ...current.contact, whatsappMessage: value }
          }))
        }
      />
    </div>
  );
}

function TextFields({ draft, updateDraft }: FieldProps) {
  return (
    <div className="admin-form-grid">
      <TextInput
        label="Frase pequena acima do titulo inicial"
        value={draft.hero.eyebrow}
        onChange={(value) =>
          updateDraft((current) => ({ ...current, hero: { ...current.hero, eyebrow: value } }))
        }
      />
      <TextInput
        label="Titulo principal do inicio do site"
        value={draft.hero.title}
        onChange={(value) =>
          updateDraft((current) => ({ ...current, hero: { ...current.hero, title: value } }))
        }
      />
      <Textarea
        label="Escreva aqui o texto que aparece no inicio do site"
        value={draft.hero.subtitle}
        onChange={(value) =>
          updateDraft((current) => ({ ...current, hero: { ...current.hero, subtitle: value } }))
        }
      />
      <TextInput
        label="Titulo sobre Regina Machado"
        value={draft.about.title}
        onChange={(value) =>
          updateDraft((current) => ({ ...current, about: { ...current.about, title: value } }))
        }
      />
      <Textarea
        label="Texto sobre Regina Machado"
        value={draft.about.paragraphs.join("\n\n")}
        onChange={(value) =>
          updateDraft((current) => ({
            ...current,
            about: {
              ...current.about,
              paragraphs: value.split(/\n\s*\n/).filter(Boolean)
            }
          }))
        }
      />
      <Textarea
        label="Texto final antes do botao de contato"
        value={draft.contactTitle.text}
        onChange={(value) =>
          updateDraft((current) => ({
            ...current,
            contactTitle: { ...current.contactTitle, text: value }
          }))
        }
      />
    </div>
  );
}

function GalleryFields({ draft, updateDraft }: FieldProps) {
  function updateItem(index: number, nextItem: GalleryItem) {
    updateDraft((current) => ({
      ...current,
      gallery: current.gallery.map((item, itemIndex) => (itemIndex === index ? nextItem : item))
    }));
  }

  return (
    <div className="admin-list">
      {draft.gallery.map((item, index) => (
        <article className="admin-repeat-card" key={`${item.title}-${index}`}>
          <ImageField
            label="Escolha uma foto do buque"
            image={item.image}
            onChange={(image) => updateItem(index, { ...item, image })}
          />
          <TextInput
            label="Nome desta foto"
            value={item.title}
            onChange={(value) => updateItem(index, { ...item, title: value })}
          />
          <Textarea
            label="Escreva uma descricao curta"
            value={item.text}
            onChange={(value) => updateItem(index, { ...item, text: value })}
          />
          <button
            className="admin-light-button"
            type="button"
            onClick={() =>
              updateDraft((current) => ({
                ...current,
                gallery: current.gallery.filter((_, itemIndex) => itemIndex !== index)
              }))
            }
          >
            <Trash2 aria-hidden="true" />
            Remover foto
          </button>
        </article>
      ))}
      <button
        className="admin-secondary-button admin-wide-button"
        type="button"
        onClick={() =>
          updateDraft((current) => ({
            ...current,
            gallery: [
              ...current.gallery,
              {
                title: "Nova foto",
                text: "Escreva aqui uma descricao.",
                image: current.hero.image,
                position: "center"
              }
            ]
          }))
        }
      >
        <Plus aria-hidden="true" />
        Adicionar foto na galeria
      </button>
    </div>
  );
}

function BeforeAfterFields({ draft, updateDraft }: FieldProps) {
  return (
    <div className="admin-form-grid">
      <ImageField
        label="Adicionar imagem do antes"
        image={draft.beforeAfter.beforeImage}
        onChange={(image) =>
          updateDraft((current) => ({
            ...current,
            beforeAfter: { ...current.beforeAfter, beforeImage: image }
          }))
        }
      />
      <ImageField
        label="Adicionar imagem do depois"
        image={draft.beforeAfter.afterImage}
        onChange={(image) =>
          updateDraft((current) => ({
            ...current,
            beforeAfter: { ...current.beforeAfter, afterImage: image }
          }))
        }
      />
      <TextInput
        label="Texto que aparece na foto do antes"
        value={draft.beforeAfter.beforeLabel}
        onChange={(value) =>
          updateDraft((current) => ({
            ...current,
            beforeAfter: { ...current.beforeAfter, beforeLabel: value }
          }))
        }
      />
      <TextInput
        label="Texto que aparece na foto do depois"
        value={draft.beforeAfter.afterLabel}
        onChange={(value) =>
          updateDraft((current) => ({
            ...current,
            beforeAfter: { ...current.beforeAfter, afterLabel: value }
          }))
        }
      />
    </div>
  );
}

function TestimonialsFields({ draft, updateDraft }: FieldProps) {
  function updateItem(index: number, nextItem: Testimonial) {
    updateDraft((current) => ({
      ...current,
      testimonials: current.testimonials.map((item, itemIndex) =>
        itemIndex === index ? nextItem : item
      )
    }));
  }

  return (
    <div className="admin-list">
      {draft.testimonials.map((item, index) => (
        <article className="admin-repeat-card" key={`${item.name}-${index}`}>
          <TextInput
            label="Nome da cliente"
            value={item.name}
            onChange={(value) => updateItem(index, { ...item, name: value })}
          />
          <Textarea
            label="Escreva aqui o depoimento de uma cliente"
            value={item.text}
            onChange={(value) => updateItem(index, { ...item, text: value })}
          />
          <button
            className="admin-light-button"
            type="button"
            onClick={() =>
              updateDraft((current) => ({
                ...current,
                testimonials: current.testimonials.filter((_, itemIndex) => itemIndex !== index)
              }))
            }
          >
            <Trash2 aria-hidden="true" />
            Remover depoimento
          </button>
        </article>
      ))}
      <button
        className="admin-secondary-button admin-wide-button"
        type="button"
        onClick={() =>
          updateDraft((current) => ({
            ...current,
            testimonials: [...current.testimonials, { name: "Nome da cliente", text: "Depoimento" }]
          }))
        }
      >
        <Plus aria-hidden="true" />
        Adicionar depoimento
      </button>
    </div>
  );
}

function FaqFields({ draft, updateDraft }: FieldProps) {
  function updateItem(index: number, nextItem: FaqItem) {
    updateDraft((current) => ({
      ...current,
      faq: current.faq.map((item, itemIndex) => (itemIndex === index ? nextItem : item))
    }));
  }

  return (
    <div className="admin-list">
      {draft.faq.map((item, index) => (
        <article className="admin-repeat-card" key={`${item.question}-${index}`}>
          <TextInput
            label="Escreva aqui uma pergunta frequente"
            value={item.question}
            onChange={(value) => updateItem(index, { ...item, question: value })}
          />
          <Textarea
            label="Escreva aqui a resposta dessa pergunta"
            value={item.answer}
            onChange={(value) => updateItem(index, { ...item, answer: value })}
          />
          <button
            className="admin-light-button"
            type="button"
            onClick={() =>
              updateDraft((current) => ({
                ...current,
                faq: current.faq.filter((_, itemIndex) => itemIndex !== index)
              }))
            }
          >
            <Trash2 aria-hidden="true" />
            Remover pergunta
          </button>
        </article>
      ))}
      <button
        className="admin-secondary-button admin-wide-button"
        type="button"
        onClick={() =>
          updateDraft((current) => ({
            ...current,
            faq: [...current.faq, { question: "Nova pergunta", answer: "Escreva a resposta aqui." }]
          }))
        }
      >
        <Plus aria-hidden="true" />
        Adicionar pergunta
      </button>
    </div>
  );
}

function TextInput({
  label,
  value,
  helper,
  onChange
}: {
  label: string;
  value: string;
  helper?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {helper ? <small>{helper}</small> : null}
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} />
    </label>
  );
}

function ImageField({
  label,
  image,
  onChange
}: {
  label: string;
  image: string;
  onChange: (value: string) => void;
}) {
  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="admin-image-field">
      <span>{label}</span>
      <img src={image} alt="Previa da imagem escolhida" />
      <label className="admin-upload-button">
        <Upload aria-hidden="true" />
        Escolher foto
        <input type="file" accept="image/*" onChange={handleImage} />
      </label>
    </div>
  );
}
