import { notFound } from "next/navigation";
import { isValidLang, getDictionary, type Lang } from "@/lib/i18n";
import Hero from "@/components/sections/Hero";
import WhyUs from "@/components/sections/WhyUs";
import Boat from "@/components/sections/Boat";
import Captain from "@/components/sections/Captain";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const dict = getDictionary(lang as Lang);

  return (
    <>
      <Hero dict={dict} lang={lang as Lang} />
      <WhyUs dict={dict} />
      <Boat dict={dict} />
      <Captain dict={dict} />
      <Gallery dict={dict} lang={lang as Lang} />
      <Pricing lang={lang as Lang} />
      <FAQ dict={dict} />
      <Contact dict={dict} lang={lang as Lang} />
    </>
  );
}
