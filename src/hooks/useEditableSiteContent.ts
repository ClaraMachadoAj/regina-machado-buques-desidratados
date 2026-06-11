import { useEffect, useState } from "react";
import type { SiteContent } from "../data/siteContent";
import {
  getStoredSiteContent,
  saveStoredSiteContent,
  SITE_CONTENT_UPDATED_EVENT
} from "../storage/siteContentStorage";

export function useEditableSiteContent() {
  const [content, setContent] = useState<SiteContent>(() => getStoredSiteContent());

  useEffect(() => {
    function syncContent(event: Event) {
      const customEvent = event as CustomEvent<SiteContent>;
      setContent(customEvent.detail ?? getStoredSiteContent());
    }

    window.addEventListener(SITE_CONTENT_UPDATED_EVENT, syncContent);
    window.addEventListener("storage", syncContent);

    return () => {
      window.removeEventListener(SITE_CONTENT_UPDATED_EVENT, syncContent);
      window.removeEventListener("storage", syncContent);
    };
  }, []);

  function saveContent(nextContent: SiteContent) {
    saveStoredSiteContent(nextContent);
    setContent(nextContent);
  }

  return { content, saveContent };
}
