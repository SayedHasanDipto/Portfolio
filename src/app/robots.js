export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://sayedhasandipto.vercel.app/sitemap.xml",
  };
}
