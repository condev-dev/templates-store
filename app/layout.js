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
  title: "ConDev | Casino Templates",
  description: "Casino & Game Templates",
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
