import { notFound } from "next/navigation";
import { isValidLang, getDictionary, type Lang } from "@/lib/i18n";
import Gallery from "@/components/sections/Gallery";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  return {
    title:
      lang === "es"
        ? "Galería — CowTunas Fishing Charters"
        : "Gallery — CowTunas Fishing Charters",
  };
}

export default async function GalleryPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const dict = getDictionary(lang as Lang);

  return (
    <div className="bg-[#1a2b3c] pt-24">
      <Gallery dict={dict} lang={lang as Lang} />
      <WhatsAppButton />
    </div>
  );
}
