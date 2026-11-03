import { Newsreader, STIX_Two_Text } from "next/font/google";
import { renderLabMarkdown } from "../_lib";

const stix = STIX_Two_Text({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], display: "swap" });
const news = Newsreader({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], display: "swap" });

export const metadata = { title: "Lab: typefaces" };

// The same text in each candidate serif, next to KaTeX maths and a caption.
// Text taken from the 02456 and 02460 pages.
const SAMPLE = `Benchmarks such as GSM8K may flatter a model if some of the test questions
leaked into its training data. We checked how much of rStar's accuracy survives
when the questions change but the maths stays the same. The geodesics minimise
the energy averaged over random pairs of decoders $f_l, f_k$:

$$
\\mathcal{E}(c) \\approx \\sum_{i=0}^{N-1} \\mathbb{E}_{l,k} \\bigl\\| f_l(c(t_i)) - f_k(c(t_{i+1})) \\bigr\\|^2
$$`;

const FACES = [
  { name: "Source Serif 4", note: "Sturdy, optical sizes, closest in weight to KaTeX. Used in A, B and C.", style: { fontFamily: "var(--font-serif)" } },
  { name: "STIX Two Text", note: "Made for scientific publishing; closest in form to KaTeX, more formal.", style: stix.style },
  { name: "Newsreader", note: "Warmer and more literary, optical sizes.", style: news.style },
];

export default async function TypeLab() {
  const html = await renderLabMarkdown(SAMPLE);
  return (
    <div className="lab">
      <div className="frame">
        <div className="column">
          <h1 className="page-title">Typefaces</h1>
          {FACES.map((f) => (
            <section key={f.name} className="specimen" style={{ ...f.style, marginTop: "2rem" }}>
              <h2 style={{ fontSize: "var(--step-1)" }}>{f.name}</h2>
              <p className="ui muted" style={{ marginTop: "0.25rem" }}>{f.note}</p>
              <div className="article" style={{ marginTop: "1rem" }} dangerouslySetInnerHTML={{ __html: html }} />
              <p style={{ marginTop: "1rem", fontStyle: "italic", fontSize: "var(--step--1)" }} className="muted">
                Figure 2. Average accuracy of rStar&apos;s discriminator and majority vote in each experiment.
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
