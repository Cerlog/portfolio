import Link from "next/link";
import Split from "../../_components/Split";
import { ArticleHeader, LabSwitcher, TopNav } from "../../_components/parts";
import { VARIANTS, VARIANT_NAMES, getLabRstar } from "../../_lib";

export const dynamicParams = false;

export function generateStaticParams() {
  return VARIANTS.map((v) => ({ v }));
}

export async function generateMetadata({ params }) {
  const { v } = await params;
  return { title: `Lab ${VARIANT_NAMES[v]}: 02456` };
}

export default async function LabRstar({ params }) {
  const { v } = await params;
  const project = await getLabRstar();
  const body = (
    <div className="column">
      <p className="ui" style={{ marginBottom: "2rem" }}>
        <Link href="/projects" className="quiet">All projects</Link>
      </p>
      <ArticleHeader project={project} />
      <article className="article" style={{ marginTop: "2.5rem" }} dangerouslySetInnerHTML={{ __html: project.html }} />
    </div>
  );

  if (v === "c") return <Split>{body}</Split>;

  return (
    <div className={`lab lab-${v}`}>
      <div className="frame">
        <TopNav v={v} />
        {body}
        <footer className="column" style={{ marginTop: "5rem" }}>
          <LabSwitcher v={v} />
        </footer>
      </div>
    </div>
  );
}
