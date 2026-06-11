import { expect, test } from "@playwright/test";

test("visitor can review the offer and reach the contact CTA", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /eternize o buque/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /quero eternizar/i })).toHaveAttribute(
    "href",
    /wa\.me/
  );

  await page.getByRole("link", { name: "Como funciona" }).click();
  await expect(page.getByRole("heading", { name: /um processo simples/i })).toBeVisible();

  await page.getByRole("link", { name: "Contato" }).click();
  await expect(page.getByRole("heading", { name: /vamos cuidar/i })).toBeVisible();
});

test("mobile menu exposes navigation links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: /abrir menu/i }).click();
  await expect(page.getByRole("link", { name: "Galeria" })).toBeVisible();
});
