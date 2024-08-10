// import { Inter } from "next/font/google";
// import { ToastContainer } from "react-toastify";
// import Footer from "./Components/Layout/Footer";
// import Header from "./Components/Layout/Header";
// import AuthProvider from "./Components/Providers/AuthProvider";
// import ReduxProviders from "./Components/Providers/ReduxProviders";
// import "./globals.css";
// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Sped Delivery",
//   description: "Sped Delivery food and more",
// };

// export default async function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <AuthProvider>
//           <ReduxProviders>
//             <Header />
//             <ToastContainer />
//             {children}
//             <Footer />
//           </ReduxProviders>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

// Import necessary components
import { Inter } from "next/font/google";
import Head from "next/head"; // Import Head from next/head
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import AuthProvider from "./Components/Providers/AuthProvider";
import ReduxProviders from "./Components/Providers/ReduxProviders";
import GoogleTagManager from "./GoogleTagManager";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Sped Delivery",
  description: "Sped Delivery food and more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
                var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != "dataLayer" ? "&l=" + l : "";
                j.async = true;
                j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
                f.parentNode.insertBefore(j, f);
              })(window, document, "script", "dataLayer", "GTM-5WXD3CXN");`,
          }}
        />
        {/* End Google Tag Manager */}
      </Head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5WXD3CXN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <GoogleTagManager>
          <AuthProvider>
            <ReduxProviders>
              <Header />
              <ToastContainer />
              {children}
              <Footer />
            </ReduxProviders>
          </AuthProvider>
        </GoogleTagManager>
      </body>
    </html>
  );
}
