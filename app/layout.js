import { Inter } from "next/font/google";
import Link from "next/link";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-bg text-fg antialiased">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6">
          <header className="flex items-baseline justify-between py-10">
            <Link href="/" className="font-medium tracking-tight">
              {site.name}
            </Link>
            <nav className="flex gap-6 text-sm text-muted">
              <Link href="/" className="hover:text-fg">
                About
              </Link>
              <Link href="/projects" className="hover:text-fg">
                Projects
              </Link>
              <a href={site.cv.en} hrefLang="en" className="hover:text-fg">
                CV
              </a>
            </nav>
          </header>

          <main className="flex-1 pb-24">{children}</main>

          <footer className="border-t border-line py-8 text-sm text-muted">
            {site.fullName} · {new Date().getFullYear()}
          </footer>
        </div>
      </body>
    </html>
  );
}
