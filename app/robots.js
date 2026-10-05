// Served at https://www.condev.ir/robots.txt
// Crawling is allowed everywhere and the sitemap is declared, so Google can discover every
// /template/<id> page. The pages themselves stay crawlable on purpose: they carry a canonical
// pointing at their own https://www.condev.ir/template/<id> URL, and blocking them would stop
// Google from ever reading that canonical.
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.condev.ir/sitemap.xml",
    host: "https://www.condev.ir",
  };
}
