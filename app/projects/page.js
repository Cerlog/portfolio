import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="text-3xl font-medium tracking-tight">Projects</h1>

      <p className="mt-4 leading-relaxed text-neutral-600">
        Coursework, thesis work, and things I built on my own time.
      </p>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
