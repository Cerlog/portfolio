import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <SiteChrome>
    <section>
      <h1 className="text-3xl font-medium tracking-tight">Page not found</h1>
      <p className="mt-4 leading-relaxed text-muted">
        This page doesn&apos;t exist, or it has moved.
      </p>
      <p className="mt-8 flex gap-6 text-sm">
        <Link href="/" className="underline decoration-line underline-offset-4 hover:decoration-fg">
          Home
        </Link>
        <Link href="/projects" className="underline decoration-line underline-offset-4 hover:decoration-fg">
          All projects
        </Link>
      </p>
    </section>
    </SiteChrome>
  );
}
