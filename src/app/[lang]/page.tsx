import { notFound } from "next/navigation";
import { isValidLang, getDictionary, type Lang } from "@/lib/i18n";
import Hero from "@/components/sections/Hero";
import WhyUs from "@/components/sections/WhyUs";
import DayOnWater from "@/components/sections/DayOnWater";
import KailaniHero from "@/components/sections/KailaniHero";
import Boat from "@/components/sections/Boat";
import Captain from "@/components/sections/Captain";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import BookCharter from "@/components/sections/BookCharter";
import Reviews from "@/components/sections/Reviews";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

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
      <DayOnWater lang={lang as Lang} />
      <KailaniHero lang={lang as Lang} />
      <Boat dict={dict} />
      <Captain dict={dict} />
      <BookCharter lang={lang as Lang} />
      <Gallery dict={dict} lang={lang as Lang} />
      <Reviews dict={dict} />
      <Pricing lang={lang as Lang} />
      <FAQ dict={dict} />
      <Contact dict={dict} lang={lang as Lang} />
      <WhatsAppButton />
    </>
  );
}
