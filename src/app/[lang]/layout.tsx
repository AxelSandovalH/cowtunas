import { notFound } from "next/navigation";
import { isValidLang, getDictionary, type Lang } from "@/lib/i18n";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingProvider from "@/components/booking/BookingProvider";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const dict = getDictionary(lang as Lang);

  return (
    <BookingProvider lang={lang as Lang}>
      <Navbar dict={dict} lang={lang as Lang} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict} lang={lang as Lang} />
    </BookingProvider>
  );
}
