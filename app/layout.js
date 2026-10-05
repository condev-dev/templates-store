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

// NOTE: there is deliberately NO `alternates.canonical` in this root layout.
// A canonical declared here is inherited by EVERY page that does not override it, which made
// /categories, /templates/filter/* and the account pages all claim to be duplicates of the home
// page - so Google refused to index them. The home page now declares it in app/page.js, and each
// template page declares its own in app/template/[id]/page.js.
export const metadata = {
  title: "خرید قالب کازینو، گیمینگ و پیش بینی | Con Dev",
  description: "دانلود و خرید قالب های تک صفحه ای HTML برای سایت های کازینو، بازی آنلاین و پیش بینی. سرعت فوق العاده، کد کلین، کاملا ریسپانسیو و سئو شده.",
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
