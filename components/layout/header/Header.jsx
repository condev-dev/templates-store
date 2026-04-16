import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import "./index.css";
import Link from "next/link";
import AuthBtn from "@/components/auth/AuthBtn";

const Header = () => {
  return (
    <header className="main-header w-100 d-flex flex-row-reverse justify-content-between align-items-center mt-4 pb-3">
      <Link href="/">
        <Image
          src="/img/logo.webp"
          alt="ConDev"
          loading="eager"
          width={170}
          height={40}
          className="logo"
        />
      </Link>

      {/* <div className="d-flex gap-3">
        <button className="btn-main btn-color btn-color-sm">
          <FaCartPlus />
        </button>
        <button className="btn-main btn-light"> خرید های قبلی</button>
      </div> */}
      <AuthBtn />
    </header>
  );
};

export default Header;
