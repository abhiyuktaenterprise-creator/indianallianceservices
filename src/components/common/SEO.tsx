import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: "website" | "article";
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const BASE_URL = "https://airportcareersarvices.com";
const DEFAULT_IMAGE = `${BASE_URL}/hero-airport.jpg`;

export default function SEO({
  title,
  description,
  keywords = "Airport Career Services, aviation careers, airport jobs, career counselling, airport ground staff, cabin crew guidance, interview preparation, placement assistance",
  canonical,
  ogType = "website",
  schema,
}: SEOProps) {
  const location = useLocation();
  const canonicalUrl = canonical || `${BASE_URL}${location.pathname === "/" ? "" : location.pathname}`;

  useEffect(() => {
    // 1. Set Title
    document.title = title;

    // Helper to set or update meta tag
    const setMetaTag = (attr: "name" | "property", value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${value}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Standard Meta
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);
    setMetaTag("name", "author", "Airport Career Services");
    setMetaTag("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");

    // Open Graph
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:site_name", "Airport Career Services");
    setMetaTag("property", "og:image", DEFAULT_IMAGE);

    // Twitter
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", DEFAULT_IMAGE);

    // Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonicalUrl);

    // Schema.org JSON-LD scripts
    const existingSchemaScript = document.getElementById("json-ld-page-schema");
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (schema) {
      const script = document.createElement("script");
      script.id = "json-ld-page-schema";
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const dynamicSchema = document.getElementById("json-ld-page-schema");
      if (dynamicSchema) dynamicSchema.remove();
    };
  }, [title, description, keywords, canonicalUrl, ogType, schema]);

  return null;
}
