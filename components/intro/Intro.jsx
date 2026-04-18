import "./index.css";

const Intro = () => {
  return (
    <section className="intro-main w-100 d-flex justify-content-between  p-5 mt-5 shadow-sm">
      <div className="d-flex flex-column align-items-start  w-50 intro-description">
        <h1>بهترین قالب های کازینویی</h1>
        <h2 className="mt-3">
          قالب وردپرس | پوسته وردپرس | مرجع دانلود و خرید تم وردپرس اورجینال |
          نوین وردپرسقالب وردپرس | پوسته وردپرس | مرجع دانلود و خرید تم وردپرس
          اورج
        </h2>

        <div className="d-flex gap-2 gap-sm-3 mt-4">
          <button className="btn-main btn-color shadow-sm">پلن های ویژه</button>
          <button className="btn-main btn-dark shadow-sm ">پلن های ویژه</button>
        </div>
      </div>
    </section>
  );
};

export default Intro;
