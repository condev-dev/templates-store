"use client";
import { useState } from "react";
import "./index.css";

const Plans = () => {
  const [activeTab, setActiveTab] = useState(2); // پیش فرض: پرو (پلن وسط)

  return (
    <section className="d-flex justify-content-between align-items-center plans-main-container mt-4 mt-sm-5 pt-5" id="plans">
      {/* Title */}
      <div className="d-flex flex-column align-items-start plans-text w-25">
        <h5>پلن های ویژه</h5>
        <p className="mt-3 px-2 px-sm-0">
          مرجع خرید و دانلود قالب های گیم و بت. هر پلن ترکیبی از قالب های لندینگ فارسی،
          ترکی و بایو است و پیش نمایش زنده همه قالب ها در دسترس است.
        </p>
      </div>

      {/* Mobile Tabs Switcher */}
      <div className="plan-mobile-tabs d-flex d-md-none w-100 justify-content-center gap-3 mb-1 mt-3">
        <button 
          className={`btn-plan-tab ${activeTab === 1 ? "active" : ""}`}
          onClick={() => setActiveTab(1)}
        >
          پلاس
        </button>
        <button 
          className={`btn-plan-tab ${activeTab === 2 ? "active" : ""}`}
          onClick={() => setActiveTab(2)}
        >
          پرو
        </button>
        <button 
          className={`btn-plan-tab ${activeTab === 3 ? "active" : ""}`}
          onClick={() => setActiveTab(3)}
        >
          پرو مکس
        </button>
      </div>

      {/* Box */}
      <div className="w-75 plans-container gap-5 pe-5 my-5">
        {/* Plan 1 */}
        <div className={`d-flex flex-column align-items-center justify-content-center plan plan-soon p-5 shadow-sm ${activeTab === 1 ? "tab-active" : ""}`}>
          <h5 className="plan-title">پلاس</h5>

          <div className="plan-list d-flex justify-content-center align-items-center flex-column my-4 py-2">
            <p>۲ قالب لندینگ فارسی</p>
            <p>۱ قالب لندینگ ترکی</p>
            <p>۱ قالب بایو</p>
            <p>ارزش خرید تکی: ۲٬۰۰۰٬۰۰۰ تومان</p>
          </div>

          <h5 className="plan-price mb-4 pb-2">۱٬۶۰۰٬۰۰۰ تومان</h5>

          <button className="btn-main w-50 btn-dark" disabled>خرید پلن</button>
        </div>

        {/* Plan 2 */}
        <div className={`d-flex flex-column align-items-center justify-content-center plan plan-soon p-5 shadow-sm ${activeTab === 2 ? "tab-active" : ""}`}>
          <h5 className="plan-title">پرو</h5>

          <div className="plan-list d-flex justify-content-center align-items-center flex-column my-4 py-2">
            <p>۳ قالب لندینگ فارسی</p>
            <p>۲ قالب لندینگ ترکی</p>
            <p>۱ قالب بایو</p>
            <p>ارزش خرید تکی: ۳٬۱۰۰٬۰۰۰ تومان</p>
          </div>

          <h5 className="plan-price mb-4 pb-2">۲٬۴۰۰٬۰۰۰ تومان</h5>

          <button className="btn-main w-50 btn-color" disabled>خرید پلن</button>
        </div>

        {/* Plan 3 */}
        <div className={`d-flex flex-column align-items-center justify-content-center plan plan-soon p-5 shadow-sm ${activeTab === 3 ? "tab-active" : ""}`}>
          <h5 className="plan-title">پرو مکس</h5>

          <div className="plan-list d-flex justify-content-center align-items-center flex-column my-4 py-2">
            <p>۴ قالب لندینگ فارسی</p>
            <p>۳ قالب لندینگ ترکی</p>
            <p>۲ قالب بایو</p>
            <p>ارزش خرید تکی: ۴٬۵۰۰٬۰۰۰ تومان</p>
          </div>

          <h5 className="plan-price mb-4 pb-2">۳٬۶۰۰٬۰۰۰ تومان</h5>

          <button className="btn-main w-50 btn-color" disabled>خرید پلن</button>
        </div>
      </div>
    </section>
  );
};

export default Plans;
