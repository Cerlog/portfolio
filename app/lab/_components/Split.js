import Link from "next/link";
import { site } from "@/data/site";
import { plainText } from "../_lib";
import { LabSwitcher } from "./parts";

// Direction C: fixed left column with name, short bio, navigation and CV.
export default function Split({ children }) {
  return (
    <div className="lab lab-c">
      <div className="split">
        <aside className="side">
          <p className="name" style={{ fontWeight: 600, lineHeight: 1.2 }}>
            <Link href="/lab/c" className="quiet" style={{ textDecoration: "none" }}>
              {site.fullName}
            </Link>
          </p>
          <p className="ui muted" style={{ marginTop: "0.5rem" }}>{site.role}</p>
          <p className="bio">{plainText(site.intro[0])}</p>
          <nav className="ui" aria-label="Main">
            <Link href="/lab/c#work" className="quiet">Work</Link>
            <Link href="/lab/c#about" className="quiet">About</Link>
            <Link href="/projects" className="quiet">All projects</Link>
          </nav>
          <nav className="ui secondary" aria-label="Contact and CV">
            <a href={site.cv.en} hrefLang="en">CV (English)</a>
            <a href={site.cv.da} hrefLang="da">CV (dansk)</a>
            {site.links.map((l) => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <div className="side-foot" style={{ paddingTop: "2rem" }}>
            <LabSwitcher v="c" />
          </div>
        </aside>
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
