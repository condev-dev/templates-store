"use client";
import Link from "next/link";
import Template from "../templates/Template";
import "./index.css";
import { useEffect, useState } from "react";

const BestSellers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topSellers, setTopSellers] = useState([]);
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
  //
  const fetchTemplates = async () => {
    try {
      const res = await fetch(`${BaseUrl}/api/templates`, {
        cache: "no-store",
      });
      const data = await res.json();

      const sortedData = data.sort((a, b) => {
        const sellCountA = parseInt(a.sell_count) || 0;
        const sellCountB = parseInt(b.sell_count) || 0;
        return sellCountB - sellCountA;
      });

      const top3Sellers = sortedData.slice(0, 3);

      setTopSellers(top3Sellers);
    } catch (err) {
      toast.error("خط در بارگیری اطلاعات");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  if (isLoading) {
    return <h1>در حال لود</h1>;
  }

  if (!isLoading && !topSellers) {
    return <h1>هیچ موردی یافت نشد !</h1>;
  }

  return (
    <section className=" w-100 d-flex flex-column my-5">
      <section className="best-sellers-title d-flex justify-content-center align-items-center w-100 mt-5">
        <h3 className="mt-2">پرفروش ترین قالب ها</h3>
      </section>

      <section className="best-sellers-container gap-4 mt-5 p-5">
        {topSellers?.map((template) => (
          <Template
            key={template.id}
            image={template.image}
            title={template.title}
            categories={template.categories}
            price={template.price}
            id={template.id}
          />
        ))}
      </section>
    </section>
  );
};

export default BestSellers;
