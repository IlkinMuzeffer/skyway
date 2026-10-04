import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Skyway - Aviabilet axtarışı",
  description: "Ucuz aviabiletləri tap və sifariş et",
};

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <body className="bg-gray-50 text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}