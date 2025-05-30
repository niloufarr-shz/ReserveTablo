import "./globals.css";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import Providers from "../redux/Providers";

export const metadata = {
  title: "رزرو تابلو شهرداری",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
