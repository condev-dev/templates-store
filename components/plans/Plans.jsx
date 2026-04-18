import "./index.css";
const Plans = () => {
  return (
    <section className="d-flex justify-content-between align-items-center plans-main-container mt-4 mt-sm-5 pt-5">
      {/* Title */}
      <div className="d-flex flex-column align-items-start plans-text w-25">
        <h5>پلن های ویژه</h5>
        <p className="mt-3">
          قالب وردپرس | پوسته وردپرس | مرجع دانلود و خرید تم وردپرس اورجینال |
          نوین وردپرسقالب وردپرس | پوسته وردپرس | مرجع دانلود و خرید تم وردپرس
          اورج
        </p>
      </div>
      {/* Box */}
      <div className="w-75 plans-container gap-5 pe-5 my-5">
        {/*  */}
        <div className="d-flex flex-column align-items-center justify-content-center plan p-5 shadow-sm ">
          <h5 className="plan-title">پلاس</h5>

          <div className="plan-list d-flex justify-content-center align-items-center flex-column my-4 py-2">
            <p>+4 قالب فارسی</p>
            <p>+4 قالب ترکی</p>
            <p>+4 قالب تبلیغاتی</p>
            <p>+4 قالب موبایلی</p>
          </div>

          <h5 className="plan-price mb-4 pb-2">۷۰۰ هزار تومان</h5>

          <button className="btn-main btn-dark ">خرید پلن</button>
        </div>
        {/*  */}
        <div className="d-flex flex-column align-items-center justify-content-center plan p-5 shadow-sm">
          <h5 className="plan-title">پرو</h5>

          <div className="plan-list d-flex justify-content-center align-items-center flex-column my-4 py-2">
            <p>+4 قالب فارسی</p>
            <p>+4 قالب ترکی</p>
            <p>+4 قالب تبلیغاتی</p>
            <p>+4 قالب موبایلی</p>
          </div>

          <h5 className="plan-price mb-4 pb-2">۷۰۰ هزار تومان</h5>

          <button className="btn-main btn-color ">خرید پلن</button>
        </div>
        {/*  */}
        <div className="d-flex flex-column align-items-center justify-content-center plan p-5 shadow-sm">
          <h5 className="plan-title">پرو مکس</h5>

          <div className="plan-list d-flex justify-content-center align-items-center flex-column my-4 py-2">
            <p>+4 قالب فارسی</p>
            <p>+4 قالب ترکی</p>
            <p>+4 قالب تبلیغاتی</p>
            <p>+4 قالب موبایلی</p>
          </div>

          <h5 className="plan-price mb-4 pb-2">۷۰۰ هزار تومان</h5>

          <button className="btn-main btn-color ">خرید پلن</button>
        </div>
        {/*  */}
      </div>
    </section>
  );
};

export default Plans;
