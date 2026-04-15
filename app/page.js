import BestSellers from "@/components/bestSellers/BestSellers";
import Intro from "@/components/intro/Intro";
import Plans from "@/components/plans/Plans";
import TemplateCategory from "@/components/templates/TemplateCategory";

export default function Home() {
  return (
    <>
      <Intro />
      <TemplateCategory title="قالب های فارسی" />
      <BestSellers />
      <TemplateCategory title="قالب های موبایلی" />
      <Plans />
      <TemplateCategory title="قالب های ترکی" />
    </>
  );
}
