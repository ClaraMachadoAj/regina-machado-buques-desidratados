import { useEffect, useState } from "react";
import { fallbackSiteContent, fetchSiteContent } from "../services/siteApi";
import type { SiteContent } from "../data/siteContent";

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(fallbackSiteContent);
  const [status, setStatus] = useState<"idle" | "ready" | "fallback">("idle");

  useEffect(() => {
    let isMounted = true;

    fetchSiteContent()
      .then((data) => {
        if (isMounted) {
          setContent(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus("fallback");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { content, status };
}
