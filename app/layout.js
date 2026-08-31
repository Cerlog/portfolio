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
      <body className="bg-white text-neutral-900 antialiased">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6">
          <header className="flex items-baseline justify-between py-10">
            <Link href="/" className="font-medium tracking-tight">
              {site.name}
            </Link>
            <nav className="flex gap-6 text-sm text-neutral-500">
              <Link href="/" className="hover:text-neutral-900">
                About
              </Link>
              <Link href="/projects" className="hover:text-neutral-900">
                Projects
              </Link>
              <a href={site.cv} className="hover:text-neutral-900">
                CV
              </a>
            </nav>
          </header>

          <main className="flex-1 pb-24">{children}</main>

          <footer className="border-t border-neutral-200 py-8 text-sm text-neutral-400">
            {site.fullName} · {new Date().getFullYear()}
          </footer>
        </div>
      </body>
    </html>
  );
}
