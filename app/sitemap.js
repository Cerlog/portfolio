import { getAllProjects } from "@/lib/projects";
import { site } from "@/data/site";

// No lastModified: the deploy checkout gives every file a fresh date, so it
// would be wrong. Drafts are already excluded from production builds.
export default function sitemap() {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/projects`, priority: 0.8 },
    ...getAllProjects().map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      priority: p.featured ? 0.7 : 0.5,
    })),
  ];
}
