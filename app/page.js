import BestSellers_s from "@/components/bestSellers/BestSellers_s";
import Intro from "@/components/intro/Intro";
import Plans from "@/components/plans/Plans";
import TemplateCategory from "@/components/templates/TemplateCategory";

export default function Home() {
  // const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

  // const { data, error, isLoading } = useSWR("/api/users", fetcher);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading data</div>;

  // console.log(data);

  return (
    <>
      {/* <div>{data.title}</div>; */}
      <Intro />
      <TemplateCategory title="قالب های فارسی" filterBy="فارسی" />
      <BestSellers_s />
      <TemplateCategory title="قالب های موبایلی" filterBy="موبایلی" />
      <Plans />
      <TemplateCategory title="قالب های ترکی" filterBy="ترکی" />
    </>
  );
}
