import type { MetadataRoute } from "next";

import { getActivitySlugs } from "@/data/activities";
import { getBlogPostSlugs } from "@/lib/blogs";
import { getDayTripSlugs } from "@/lib/daytrips";
import { getTourSlugs } from "@/lib/tours";

const SITE_URL = "https://marrakechpackage.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const activitySlugs = getActivitySlugs();

  const [blogSlugs, dayTripSlugs, tourSlugs] = await Promise.all([
    getBlogPostSlugs(),
    getDayTripSlugs(),
    getTourSlugs(),
  ]);

  /* =========================================================
     STATIC PAGES
  ========================================================= */

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/marrakech-tours`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/destinations`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/shared-group-tours`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/day-trips`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/activities`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  /* =========================================================
     TOUR PAGES
  ========================================================= */

  const tourPages: MetadataRoute.Sitemap = tourSlugs.map((slug) => ({
    url: `${SITE_URL}/tours/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  /* =========================================================
     DAY TRIP PAGES
  ========================================================= */

  const dayTripPages: MetadataRoute.Sitemap = dayTripSlugs.map((slug) => ({
    url: `${SITE_URL}/day-trips/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  /* =========================================================
     BLOG POSTS
  ========================================================= */

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  /* =========================================================
     ACTIVITY PAGES
  ========================================================= */

  const activityPages: MetadataRoute.Sitemap = activitySlugs.map((slug) => ({
    url: `${SITE_URL}/activities/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  /* =========================================================
     FINAL SITEMAP
  ========================================================= */

  return [
    ...staticPages,
    ...tourPages,
    ...dayTripPages,
    ...activityPages,
    ...blogPages,
  ];
}
