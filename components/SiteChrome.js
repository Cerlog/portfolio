import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

function Footer() {
  return (
    <p className="ui muted">
      {site.fullName} · {new Date().getFullYear()}
    </p>
  );
}

// Left column (photo, name, role, bio, navigation, CV and contact links) and
// the main column. On phones the two stack.
export default function SiteChrome({ children }) {
  return (
    <div className="shell">
      <aside className="side">
        <Image
          src={site.photo}
          alt={site.fullName}
          width={192}
          height={256}
          sizes="96px"
          className="portrait"
          priority
        />
        <p className="name">
          <Link href="/" className="quiet" style={{ textDecoration: "none" }}>
            {site.fullName}
          </Link>
        </p>
        <p className="ui muted" style={{ marginTop: "0.35rem" }}>
          {site.role}
        </p>
        <p className="bio">{site.bio}</p>
        <nav className="ui" aria-label="Main">
          <Link href="/#work" className="quiet">Work</Link>
          <Link href="/#about" className="quiet">About</Link>
          <Link href="/projects" className="quiet">All projects</Link>
        </nav>
        <nav className="ui" aria-label="CV and contact">
          <a href={site.cv.en} hrefLang="en">CV (English)</a>
          <a href={site.cv.da} hrefLang="da">CV (dansk)</a>
          {site.links.map((l) => (
            <a key={l.label} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <div className="side-foot">
          <Footer />
        </div>
      </aside>

      <main className="main">
        {children}
        <footer className="site-footer">
          <Footer />
        </footer>
      </main>
    </div>
  );
}
