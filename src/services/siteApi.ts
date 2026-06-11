import { defaultSiteContent } from "../data/siteContent";
import type { SiteContent } from "../data/siteContent";

export const fallbackSiteContent: SiteContent = defaultSiteContent;

export async function fetchSiteContent(): Promise<SiteContent> {
  const response = await fetch("/api/site");

  if (!response.ok) {
    throw new Error("Nao foi possivel carregar o conteudo do site.");
  }

  return response.json() as Promise<SiteContent>;
}
