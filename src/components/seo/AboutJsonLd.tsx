type AboutJsonLdProps = {
  siteUrl: string;
  email: string;
  phone: string;
  founderName: string;
  city: string;
  region: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  opens: string;
  closes: string;
};

export default function AboutJsonLd({siteUrl,email,phone,founderName,city,region,countryCode,latitude,longitude,opens,closes,}: AboutJsonLdProps): React.JSX.Element {

  
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": `${siteUrl}/#organization`,
        name: "Marrakech Package",
        url: siteUrl,
        email,
        telephone: phone,
        image: `${siteUrl}/images/hero.jpeg`,
        logo: `${siteUrl}/images/logofooter.jpeg`,
        priceRange: "$$",
        founder: {
          "@type": "Person",
          name: founderName,
          jobTitle: "Founder",
          worksFor: { "@id": `${siteUrl}/#organization` },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: city,
          addressRegion: region,
          postalCode: "40000",
          addressCountry: countryCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude,
          longitude,
        },
        areaServed: { "@type": "Country", name: "Morocco" },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens,
          closes,
        },
      },
      {
        "@type": "AboutPage",
        "@id": `${siteUrl}/about/#webpage`,
        url: `${siteUrl}/about`,
        name: "About Marrakech Package",
        about: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: `${siteUrl}/about`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}