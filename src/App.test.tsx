import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";

describe("App", () => {
  beforeEach(() => {
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
});
