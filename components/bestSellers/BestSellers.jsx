import Link from "next/link";
import Template from "../templates/Template";
import "./index.css";

const BestSellers = () => {
  return (
    <section className=" w-100 d-flex flex-column my-5">
      <section className="best-sellers-title d-flex justify-content-center align-items-center w-100 mt-5">
        <h3 className="mt-2">پرفروش ترین قالب ها</h3>
      </section>

      <section className="best-sellers-container gap-4 mt-5 p-5">
        <Template />
        <Template />
        <Template />
      </section>
    </section>
  );
};

export default BestSellers;
