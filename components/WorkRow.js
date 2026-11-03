import Image from "next/image";
import Link from "next/link";

// One project in a figure-led list: its thumbnail, title, blurb and context.
// `small` is the compact version used for the longer course list.
export function workContext(p) {
  const context = p.thesis
    ? `${p.thesis.degree} thesis`
    : p.course
      ? `${p.course.code} ${p.course.name}`
      : null;
  return [context, p.year].filter(Boolean).join(" · ");
}

export default function WorkRow({ project: p, small = false, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  return (
    <li className={small ? "figure-row small" : "figure-row"}>
      <Image
        src={p.thumbnail}
        alt=""
        width={600}
        height={400}
        sizes={small ? "(min-width: 48rem) 160px, 100vw" : "(min-width: 48rem) 240px, 100vw"}
        className="thumb"
      />
      <div>
        <H>
          <Link href={`/projects/${p.slug}`} className="quiet">{p.title}</Link>
        </H>
        <p>{p.blurb}</p>
        <p className="ui muted">{workContext(p)}</p>
      </div>
    </li>
  );
}
