import request from "supertest";
import { describe, expect, it } from "vitest";
import { createServer } from "./app";

describe("createServer", () => {
  const app = createServer();

  it("returns health status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("returns public site content", async () => {
    const response = await request(app).get("/api/site");

    expect(response.status).toBe(200);
    expect(response.body.processSteps).toHaveLength(4);
    expect(response.body.faqs.length).toBeGreaterThan(0);
    expect(response.body.testimonials.length).toBeGreaterThan(0);
  });

  it("returns a contact link using a custom message", async () => {
    const response = await request(app)
      .post("/api/contact-link")
      .send({ message: "Quero preservar meu buque" });

    expect(response.status).toBe(200);
    expect(response.body.url).toContain("https://wa.me/");
    expect(response.body.url).toContain("Quero%20preservar%20meu%20buque");
  });
});
