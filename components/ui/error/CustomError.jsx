import Link from "next/link";
import "./index.css";

const CustomError = ({ reset, error }) => {
  return (
    <section className="d-flex flex-column gap-4 custom-error align-items-center justify-content-center px-3">
      <h5 > خطای داخلی سرور رخ داده است!</h5>

      <small className="mt-5 two-line" >{error.message}</small>

      <div className="mt-2 gap-4 d-flex flex-column justify-content-center align-items-center">
        <button className="btn-main btn-color pb-2" onClick={() => reset()}>
          تلاش مجدد
        </button>

        <Link className="btn-main btn-light pb-2" href="/">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </section>
  );
};

export default CustomError;
