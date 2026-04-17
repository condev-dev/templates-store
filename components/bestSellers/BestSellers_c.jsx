"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Template from "../templates/Template";

import "./index.css";

export default function BestSellers_c({ templates }) {
  const swiperRef = useRef(null);

  if (!templates?.length) return <div>هیچ قالب پرفروشی پیدا نشد.</div>;

  return (
    <section className="w-100 d-flex flex-column my-5 py-5">
      <section className="best-sellers-title d-flex justify-content-center align-items-center w-100 mt-5">
        <h3 className="mt-2">پرفروش‌ترین قالب‌ها</h3>
      </section>

      <section className="best-sellers-container mt-5 pt-5">
        <Swiper
          className="py-5"
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
            0: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
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
