import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
    >
      <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-neutral-100">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover"
        />
      </div>

      <h3 className="mt-3 font-medium tracking-tight group-hover:underline">
        {project.title}
      </h3>

      <p className="mt-1 text-sm leading-relaxed text-neutral-600">
        {project.blurb}
      </p>

      <p className="mt-2 text-xs text-neutral-400">
        {[...project.tags, project.year].filter(Boolean).join(" · ")}
      </p>
    </Link>
  );
}
