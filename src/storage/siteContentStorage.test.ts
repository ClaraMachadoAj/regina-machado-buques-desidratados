import { afterEach, describe, expect, it } from "vitest";
import { defaultSiteContent } from "../data/siteContent";
import {
  getStoredSiteContent,
  resetStoredSiteContent,
  saveStoredSiteContent
} from "./siteContentStorage";

describe("siteContentStorage", () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("returns the default content when nothing was saved", () => {
    expect(getStoredSiteContent().brand.name).toBe(defaultSiteContent.brand.name);
  });

  it("saves and loads edited content", () => {
    saveStoredSiteContent({
      ...defaultSiteContent,
      brand: { ...defaultSiteContent.brand, name: "Regina Flores Eternas" }
    });

    expect(getStoredSiteContent().brand.name).toBe("Regina Flores Eternas");
  });

  it("resets saved content", () => {
    saveStoredSiteContent({
      ...defaultSiteContent,
      brand: { ...defaultSiteContent.brand, name: "Outro nome" }
    });

    resetStoredSiteContent();

    expect(getStoredSiteContent().brand.name).toBe(defaultSiteContent.brand.name);
  });
});
