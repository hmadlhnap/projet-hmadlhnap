import type { Metadata } from 'next';
import { getDetailsDayTrip, htmlToText } from '@/lib/daytrips';
import HeroDayTrip from '@/components/sections/day-trips/HeroDayTrip';
import HighlightsDayTrip from '@/components/sections/day-trips/HighlightsDayTrip';
import OverviewDayTrip from '@/components/sections/day-trips/OverviewDayTrip';
import ItineraryDayTrip from '@/components/sections/day-trips/ItineraryDayTrip';
import IncludedExcludedDayTrip from '@/components/sections/day-trips/IncludedExcludedDayTrip';
import ContentInformationDayTrip from '@/components/sections/day-trips/ContentInformationDayTrip';
import FaqDayTrip from '@/components/sections/day-trips/FaqDayTrip';
import DayTripWhatsAppForm from '@/components/sections/day-trips/DayTripWhatsAppForm';
import ContactSection from '@/components/sections/Home/ContactSection';
import DayTripJsonLd from '@/components/seo/DayTripJsonLd';
import { getDayTripSlugs } from '@/lib/daytrips';
import { notFound } from "next/navigation";


const SITE_URL = "https://marrakechpackage.com";
const SITE_NAME = "Marrakech Package";


 interface DayTripDetailsPageProps {
   params: Promise<{
     slug: string;
   }>;
 }


 export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
   const slugs = await getDayTripSlugs();
   return slugs.map((slug) => ({
     slug,
   }));
 }


 function parseKeywords(value?: string): string[] {
   if (!value) {
     return [];
   }
   return value.split(",").map((keyword) => keyword.trim()).filter(Boolean);
 }

 

 export async function generateMetadata({params,}: DayTripDetailsPageProps): Promise<Metadata> {
  
   const { slug } = await params;

   const dayTrip = await getDetailsDayTrip(slug);

   if (!dayTrip) {
     return {
       title: {
         absolute: `Day Trip Not Found | ${SITE_NAME}`,
       },
       description: "The requested day trip could not be found.",
       robots: {
         index: false,
         follow: false,
       },
     };
   }

   const { acf } = dayTrip;

   const pageTitle = htmlToText(dayTrip.title.rendered);

   const seoTitle = acf.seo_title?.trim() || `${pageTitle} | ${SITE_NAME}`;

   const fallbackDescription = htmlToText(dayTrip.excerpt.rendered) || acf.hero_description;

   const seoDescription = (acf.seo_description?.trim() || fallbackDescription).replace(/\s+/g, " ").trim();

   const canonicalUrl = `${SITE_URL}/day-trips/${dayTrip.slug}`;

   const heroImage = acf.hero_image && typeof acf.hero_image === "object" ? acf.hero_image : null;

   const imageUrl =  heroImage?.url || `${SITE_URL}/images/hero.jpeg`;

   const imageAlt = heroImage?.alt?.trim() || `${pageTitle} from Marrakech`;

   const keywords = parseKeywords(acf.keywords);
  
   return {
     title: {
       absolute: seoTitle,
     },
     description: seoDescription,
     ...(keywords.length > 0 && {keywords,}),

     applicationName: SITE_NAME,
     creator: SITE_NAME,
     publisher: SITE_NAME,
     category: "Travel",
     alternates: {
       canonical: canonicalUrl,
     },
     robots: {
       index: true,
       follow: true,

       googleBot: {
         index: true,
         follow: true,
         noimageindex: false,
         "max-image-preview": "large",
         "max-snippet": -1,
         "max-video-preview": -1,
       },
     },

     openGraph: {
       type: "website",
       locale: "en_US",

       url: canonicalUrl,
       siteName: SITE_NAME,

       title: seoTitle,
       description: seoDescription,

       images: [
         {
           url: imageUrl,
           alt: imageAlt,
         },
       ],
     },

     twitter: {
       card: "summary_large_image",
       title: seoTitle,
       description: seoDescription,
       images: [imageUrl],
     },
   };
 }



async function page({
  params,
}: DayTripDetailsPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const detailstrip = await getDetailsDayTrip(slug);

  if (!detailstrip) {
    notFound();
  }

  const { acf } = detailstrip;

  return (
    <>
      <DayTripJsonLd dayTrip={detailstrip} />
      <HeroDayTrip
        title={detailstrip.title.rendered}
        heroImage={typeof acf.hero_image === "object" ? acf.hero_image : null}
        heroDescription={acf.hero_description}
        duration={acf.duration}
        departureCity={acf.departure_city}
        transport={acf.transport}
        dayTripType={acf.day_trip_type}
      />
      <HighlightsDayTrip
        title={detailstrip.title.rendered}
        highlights={acf.highlights}
      />
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            <OverviewDayTrip
              overviewTitle={acf.overview_title}
              overviewContent={acf.overview_content}
              whyChoose={acf.why_choose}
            />

            <ItineraryDayTrip
              itineraryTitle={acf.itinerary_title}
              itinerary={acf.itinerary}
            />

            <IncludedExcludedDayTrip
              included={acf.included}
              excluded={acf.excluded}
            />
          </div>

          <aside className="h-fit px-4 sm:px-0 lg:sticky lg:top-24">
            <DayTripWhatsAppForm
              dayTripTitle={detailstrip.title.rendered}
              price={acf.shared_tour_price}
              priceLabel="/person"
            />
          </aside>
        </div>
      </section>

      <ContentInformationDayTrip
        contentSections={acf.content_sections}
        importantInformation={acf.important_information}
      />
      <FaqDayTrip faq={acf.faq} />
      <ContactSection />
    </>
  );
}
 
export default page
