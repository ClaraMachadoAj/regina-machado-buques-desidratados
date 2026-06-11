import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.pushState({}, "", "/");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(new Promise(() => undefined))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the main commercial sections", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /eternize o buque do seu casamento/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /um processo simples/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /por que preservar o buque/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /vamos cuidar do seu buque/i })).toBeInTheDocument();
  });

  it("opens and closes the mobile navigation", async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole("button", { name: /abrir menu/i });
    await user.click(button);

    expect(screen.getByRole("button", { name: /fechar menu/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );

    await user.click(screen.getByRole("link", { name: "Sobre" }));

    expect(screen.getByRole("button", { name: /abrir menu/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("renders WhatsApp CTAs with encoded links", () => {
    render(<App />);

    const links = screen.getAllByRole("link", { name: /whatsapp|orcamento|eternizar/i });

    expect(links.length).toBeGreaterThan(1);
    expect(links[0]).toHaveAttribute("href", expect.stringContaining("https://wa.me/"));
    expect(links[0]).toHaveAttribute("href", expect.stringContaining("Gostaria%20de%20saber"));
  });

  it("protects the Regina admin area with a simple login", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/admin");

    render(<App />);

    expect(screen.getByRole("heading", { name: /entrar no painel da regina/i })).toBeInTheDocument();

    await user.type(screen.getByLabelText("Senha"), "regina2026");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(screen.getByRole("heading", { name: /ola, regina/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /contato/i })).toBeInTheDocument();
  });

  it("saves an admin edit and shows it on the public site", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/admin");

    const { unmount } = render(<App />);

    await user.type(screen.getByLabelText("Senha"), "regina2026");
    await user.click(screen.getByRole("button", { name: "Entrar" }));
    await user.click(screen.getByRole("button", { name: /informacoes principais/i }));
    expect(screen.getByText("Foto principal da capa do site")).toBeInTheDocument();

    const brandInput = screen.getByLabelText("Nome da marca");
    await user.clear(brandInput);
    await user.type(brandInput, "Regina Flores Eternas");
    await user.click(screen.getByRole("button", { name: /salvar alteracoes/i }));

    expect(screen.getByText(/suas alteracoes foram salvas/i)).toBeInTheDocument();

    unmount();
    window.history.pushState({}, "", "/");
    render(<App />);

    expect(screen.getByText("Regina Flores Eternas")).toBeInTheDocument();
  });

  it("lets Regina review editable admin sections", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/admin");

    render(<App />);

    await user.type(screen.getByLabelText("Senha"), "regina2026");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await user.click(screen.getByRole("button", { name: /contato/i }));
    expect(screen.getByLabelText(/numero do whatsapp/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem automatica/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /textos do site/i }));
    expect(screen.getByLabelText(/texto que aparece no inicio/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /fotos dos buques/i }));
    await user.click(screen.getByRole("button", { name: /adicionar foto na galeria/i }));
    expect(screen.getByDisplayValue("Nova foto")).toBeInTheDocument();
    const removePhotoButtons = screen.getAllByRole("button", { name: /remover foto/i });
    await user.click(removePhotoButtons[removePhotoButtons.length - 1]);

    await user.click(screen.getByRole("button", { name: /antes e depois/i }));
    expect(screen.getByText("Adicionar imagem do antes")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /depoimentos de clientes/i }));
    await user.click(screen.getByRole("button", { name: /adicionar depoimento/i }));
    expect(screen.getByDisplayValue("Nome da cliente")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /duvidas frequentes/i }));
    await user.click(screen.getByRole("button", { name: "Adicionar pergunta" }));
    expect(screen.getByDisplayValue("Nova pergunta")).toBeInTheDocument();
  });
});
