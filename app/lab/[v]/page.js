import HomeColumn from "../_components/HomeColumn";
import HomeSplit from "../_components/HomeSplit";
import { VARIANTS, VARIANT_NAMES } from "../_lib";

export const dynamicParams = false;

export function generateStaticParams() {
  return VARIANTS.map((v) => ({ v }));
}

export async function generateMetadata({ params }) {
  const { v } = await params;
  return { title: `Lab ${VARIANT_NAMES[v]}` };
}

export default async function LabHome({ params }) {
  const { v } = await params;
  return v === "c" ? <HomeSplit /> : <HomeColumn v={v} />;
}
