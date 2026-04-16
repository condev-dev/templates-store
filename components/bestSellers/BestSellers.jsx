"use client";
import Template from "../templates/Template";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./index.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const BestSellers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allTemplates, setAllTemplates] = useState([]);
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const swiperRef = useRef(null);
  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BaseUrl}/api/templates`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch templates");
      }
      const data = await res.json();

      const sortedData = data.sort((a, b) => {
        const sellCountA = parseInt(a.sell_count) || 0;
        const sellCountB = parseInt(b.sell_count) || 0;
        return sellCountB - sellCountA;
      });

      // حالا همه قالب‌های مرتب شده را ذخیره می‌کنیم
      setAllTemplates(sortedData);
    } catch (err) {
      console.error("Error fetching templates:", err);
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

  if (!isLoading && (!allTemplates || allTemplates.length === 0)) {
    return <h1>هیچ قالبی یافت نشد !</h1>;
  }

  return (
    <section className=" w-100 d-flex flex-column my-5 py-5">
      <section className="best-sellers-title d-flex justify-content-center align-items-center w-100 mt-5">
        <h3 className="mt-2">پرفروش ترین قالب ها</h3>
      </section>

      <section className="best-sellers-container mt-5 pt-5">
        <Swiper
          className="py-5"
          modules={[Autoplay]}
          ref={swiperRef}
          slidesPerView={3}
          spaceBetween={20}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 5700,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {allTemplates?.slice(0, 10).map((template) => (
            <SwiperSlide key={template.id} className="template-slide">
              <Template
                image={template.image}
                title={template.title}
                categories={template.categories}
                price={template.price}
                id={template.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  );
};

export default BestSellers;
