import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Patna Society Marketplace",
  description: "A community marketplace for society members in Patna.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <header className="sticky top-3 z-50 border-b border-slate-200 bg-linear-to-r from-green-600 to-green-900 w-5xl rounded-3xl self-center backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-xl font-semibold tracking-[0.2em] text-[#f5f5dc]">
              Patna Society Bazaar
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-[#f5f5dc]">
              <Link href="/" className="transition active:scale-95 text-[#f5f5dc]">
                Home
              </Link>
              <Link href="/about" className="transition text-[#f5f5dc] active:scale-95">
                About
              </Link>
              <Link href="/cart" className="transition text-[#f5f5dc] active:scale-95">
                Cart
              </Link>
              <Link
                href="/checkout"
                className="rounded-full bg-slate-900 px-4 py-2 text-[#f5f5dc] transition active:scale-95"
              >
                Checkout
              </Link>
            </nav>
          </div>
        </header>

        <CartProvider>
          <main className="flex-1">{children}</main>
        </CartProvider>

        <footer className=" w-full border-t border-[#f5f5dc] bg-white/95 py-6">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
            Built for the Patna society community. Local buys, trusted neighbors, and easy delivery.
          </div>
        </footer>
      </body>

    </html>
  );
}
