import { FaCheck } from "react-icons/fa";
import "./index.css";
import AddToCart from "@/components/templates/AddToCart";
import FaNumber from "@/components/common/FaNumber";
import Toman from "@/components/common/Toman";
import Link from "next/link";
import Image from "next/image";
const Template = async ({ params }) => {
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { id } = await params;

  const res = await fetch(`${BaseUrl}/api/templates?templateId=${id}`, {
    cache: "no-store",
  });
  const data = res.ok ? await res.json() : null;
  
  // Empty
  if(data.length <= 0) return <div> این قالب پیدا نشد. </div>

  return (
    <section className="d-flex flex-column mt-4">
      {/* Title */}
      <section className="w-100 d-flex justify-content-start align-items-center single-template-title mt-3">
        <h4>{data?.title}</h4>
      </section>

      <section className="w-100 d-flex flex-column">
        {/* Intro */}
        <section className="w-100 d-flex justify-content-between align-items-start flex-column flex-lg-row single-template mt-4 pt-2">
          <section className="w-75 ps-4 single-template-image-container">
            <Image
              src={data?.image}
              alt={data?.title}
              width={1200}
              height={600}
              loading="lazy"
              className="w-100 shadow-sm"
            />
          </section>

          <section className="d-flex flex-column single-template-information p-4 mt-4 mt-lg-0 w-25 shadow-sm">
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

        <section className="w-100 mb-3 mb-lg-0 mt-lg-4 single-template-description ">
          <section className="d-flex align-items-start justify-content-start flex-column mt-5 mb-4 pb-1 single-template-description-title ">
            <h4>یکی از بهترین قالب های فروشگاهی در سطح جهان</h4>

            <p className=" mt-3 mt-sm-4 three-line ">
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

          <section className="w-100 pt-2 pt-sm-0 d-flex justify-content-between align-items-center single-template-title pb-2 ">
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
