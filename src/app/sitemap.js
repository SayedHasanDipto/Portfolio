import { projects } from "@/data/projects";

export default function sitemap() {
  const baseUrl = "https://sayedhasandipto.vercel.app";

  // Base routes
  const routes = ["", "/projects"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }));

  // Dynamic project routes
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...routes, ...projectRoutes];
}
