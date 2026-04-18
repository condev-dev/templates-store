"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Template from "../templates/TemplateItem";

import "./index.css";

export default function BestSellers_c({ templates }) {
  const swiperRef = useRef(null);

  if (!templates?.length) return <div>هیچ قالب پرفروشی پیدا نشد.</div>;

  return (
    <section className="w-100 d-flex flex-column mt-3 my-sm-5 py-md-5 best-sellers-main-container">
      <section className="best-sellers-title d-flex justify-content-center align-items-center w-100 mt-5">
        <h3 className="mt-2">پرفروش‌ترین قالب‌ها</h3>
      </section>

      <section className="best-sellers-container pt-sm-4 mt-md-5 pt-md-5">
        <Swiper
          className="pt-4 pb-1 mt-3 mt-md-0 py-sm-5"
          modules={[Autoplay]}
          ref={swiperRef}
          slidesPerView={3}
          spaceBetween={20}
          loop
          centeredSlides
          autoplay={{
            delay: 5700,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            1: { slidesPerView: 1, spaceBetween: 0 },
            490: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1100: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          {templates.slice(0, 10).map((template) => (
            <SwiperSlide key={template.id}>
              <Template {...template} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  );
}
