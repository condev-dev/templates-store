import Image from "next/image";
import "./index.css";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-auto pt-4">
      <section className="footer-main w-100 d-flex flex-column mt-5 ">
        <section className="w-100 d-flex justify-content-between align-items-center py-4 my-1 mt-3">
          <div className="d-flex flex-column align-items-start w-50 ps-5">
            <Image
              width={170}
              height={40}
              alt="ConDev"
              loading="eager"
              src="/img/logo.webp"
              className="logo"
            />
            <p className="footer-information-text mt-3">
              قالب وردپرس | پوسته وردپرس | مرجع دانلود و خرید تم وردپرس اورجینال
              | نوین وردپرسقالب وردپرس | پوسته وردپرس | مرجع دانلود و خرید تم
              وردپرس اورجینال | نوین وردپرسقالب وردپرس | پوسته وردپرس | مرجع
              دانلود و خرید تم وردپرس اورجینال | نوین وردپرسقالب وردپرس | پوسته
              وردپرس | مرجع دانلود و خرید تم وردپرس اورجینال | نوین وردپرسقالب
              وردپرس | پوسته وردپرس | مرجع دانلود و خرید تم وردپرس اورجینال |
              نوین خرید تم وردپرس اورجینال | نوین وردپرسقالب وردپرس | پوسته
              وردپرس |
            </p>
          </div>

          <div className="w-50 pe-5 d-flex flex-column">
            <div className="social-media-title gap-3">
              <h6>ما را در شبکه های اجتماعی دنبال کنید </h6>
            </div>
            <div className="social-media-container gap-3 mt-2">
              {/*  */}
              <div className="social-medial-box d-flex align-items-center justify-content-start ">
                <div className="social-medial-icon h-100 d-flex align-items-center justify-content-center p-3">
                  <FaTelegram size={20} />
                </div>
                <div className="social-medial-text d-flex flex-column me-3">
                  <small>کانال ما در تلگرام</small>
                  <small>tm::/condevtp.com</small>
                </div>
              </div>
              {/*  */}
              <div className="social-medial-box d-flex align-items-center justify-content-start ">
                <div className="social-medial-icon h-100 d-flex align-items-center justify-content-center p-3">
                  <FaTelegram size={20} />
                </div>
                <div className="social-medial-text d-flex flex-column me-3">
                  <small>کانال ما در تلگرام</small>
                  <small>tm::/condevtp.com</small>
                </div>
              </div>
              {/*  */}
              <div className="social-medial-box d-flex align-items-center justify-content-start ">
                <div className="social-medial-icon h-100 d-flex align-items-center justify-content-center p-3">
                  <FaTelegram size={20} />
                </div>
                <div className="social-medial-text d-flex flex-column me-3">
                  <small>کانال ما در تلگرام</small>
                  <small>tm::/condevtp.com</small>
                </div>
              </div>
              {/*  */}
              <div className="social-medial-box d-flex align-items-center justify-content-start ">
                <div className="social-medial-icon h-100 d-flex align-items-center justify-content-center p-3">
                  <FaTelegram size={20} />
                </div>
                <div className="social-medial-text d-flex flex-column me-3">
                  <small>کانال ما در تلگرام</small>
                  <small>tm::/condevtp.com</small>
                </div>
              </div>
              {/*  */}
            </div>
          </div>
        </section>
        <small className="copy-right text-center pt-3 pb-1"> ConDev </small>
      </section>
    </footer>
  );
};

export default Footer;
