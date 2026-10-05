import { FaCheck } from "react-icons/fa";
import "./index.css";
import AddToCart from "@/components/templates/AddToCart";
import FaNumber from "@/components/common/FaNumber";
import Toman from "@/components/common/Toman";
import Link from "next/link";
import CustomLoadingImage from "@/components/ui/loading-image/CustomLoadingImage";
import { templatesData } from "@/data/templates";
import { GetTemplateById } from "@/services/templates";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const templateMeta = templatesData[id];

  if (!templateMeta) {
    return {
      title: "قالب یافت نشد | Con Dev",
      description: "قالب مورد نظر در سیستم ثبت نشده است.",
    };
  }

  const canonical = `https://www.condev.ir/template/${id}`;

  // og:image needs the template's picture, which lives in the database rather than in
  // templatesData. A read failure here must never take the page down, so it is guarded.
  let image;
  try {
    const template = await GetTemplateById(id);
    const raw = template?.image;
    // ?dl=1 so social crawlers get the real picture instead of postimg's 60x180 thumbnail
    image =
      raw && raw.includes("postimg.cc") && !raw.includes("dl=1") ? `${raw}?dl=1` : raw;
  } catch {
    image = undefined;
  }

  return {
    title: templateMeta.title,
    description: templateMeta.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Con Dev",
      locale: "fa_IR",
      title: templateMeta.title,
      description: templateMeta.description,
      images: image ? [{ url: image, alt: templateMeta.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: templateMeta.title,
      description: templateMeta.description,
      images: image ? [image] : undefined,
    },
  };
}

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

  // GetTemplateById returns a single OBJECT (or [] when there is no such template), so the old
  // `data.length <= 0` test was meaningless for the object case. Check the id instead.
  if (!data || !data.id) return <div> این قالب پیدا نشد. </div>;

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
              className="w-100 shadow-sm no-hover-image"
              sizes="(max-width: 992px) 100vw, 70vw"
              quality={88}
              priority
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
              <p>رده بندی : قالب {data?.categories?.slice(0, 2).join(" ، ")}</p>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-start px-1 mt-3 pt-1">
              <FaCheck size={12} className="ms-2 mb-2" />
              <p>پیاده سازی با Html, Css, Js</p>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-start px-1 mt-3 pt-1">
              <FaCheck size={12} className="ms-2 mb-2" />
              <p>کاملاً ریسپانسیو روی دستگاه ها</p>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-start px-1 mt-3 pt-1">
              <FaCheck size={12} className="ms-2 mb-2" />
              <p>سئو شده برای موتورهای جستجو</p>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-start px-1 mt-3 pt-1 mb-3">
              <FaCheck size={12} className="ms-2 mb-2" />
              <p>کدنویسی شده به صورت کلین کد</p>
            </div>
            <Link
              href={data?.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-100 btn-main btn-light mt-4 mb-3 "
            >
              پیشنمایش قالب
            </Link>
            <AddToCart templateId={data?.id} />
          </section>
        </section>

        <section className="w-100 mb-3 mb-lg-0 mt-lg-4 single-template-description ">
          <section className="d-flex align-items-start justify-content-start flex-column mt-5 mb-4 pb-1 single-template-description-title ">
            <h4>درباره و مشخصات قالب</h4>
            <p className=" mt-2 mt-sm-4 three-line ">
              {`قالب ${data?.title || ""} یکی از مدرن ترین و بهینه ترین قالب های تک صفحه ای اختصاصی برای حوزه گیم، بازی و سایت های تعاملی است. این قالب با ساختار کاملاً استاندارد و ریسپانسیو طراحی شده تا کاربران در تمامی دستگاه ها (موبایل، تبلت و دسکتاپ) تجربه ای سریع و روان داشته باشند. طراحی مدرن، سرعت بارگذاری بالا و رعایت اصول اولیه سئو از ویژگی های بارز این محصول می باشد.`}
            </p>
          </section>

          <section className="w-100 pt-2 pt-sm-0 d-flex justify-content-between align-items-center single-template-title pb-2 ">
            <h4>پیش نمایش قالب</h4>
            <Link
              href={data?.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-main btn-color shadow-lg "
            >
              دمو زنده
            </Link>
          </section>

          <CustomLoadingImage
            src={data?.image}
            alt={data?.title}
            width={1200}
            height={600}
            className="w-100 shadow-sm mt-4 no-hover-image"
            sizes="100vw"
            quality={88}
          />
        </section>
      </section>
    </section>
  );
};

export default Template;
