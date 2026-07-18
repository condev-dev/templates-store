import { FaCheck } from "react-icons/fa";
import "./index.css";
import AddToCart from "@/components/templates/AddToCart";
import FaNumber from "@/components/common/FaNumber";
import Toman from "@/components/common/Toman";
import Link from "next/link";
import CustomLoadingImage from "@/components/ui/loading-image/CustomLoadingImage";

const Template = async ({ params }) => {
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const ApiKey = process.env.NEXT_API_SECRET_KEY;
  const { id } = await params;

  const res = await fetch(`${BaseUrl}/api/templates?templateId=${id}`, {
    cache: "no-store",
    headers: {
      "api-key": ApiKey,
    },
  });
  const data = res.ok ? await res.json() : null;

  if (!data || data.length <= 0) return <div> این قالب پیدا نشد. </div>;

  return (
    <section className="d-flex flex-column mt-4">
      <section className="w-100 d-flex justify-content-start align-items-center single-template-title mt-3">
        <h4>{data?.title}</h4>
      </section>

      <section className="w-100 d-flex flex-column">
        <section className="w-100 d-flex justify-content-between align-items-start flex-column flex-lg-row single-template mt-4 pt-2">
          <section className="w-75 ps-4 single-template-image-container">
            <CustomLoadingImage
              src={data?.image}
              alt={data?.title}
              width={1200}
              height={600}
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
              <p>رده‌بندی: قالب اختصاصی گیم و بت</p>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-start px-1 mt-3 pt-1">
              <FaCheck size={12} className="ms-2 mb-2" />
              <p>پیاده‌سازی با HTML, CSS, JS</p>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-start px-1 mt-3 pt-1">
              <FaCheck size={12} className="ms-2 mb-2" />
              <p>کاملاً ریسپانسیو در تمامی دستگاه‌ها</p>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-start px-1 mt-3 pt-1">
              <FaCheck size={12} className="ms-2 mb-2" />
              <p>سئو شده و بهینه برای موتورهای جستجو</p>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-start px-1 mt-3 pt-1 mb-3">
              <FaCheck size={12} className="ms-2 mb-2" />
              <p>پشتیبانی رایگان و راه‌اندازی آسان</p>
            </div>
            <Link
              href={data?.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-100 btn-main btn-light mt-4 mb-3 "
            >
              پیش‌نمایش قالب
            </Link>
            <AddToCart templateId={data?.id} />
          </section>
        </section>

        <section className="w-100 mb-3 mb-lg-0 mt-lg-4 single-template-description ">
          <section className="d-flex align-items-start justify-content-start flex-column mt-5 mb-4 pb-1 single-template-description-title ">
            <h4>یکی از حرفه‌ای‌ترین قالب‌های گیم و بت در بازار</h4>
            <p className=" mt-3 mt-sm-4 three-line ">
              قالب رویال یکی از پرطرفدارترین محصولات مجموعه‌ی کاندو در حوزه
              سایت‌های گیم و بت است. این قالب با استفاده از تکنولوژی‌های روز
              HTML، CSS و JavaScript طراحی و کدنویسی شده و به‌صورت کاملاً
              ریسپانسیو در تمامی دستگاه‌ها از جمله موبایل، تبلت و دسکتاپ نمایش
              درستی دارد. ساختار سئو شده‌ی این قالب باعث شده رتبه‌بندی بهتری در
              نتایج موتورهای جستجو داشته باشد و سرعت بالای بارگذاری صفحات，
              تجربه‌ی کاربری روانی را برای بازدیدکنندگان فراهم می‌کند.
            </p>
          </section>

          <section className="w-100 pt-2 pt-sm-0 d-flex justify-content-between align-items-center single-template-title pb-2 ">
            <h4>پیش‌نمایش کامل قالب</h4>
            <Link
              href={data?.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-main btn-color shadow-lg "
            >
              پیش‌نمایش قالب
            </Link>
          </section>

          <CustomLoadingImage
            src={data?.image}
            alt={data?.title}
            width={1200}
            height={600}
            className="w-100 shadow-sm mt-4"
          />
        </section>
      </section>
    </section>
  );
};

export default Template;
