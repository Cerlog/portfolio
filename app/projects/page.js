import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const sections = [
    { title: "Theses", items: projects.filter((p) => p.type === "thesis") },
    { title: "Course projects", items: projects.filter((p) => p.type !== "thesis") },
  ].filter((s) => s.items.length > 0);

  return (
    <section>
      <h1 className="text-3xl font-medium tracking-tight">Projects</h1>

      <p className="mt-4 leading-relaxed text-muted">
        Coursework, thesis work, and things I built on my own time.
      </p>

      {sections.map((section) => (
        <section key={section.title} className="mt-14">
          <h2 className="text-xl font-medium tracking-tight">{section.title}</h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            {section.items.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
