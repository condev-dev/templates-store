import Link from "next/link";
import BestSellers_s from "@/components/bestSellers/BestSellers_s";
import Categories from "@/components/categories/Categories";
import Intro from "@/components/intro/Intro";
import Plans from "@/components/plans/Plans";
import TemplateCategory from "@/components/templates/TemplateCategory";
import TemplateGames from "@/components/templates/TemplateGames";

// The home page keeps its explicit canonical now that the root layout no longer sets one.
export const metadata = {
  alternates: {
    canonical: "https://www.condev.ir",
  },
};

export default function Home() {
  // const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

  // const { data, error, isLoading } = useSWR("/api/users", fetcher);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading data</div>;

  return (
    <>
      {/* <div>{data.title}</div>; */}
      <Intro />
      <TemplateCategory title="قالب های فارسی" filterBy="لندینگ فارسی" />
      <Categories />
      <BestSellers_s />
      <TemplateCategory title="قالب های بایو" filterBy="بایو" />
      <Plans />
      <TemplateGames />
      <TemplateCategory title="قالب های ترکی" filterBy="ترکی" />

      {/* The catalogue on /templates links every single template, so pointing the home page at
          it gives the pages that had no internal link at all a way to be discovered. */}
      <section className="d-flex justify-content-center mt-4 mt-sm-5 pt-4">
        <Link href="/templates" className="btn-main btn-color shadow-sm">
          مشاهده همه قالب ها
        </Link>
      </section>
    </>
  );
}
