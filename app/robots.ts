import type { MetadataRoute } from "next";

/**
 * robots.txt — allow the public site, but keep the internal component library
 * (/lab and its previews) and the Studio out of search engines. The /lab pages
 * also send a `noindex` robots meta tag as a second layer.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/lab", "/lab/", "/studio"],
    },
  };
}
