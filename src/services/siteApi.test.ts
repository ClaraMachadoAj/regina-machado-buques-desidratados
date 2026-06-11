import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchSiteContent } from "./siteApi";

describe("fetchSiteContent", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads site content from the API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ brand: { name: "Teste" } })
      })
    );

    await expect(fetchSiteContent()).resolves.toEqual({ brand: { name: "Teste" } });
  });

  it("throws when the API response fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    await expect(fetchSiteContent()).rejects.toThrow(/carregar o conteudo/i);
  });
});
