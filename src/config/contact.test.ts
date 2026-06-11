import { describe, expect, it } from "vitest";
import { buildWhatsappUrl } from "./contact";

describe("buildWhatsappUrl", () => {
  it("builds an encoded WhatsApp URL", () => {
    const url = buildWhatsappUrl("5585999999999", "Ola, quero um orcamento");

    expect(url).toBe("https://wa.me/5585999999999?text=Ola%2C%20quero%20um%20orcamento");
  });
});
