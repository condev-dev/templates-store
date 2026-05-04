import localFont from "next/font/local";


export const fontIranSans = localFont({
  src: [
    {
      path: "../public/fonts/IranSans/IranSans-Light.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/IranSans/IranSans-Regular.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/IranSans/IranSans-Bold.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-iransans",
});



export const fontRokh = localFont({
  src: [
    {
      path: "../public/fonts/Rokh/Rokh-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Rokh/Rokh-Bold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Rokh/Rokh-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-rokh",
});
