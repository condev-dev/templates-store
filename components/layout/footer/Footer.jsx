import Image from "next/image";
import "./index.css";
import { FaGithub, FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-auto pt-1 pb-1 pb-sm-0 pt-sm-4">
      <section className="footer-main w-100 d-flex flex-column mt-4  mt-sm-5 ">
        <section className="w-100 d-flex justify-content-between align-items-center flex-column flex-lg-row py-4 my-1 mt-3">
          <div className="d-flex flex-column align-items-start w-50 ps-5 footer-description">
            <Image
              width={170}
              height={40}
              alt="ConDev"
              loading="eager"
              src="/img/logo.webp"
              className="logo"
            />
            <p className="footer-information-text mt-3 mt-sm-4 pt-sm-2 four-line">
      condev از ابتدا با این چشم‌انداز شکل گرفت که ابزارهای قدرتمند و جذابی برای ساختن فضاهای آنلاین موفق، به‌خصوص در عرصه بازی و شرط‌بندی، فراهم کند. ما با اشتیاق، قالب‌هایی را طراحی و کدنویسی می‌کنیم که نه تنها ظاهری حرفه‌ای دارند، بلکه به کسب‌وکارها کمک می‌کنند تا مخاطبان بیشتری جذب کرده و به اهدافشان سریع‌تر دست یابند. از سال [سال شروع فعالیت condev را اینجا وارد کنید]، ما در کنار شما بوده‌ایم تا ایده‌های دیجیتال شما را به بهترین شکل ممکن به تصویر بکشیم.
            </p>
          </div>

          <div className="w-50 pe-5 d-flex flex-column footer-social">
            <div className="social-media-title gap-3">
              <h6>ما را در شبکه های اجتماعی دنبال کنید </h6>
            </div>
            <div className="social-media-container gap-3 mt-2">
              {/*  */}
              <div className="social-medial-box d-flex align-items-center justify-content-start ">
                <div className="social-medial-icon h-100 d-flex align-items-center justify-content-center telegram">
                  <FaTelegram size={25} />
                </div>
                <div className="social-medial-text d-flex flex-column me-3">
                  <small>کانال ما در تلگرام</small>
                  <small>tm::/condevtp.com</small>
                </div>
              </div>
              {/*  */}
              <div className="social-medial-box d-flex align-items-center justify-content-start ">
                <div className="social-medial-icon h-100 d-flex align-items-center justify-content-center whatsapp">
                  <FaWhatsapp size={25} />
                </div>
                <div className="social-medial-text d-flex flex-column me-3">
                  <small>کانال ما در واتساپ</small>
                  <small>tm::/condevtp.com</small>
                </div>
              </div>
              {/*  */}
              <div className="social-medial-box d-flex align-items-center justify-content-start  ">
                <div className="social-medial-icon h-100 d-flex align-items-center justify-content-center github">
                  <FaGithub size={25} />
                </div>
                <div className="social-medial-text d-flex flex-column me-3">
                  <small>گیت هاب</small>
                  <small>tm::/condevtp.com</small>
                </div>
              </div>
              {/*  */}
              <div className="social-medial-box d-flex align-items-center justify-content-start  ">
                <div className="social-medial-icon h-100 d-flex align-items-center justify-content-center instagram">
                  <FaInstagram size={25} />
                </div>
                <div className="social-medial-text d-flex flex-column me-3">
                  <small>اینستاگرام</small>
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
