import cors from "cors";
import express from "express";
import { defaultSiteContent } from "../data/siteContent";
import { buildWhatsappUrl, contactConfig } from "../config/contact";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.get("/api/site", (_request, response) => {
    response.json(defaultSiteContent);
  });

  app.post("/api/contact-link", (request, response) => {
    const message =
      typeof request.body?.message === "string" && request.body.message.trim().length > 0
        ? request.body.message.trim()
        : contactConfig.whatsappMessage;

    response.json({
      url: buildWhatsappUrl(contactConfig.whatsappPhone, message)
    });
  });

  return app;
}
