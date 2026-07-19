import "./index.css";

const Intro = () => {
  return (
    <section className="intro-main w-100 d-flex justify-content-between  p-5 mt-5 shadow-sm">
      <div className="d-flex flex-column align-items-start  w-50 intro-description">
        <h1>قالب‌های آماده‌ی حرفه‌ای</h1>
        <h2 className="mt-3">
          اگر دنبال قالب‌هایی هستید که هم زیبا باشند، هم سریع و کاربردی، اینجا
          مجموعه‌ای انتخاب‌شده برای شما آماده شده است.
        </h2>

        <div className="d-flex gap-2 gap-sm-3 mt-4">
          <a href="#categories" className="btn-main btn-color shadow-sm">
            مشاهده قالب ها
          </a>
          <a href="#demo" className="btn-main btn-dark shadow-sm ">
            دموهای زنده
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;
