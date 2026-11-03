import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="column">
        <h1 className="page-title">Page not found</h1>
        <p className="muted" style={{ marginTop: "0.75rem" }}>
          This page doesn&apos;t exist, or it has moved.
        </p>
        <p className="ui" style={{ marginTop: "1.5rem", display: "flex", gap: "1.5rem" }}>
          <Link href="/">Home</Link>
          <Link href="/projects">All projects</Link>
        </p>
      </section>
    </SiteChrome>
  );
}
