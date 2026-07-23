import Link from "next/link";
import CustomLoadingImage from "../ui/loading-image/CustomLoadingImage";
import "./index.css";
import AddToCart from "./AddToCart";

const TemplateGames = async () => {
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const ApiKey = process.env.NEXT_API_SECRET_KEY;

  const res = await fetch(`${BaseUrl}/api/templates?filterBy=بازی`, {
    cache: "no-store",
    headers: {
      "api-key": ApiKey,
    },
  });

  const templates = res.ok ? await res.json() : [];

  return (
    <section className=" w-100 d-flex flex-column mt-4 mb-sm-3 pt-4">
      <section className="template-category-title d-flex justify-content-between align-items-center w-100">
        <h3 className="mt-2">بازی های اختصاصی </h3>
      </section>

      <section className="d-flex flex-column-reverse flex-lg-row mt-4 mt-sm-5 pt-1 ">
        <div className="template-container-game-sm template-container-games gap-4 ps-lg-4">
          {templates.slice(1, 5).map((template) => (
            <div
              key={template.id}
              className="template-box-game sm-game"
              target="_blank"
            >
              <CustomLoadingImage
                src={template.image}
                alt={template.title}
                width={1200}
                height={600}
                className="w-100 shadow-sm"
              />
              <div className="d-flex gap-1 w-100 justify-content-evenly pt-1 game-btn">
                <Link
                  href={template.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-main btn-light w-50"
                >
                  {" "}
                  پیشنمایش قالب
                </Link>

                <div className="d-flex flex-column w-50">
                  <AddToCart templateId={template.id} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="template-container-game-lg  gap-4 mb-4 mb-lg-0">
          {templates.slice(0, 1).map((template) => (
            <div
              href={template.demo_url}
              key={template.id}
              className="template-box-game lg-game"
              target="_blank"
            >
              <CustomLoadingImage
                src={template.image}
                alt={template.title}
                width={1200}
                height={1620}
                className="w-100 shadow-sm"
              />
              <div className="d-flex gap-1 w-100 justify-content-evenly pt-1 game-btn">
                <Link
                  href={template.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-main btn-light w-50"
                >
                  {" "}
                  پیشنمایش قالب
                </Link>

                <div className="d-flex flex-column w-50">
                  <AddToCart templateId={template.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default TemplateGames;
