import Image from "next/image";
import "./index.css";
import Link from "next/link";
import AuthBtn from "@/components/auth/AuthBtn";
import CartBtn from "../../cart/CartBtn";

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

        <button className="btn-main btn-light"> خرید های قبلی</button>
      </div> */}

      <div className="d-flex gap-2">
        <CartBtn />
        <AuthBtn />
        <Link className="btn-main btn-color" href="/purchases">
          خرید های قبلی
        </Link>
      </div>
    </header>
  );
};

export default Header;
