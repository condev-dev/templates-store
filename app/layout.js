// Bootstrap
import "@/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Fonts
import { fontIranSans, fontRokh } from "@/lib/fonts";
// Components
import Container from "../components/layout/container/Container";
import AuthProvider from "./AuthProvider";
import ToastProvider from "@/components/common/ToastProvider";
// Loading Skeleton
import "react-loading-skeleton/dist/skeleton.css";
import ScrollToTop from "@/components/common/ScrollToTop";

export const metadata = {
  title: "خرید قالب کازینو، گیمینگ و پیش بینی | Con Dev",
  description: "دانلود و خرید قالب های تک صفحه ای HTML برای سایت های کازینو، بازی آنلاین و پیش بینی. سرعت فوق العاده، کد کلین، کاملا ریسپانسیو و سئو شده.",
  alternates: {
    canonical: "https://www.condev.ir",
  },
};

export default function RootLayout({ children, modal }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${fontIranSans.variable} ${fontRokh.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <Container>
            <ScrollToTop />

            {/* flex-grow-1 */}
            <main className="d-flex flex-column  align-items-center justify-content-center">
              {modal}
              {children}
            </main>
          </Container>
        </AuthProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
