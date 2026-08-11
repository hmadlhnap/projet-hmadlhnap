import React from 'react'
import { getDetailsTour, getRelatedToursByIds, getTourImage, getTourSlugs, htmlToText,} from "@/lib/tours";
import HeroTour from '@/components/sections/tour/HeroTour';
import HighlightsDayTrip from '@/components/sections/day-trips/HighlightsDayTrip';
import FaqDayTrip from '@/components/sections/day-trips/FaqDayTrip';
import ContactSection from '@/components/sections/Home/ContactSection';
import ItineraryDayTrip from '@/components/sections/day-trips/ItineraryDayTrip';
import IncludedExcludedDayTrip from '@/components/sections/day-trips/IncludedExcludedDayTrip';
import DayTripWhatsAppForm from '@/components/sections/day-trips/DayTripWhatsAppForm';
import OverviewTour from '@/components/sections/tour/OverviewTour';
import Mapgps from '@/components/sections/tour/Map';
import RelatedTours from '@/components/sections/tour/RelatedTours';
import { Metadata } from 'next';
import { createTourJsonLd } from '@/components/seo/tourseojsonld';
import { notFound } from "next/navigation";


const SITE_URL = "https://marrakechpackage.com";
const SITE_NAME = "Marrakech Package";

interface TourPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await getTourSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({params,}: TourPageProps): Promise<Metadata> {

  const { slug } = await params;
  const tour = await getDetailsTour(slug);

  if (!tour) {
    return {
      title: "Tour Not Found | Marrakech Package",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { acf } = tour;
  const tourTitle = htmlToText(tour.title.rendered);
  const title = acf.seo_title?.trim() || `${tourTitle} | Marrakech Package`;

  const description =acf.seo_description?.trim() || acf.hero_description?.trim() || htmlToText(tour.excerpt.rendered);
  const heroImage = getTourImage(acf.hero_image);
  const canonicalUrl = `${SITE_URL}/tours/${tour.slug}`;

  return {
    title,
    description,
    keywords: acf.keywords ? acf.keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean) : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
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
      title,
      description,
      images: heroImage
        ? [
            {
              url: heroImage.url,
              width: heroImage.width,
              height: heroImage.height,
              alt: heroImage.alt || `${tourTitle} - Marrakech Package`,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,

      images: heroImage ? [heroImage.url] : undefined,
    },
  };
}


async function page({params}: TourPageProps) : Promise<React.JSX.Element> {

    const {slug} = await params
    const tourdetails = await getDetailsTour(slug);

    if (!tourdetails) {
        notFound();
    }

     const relatedTours = await getRelatedToursByIds(
       tourdetails?.acf.related_tours ?? [],
       tourdetails?.id,
     );
    const {acf} = tourdetails;

    const jsonLd = createTourJsonLd(tourdetails);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      
      <HeroTour
        title={tourdetails.title.rendered}
        tourBadge={acf.tour_badge}
        heroDescription={acf.hero_description}
        heroImage={typeof acf.hero_image === "object" ? acf.hero_image : null}
        duration={acf.duration}
        experience={acf.experience}
        accommodation={acf.accommodation}
        departure={acf.departure?.name || "Not specified"}
      />
      <HighlightsDayTrip
        title={tourdetails.title.rendered}
        highlights={acf.highlights}
      />

      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            <OverviewTour
              overviewTitle={acf.overview_title}
              overviewContent={acf.overview_content}
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
              dayTripTitle={tourdetails.title.rendered}
              price={acf.price}
              priceLabel={acf.price_label}
            />
          </aside>
        </div>
      </section>
      {tourdetails.acf.map_embed_url ? (
        <section id="location" className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-3xl">
              <h2 className="m2-3 text-3xl font-extrabold leading-tight text-primary sm:text-4xl">
                Route and Location
              </h2>
            </div>

            <Mapgps trip={{ map_url: tourdetails.acf.map_embed_url }} />
          </div>
        </section>
      ) : null}
      <FaqDayTrip faq={acf.faq} />
      <RelatedTours tours={relatedTours} />
      <ContactSection />
    </>
  );
}

export default page
