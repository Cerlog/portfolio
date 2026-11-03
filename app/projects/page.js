import WorkRow from "@/components/WorkRow";
import { getAllProjects } from "@/lib/projects";

const description =
  "Thesis work and course projects in machine learning, computer vision and data science by Petr Boska Nylander.";

export const metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: { type: "website", title: "Projects", description, url: "/projects" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const sections = [
    { title: "Theses", items: projects.filter((p) => p.type === "thesis"), small: false },
    { title: "Course projects", items: projects.filter((p) => p.type !== "thesis"), small: true },
  ].filter((s) => s.items.length > 0);

  return (
    <section>
      <h1 className="page-title">Projects</h1>
      <p className="muted" style={{ marginTop: "0.75rem" }}>
        My MSc and BSc theses, and project work from DTU courses.
      </p>

      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="section-title">{section.title}</h2>
          <ul className="figure-list">
            {section.items.map((p) => (
              <WorkRow key={p.slug} project={p} small={section.small} />
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}
