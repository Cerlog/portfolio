import { Source_Serif_4 } from "next/font/google";
import "katex/dist/katex.min.css";
import "./lab.css";

// Temporary design lab. Not linked from the site, not in the sitemap, noindex.
const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-lab-serif",
  display: "swap",
});

export const metadata = {
  title: "Design lab",
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }) {
  return <div className={`${serif.variable} lab-root`}>{children}</div>;
}
