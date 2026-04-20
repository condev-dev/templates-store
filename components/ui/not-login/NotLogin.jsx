import Link from "next/link";
import "./index.css";
const NotLogin = ({ text }) => {
  return (
    <div className=" w-100 d-flex justify-content-center align-items-center not-login px-3 flex-column ">
      <h5>
        {" "}
        <span className="mx-1">لطفاً</span> {text}{" "}
      </h5>

      <div className="d-flex gap-2 gap-sm-3 mt-3 ">
        <Link href="/auth/signup" className="btn-main btn-color pb-2"> ثبت نام</Link>
        <Link href="/auth/signin" className="btn-main btn-color pb-2"> ورود</Link>
      </div>
    </div>
  );
};

export default NotLogin;
