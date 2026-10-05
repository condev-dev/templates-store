export default async function sitemap() {
  const baseUrl = "https://www.condev.ir";

  // Publicly useful, indexable pages only. The account / utility routes (/cart, /profile,
  // /purchases, /auth/signin, /auth/signup) are private or need a session, so they are
  // deliberately NOT offered to Google any more.
  const staticPages = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.6,
  }));

  const templatePages = Array.from({ length: 123 }, (_, i) => ({
    url: `${baseUrl}/template/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...templatePages];
}
