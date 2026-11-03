import Link from "next/link";
import { VARIANTS, VARIANT_NAMES } from "./_lib";

export default function LabIndex() {
  return (
    <div className="lab">
      <div className="frame">
        <div className="column">
          <h1 className="page-title">Design lab</h1>
          <p className="ui muted" style={{ marginTop: "0.5rem" }}>
            Temporary. Three directions, each applied to the home page and the 02456 page.
          </p>
          <ul className="plain-list" style={{ marginTop: "2rem" }}>
            {VARIANTS.map((v) => (
              <li key={v}>
                {VARIANT_NAMES[v]}: <Link href={`/lab/${v}`}>home</Link> ·{" "}
                <Link href={`/lab/${v}/rstar`}>02456 page</Link>
              </li>
            ))}
            <li>
              <Link href="/lab/type">Typeface comparison</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
