import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getActivityBySlug, getActivitySlugs } from "@/data/activities";
import HeroTour from "@/components/sections/tour/HeroTour";
import HighlightsActivities from "@/components/sections/activities/HighlightsActivities";
import OverviewActivities from "@/components/sections/activities/OverviewActivities";
import ItineraryActivities from "@/components/sections/activities/ItineraryActivities";
import FaqActivities from "@/components/sections/activities/FaqActivities";
import { createActivityJsonLd } from "@/components/seo/activitiesseojson";

const SITE_URL =process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || "https://marrakechpackage.com";
const SITE_NAME = "Marrakech Package";

interface ActivityPageProps {
  params: Promise<{
    slug: string;
  }>;
}


export function generateStaticParams(): Array<{ slug: string }> {
  const slugs = getActivitySlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}


function getAbsoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
       return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function getActivityUrl(slug: string): string {
  return `${SITE_URL}/activities/${slug}`;
}


export async function generateMetadata({params,}: ActivityPageProps): Promise<Metadata> {

  const { slug } = await params;

  const activity = getActivityBySlug(slug);

  if (!activity) {
    return {
      title: "Activity Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = getActivityUrl(activity.slug);
  const heroImageUrl = getAbsoluteUrl(activity.heroImage.src);
  const contentImageUrl = getAbsoluteUrl(activity.contentImage.src);

  return {
    title: activity.seo.title,
    description: activity.seo.description,
    keywords: activity.seo.keywords,
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
      title: activity.seo.title,
      description: activity.seo.description,
      images: [
        {
          url: heroImageUrl,
          alt: activity.heroImage.alt,
        },
        {
          url: contentImageUrl,
          alt: activity.contentImage.alt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: activity.seo.title,
      description: activity.seo.description,
      images: [heroImageUrl],
    },
  };
}


export default async function ActivityPage({ params }: ActivityPageProps) {
  const { slug } = await params;

  const activity = getActivityBySlug(slug);

  if (!activity) {
    notFound();
  }
  
  const jsonLd = createActivityJsonLd(activity);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <HeroTour
        title={activity.title}
        tourBadge={activity.badge}
        heroDescription={activity.shortDescription}
        heroImage={{
          url: activity.heroImage.src,
          alt: activity.heroImage.alt,
        }}
        duration={activity.duration}
        experience={activity.activityType}
        accommodation={activity.pickup}
        departure="Marrakech"
      />
      <HighlightsActivities highlights={activity.highlights} />
      <OverviewActivities
        contentImage={activity.contentImage}
        overviewTitle={activity.overviewTitle}
        overview={activity.overview}
        duration={activity.duration}
        activityType={activity.activityType}
        pickup={activity.pickup}
        languages={activity.languages}
      />
      <ItineraryActivities
        itineraryTitle={activity.itineraryTitle}
        itinerary={activity.itinerary}
        included={activity.included}
        excluded={activity.excluded}
      />
      <FaqActivities faq={activity.faq} />
    </>
  );
}
