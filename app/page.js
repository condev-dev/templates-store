import BestSellers from "@/components/bestSellers/BestSellers";
import Intro from "@/components/intro/Intro";
import Plans from "@/components/plans/Plans";
import TemplateCategory from "@/components/templates/TemplateCategory";

export default function Home() {
  return (
    <>
      <Intro />
      <TemplateCategory title="قالب های فارسی" filterBy="فارسی" />
      <BestSellers />
      <TemplateCategory title="قالب های موبایلی" filterBy="موبایلی" />
      <Plans />
      <TemplateCategory title="قالب های ترکی" filterBy="ترکی" />
    </>
  );
}
