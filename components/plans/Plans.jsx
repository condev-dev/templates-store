import "./index.css";
const Plans = () => {
  return (
    <section className="d-flex justify-content-between align-items-center plans-main-container mt-4 mt-sm-5 pt-5" id="plans" >
      {/* Title */}
      <div className="d-flex flex-column align-items-start plans-text w-25">
        <h5>پلن‌های ویژه</h5>
        <p className="mt-3">
          قالب گیم و بت | پوسته اختصاصی HTML و CSS | مرجع دانلود و خرید قالب
          رویال کاندو | طراحی حرفه‌ای و ریسپانسیو برای سایت‌های گیم و شرط‌بندی
        </p>
      </div>
      {/* Box */}
      <div className="w-75 plans-container gap-5 pe-5 my-5">
        {/*  */}
        <div className="d-flex flex-column align-items-center justify-content-center plan p-5 shadow-sm ">
          <h5 className="plan-title">پلاس</h5>

          <div className="plan-list d-flex justify-content-center align-items-center flex-column my-4 py-2">
            <p>+4 قالب گیم و بت</p>
            <p>+4 قالب اختصاصی</p>
            <p>+4 قالب تبلیغاتی</p>
            <p>+4 قالب موبایلی</p>
          </div>

          <h5 className="plan-price mb-4 pb-2">۷۰۰ هزار تومان</h5>

          <button className="btn-main w-50 btn-dark ">خرید پلن</button>
        </div>
        {/*  */}
        <div className="d-flex flex-column align-items-center justify-content-center plan p-5 shadow-sm">
          <h5 className="plan-title">پرو</h5>

          <div className="plan-list d-flex justify-content-center align-items-center flex-column my-4 py-2">
            <p>+6 قالب گیم و بت</p>
            <p>+6 قالب اختصاصی</p>
            <p>+6 قالب تبلیغاتی</p>
            <p>پشتیبانی اختصاصی</p>
          </div>

          <h5 className="plan-price mb-4 pb-2">۱٬۲۰۰ هزار تومان</h5>

          <button className="btn-main w-50 btn-color ">خرید پلن</button>
        </div>
        {/*  */}
        <div className="d-flex flex-column align-items-center justify-content-center plan p-5 shadow-sm">
          <h5 className="plan-title">پرو مکس</h5>

          <div className="plan-list d-flex justify-content-center align-items-center flex-column my-4 py-2">
            <p>+8 قالب گیم و بت</p>
            <p>+8 قالب اختصاصی</p>
            <p>پشتیبانی اختصاصی</p>
            <p>بروزرسانی مادام‌العمر</p>
          </div>

          <h5 className="plan-price mb-4 pb-2">۱٬۵۰۰ هزار تومان</h5>

          <button className="btn-main w-50 btn-color ">خرید پلن</button>
        </div>
        {/*  */}
      </div>
    </section>
  );
};

export default Plans;
