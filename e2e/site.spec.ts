import { expect, test } from "@playwright/test";

test("visitor can review the offer and reach the contact CTA", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /eternize o buque/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /quero eternizar/i })).toHaveAttribute(
    "href",
    /wa\.me/
  );

  await page.locator("#como-funciona").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: /um processo simples/i })).toBeVisible();

  await page.locator("#contato").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: /vamos cuidar/i })).toBeVisible();
});

test("mobile menu exposes navigation links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: /abrir menu/i }).click();
  await expect(page.getByRole("link", { name: "Galeria" })).toBeVisible();
});

test("Regina can login and save a simple site edit", async ({ page }) => {
  await page.goto("/admin");

  await page.getByLabel("Senha").fill("regina2026");
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page.getByRole("heading", { name: /ola, regina/i })).toBeVisible();

  await page.getByRole("button", { name: /informacoes principais/i }).click();
  await page.getByLabel("Nome da marca").fill("Regina Flores Eternas");
  await page.getByRole("button", { name: /salvar alteracoes/i }).click();
  await expect(page.getByText(/suas alteracoes foram salvas/i)).toBeVisible();

  await page.getByRole("link", { name: /ver como ficou no site/i }).click();
  await expect(page.getByText("Regina Flores Eternas").first()).toBeVisible();
});
