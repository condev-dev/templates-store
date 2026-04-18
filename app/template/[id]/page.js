"use client";
import { FaCheck } from "react-icons/fa";
import "./index.css";
import AddToCart from "@/components/templates/AddToCart";
import FaNumber from "@/components/common/FaNumber";
import Toman from "@/components/common/Toman";
import { fetcher } from "@/services/api";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { lazy, use } from "react";
import Link from "next/link";
import Intro from "@/components/intro/Intro";
import Image from "next/image";
const Template = ({ params }) => {
  const { id } = use(params);

  const { data, error, isLoading } = useSWR(
    `templates?templateId=${id}`,
    fetcher,
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <section className="d-flex flex-column mt-4">
      {/* Title */}
      <section className="w-100 d-flex justify-content-start align-items-center single-template-title mt-3">
        <h4>{data?.title}</h4>
      </section>

      <section className="w-100 d-flex flex-column">
        {/* Intro */}
        <section className="w-100 d-flex justify-content-between align-items-start single-template mt-4 pt-2">
          <section className="w-75 ps-4">
            <Image
              src={data?.image}
              alt={data?.title}
              width={1200}
              height={600}
              loading="lazy"
              className="w-100 shadow-sm"
            />
          </section>

          <section className="d-flex flex-column single-template-information p-4 w-25 shadow-sm">
            <div className="single-template-price mt-3 mb-4">
              <h5 className="w-100 d-flex justify-content-center align-items-center gap-2">
                <FaNumber number={data?.price} />
                <Toman size={28} />
              </h5>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-start px-1">
              <FaCheck size={12} className="ms-2 mb-2" />
              <p>رده بندی: قالب شرکتی وردپرس</p>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-start px-1 mt-3 pt-1">
              <FaCheck size={12} className="ms-2 mb-2" />
              <p>تاریخ آخرین تست: ۶ اسفند ۱۴۰۴</p>
            </div>{" "}
            <div className="w-100 d-flex align-items-center justify-content-start px-1 mt-3 pt-1">
              <FaCheck size={12} className="ms-2 mb-2" />
              <p>سازگار با وردپرس: ۶.۷ و بالاتر</p>
            </div>{" "}
            <div className="w-100 d-flex align-items-center justify-content-start px-1 mt-3 pt-1">
              <FaCheck size={12} className="ms-2 mb-2" />
              <p>نصب آسان و سریع</p>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-start px-1 mt-3 pt-1 mb-3">
              <FaCheck size={12} className="ms-2 mb-2" />
              <p>6 ماه پشتیبانی رایگان حرفه‌ای</p>
            </div>
            <Link
              href={data?.demo_url}
              className="w-100 btn-main btn-light mt-4 mb-3 "
            >
              پیشنمایش قالب
            </Link>
            <AddToCart templateId={data?.id} />
          </section>
        </section>
        {/* Show All Image , ... */}

        <section className="w-100 mt-4 single-template-description ">
          <section className="d-flex align-items-start justify-content-start flex-column mt-5 mb-4 pb-1 single-template-description-title">
            <h4>یکی از بهترین قالب های فروشگاهی در سطح جهان</h4>

            <p className="mt-4 ">
              {" "}
              این حجم از فروش و رضایت کاربران شانسی و اتفاقی بدست نمی آید. شاید
              این شرکت هم مانند تیم ابزار وردپرس هدفی جز رضایت کاربران خود
              نداشته باشد و با ارائه هر نوع قالب وردپرس با ارائه هر نوع قالب
              وردپرس با ارائه هر نوع قالب وردپرس و محصول بی کیفیتی ، کیفیت کار
              خود را پایین نیاورد و صرفا به انتشار محصولاتی بپردازد که رضایت و
              لذت کاربر را به همراه داشته باشد. قالب WoodMart که توسط تیم
              قدرتمند ابزار وردپرس کاملا بومی سازی و راستچین شده.
            </p>
          </section>

          <section className="w-100 d-flex justify-content-between align-items-center single-template-title pb-2 ">
            <h4>پیشنمایش کامل قالب</h4>
            <button className="btn-main btn-color shadow-lg"> دمو زنده</button>
          </section>

          <Image
            src={data?.image}
            alt={data?.title}
            width={1400}
            height={6000}
            loading="lazy"
            className="w-100 shadow-sm mt-4"
          />
        </section>
      </section>
    </section>
  );
};

export default Template;
