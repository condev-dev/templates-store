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
// metadataBase makes every relative address below resolve to an absolute one. Without it the
// og:image and icon entries can be emitted as paths, which crawlers and sharing tools reject -
// that is what produced the "og:image is missing" report.
const SITE_TITLE = "خرید قالب کازینو، گیمینگ و پیش بینی | Con Dev";
const SITE_DESC =
  "دانلود و خرید قالب های تک صفحه ای HTML برای سایت های کازینو، بازی آنلاین و پیش بینی. سرعت فوق العاده، کد کلین، کاملا ریسپانسیو و سئو شده.";
const OG_IMAGE = "/og-image.png";

export const metadata = {
  metadataBase: new URL("https://www.condev.ir"),
  title: SITE_TITLE,
  description: SITE_DESC,
  // Explicit icon links so the mark shows up in browser tabs and next to search results.
  icons: {
    icon: ["/favicon.ico", "/icon-192x192.png"],
    apple: "/icon-192x192.png",
  },
  // Defaults for every page that does not define its own; template pages override these.
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Con Dev",
    locale: "fa_IR",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "قالب های آماده ی حرفه ای و کاربردی | Con Dev" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [OG_IMAGE],
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
