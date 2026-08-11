export interface ActivityImage {
  src: string;
  alt: string;
}

export interface ActivityHighlight {
  title: string;
  description?: string;
  icon:
    | "sunrise"
    | "mountain"
    | "palm"
    | "camera"
    | "certificate"
    | "breakfast"
    | "safety"
    | "transport"
    | "pilot"
    | "group"
    | "landmark"
    | "map"
    | "walk"
    | "culture"
    | "camel"
    | "sunset";
}


export interface ActivityItineraryStep {
  title: string;
  description: string;
}

export interface ActivityCard {
  id: number;
  slug: string;
  title: string;
  badge: string;
  shortDescription: string;
  heroImage: ActivityImage;
  duration: string;
  activityType: string;
  pickup: string;
}

export interface ActivityFaq {
  question: string;
  answer: string;
}

export interface ActivitySeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface Activity {
  id: number;

  slug: string;
  title: string;
  badge: string;
  shortDescription: string;

  seo: ActivitySeo;

  heroImage: ActivityImage;
  contentImage: ActivityImage;

  duration: string;
  activityType: string;
  pickup: string;
  languages: string[];

  highlights: ActivityHighlight[];

  overviewTitle: string;
  overview: string[];

  itineraryTitle: string;
  itinerary: ActivityItineraryStep[];

  included: string[];
  excluded: string[];

  faq: ActivityFaq[];
}


export const activities: Activity[] = [
  {
    id: 1,

    slug: "air-balloon-ride-marrakech",

    title: "Air Balloon Ride Marrakech",

    badge: "HOT AIR BALLOON",

    shortDescription:
      "Fly above Marrakech at sunrise with views of the Atlas Mountains, palm groves and surrounding countryside, followed by a traditional Moroccan breakfast.",

    seo: {
      title: "Air Balloon Ride Marrakech | Hot Air Balloon Experience",

      description:
        "Book an air balloon ride Marrakech experience with sunrise views, Atlas Mountains scenery, hotel pickup, professional pilot and Moroccan breakfast.",

      keywords: [
        "air balloon ride marrakech",
        "hot air balloon marrakech",
        "marrakech balloon ride",
        "hot air balloon morocco",
        "marrakech activities",
        "atlas mountains balloon ride",
      ],
    },

    heroImage: {
      src: "/activities/ballon1.webp",
      alt: "Air balloon ride Marrakech at sunrise with Atlas Mountains views",
    },

    contentImage: {
      src: "/activities/gallon2.webp",
      alt: "Hot air balloon flight above the Marrakech countryside",
    },

    duration: "3–4 Hours",

    activityType: "Shared / Private",

    pickup: "Hotel Pick-up & Drop-off",

    languages: ["English", "French", "Spanish"],

    highlights: [
      {
        title: "Sunrise Balloon Flight",
        icon: "sunrise",
      },
      {
        title: "Atlas Mountains Views",
        icon: "mountain",
      },
      {
        title: "Palm Groves & Villages",
        icon: "palm",
      },
      {
        title: "Photo Opportunities",
        icon: "camera",
      },
      {
        title: "Flight Certificate",
        icon: "certificate",
      },
      {
        title: "Moroccan Breakfast",
        icon: "breakfast",
      },
      {
        title: "Safety First",
        icon: "safety",
      },
      {
        title: "Hotel Transportation",
        icon: "transport",
      },
    ],

    overviewTitle: "About This Experience",

    overview: [
      "See the Marrakech countryside from above during an early-morning hot air balloon flight. The experience combines sunrise views, open landscapes, palm groves and distant views of the Atlas Mountains.",

      "The activity begins with an early pickup from Marrakech and transportation to the launch area. After meeting the flight team and receiving a safety briefing, watch the balloon preparation before take-off.",

      "During the flight, travel above rural landscapes and traditional villages outside Marrakech. Flight direction and landing location depend on wind and operating conditions.",

      "After landing, continue the experience with a traditional Moroccan breakfast before transportation back to Marrakech.",
    ],

    itineraryTitle: "Air Balloon Ride Marrakech Itinerary",

    itinerary: [
      {
        title: "Hotel Pick-up",
        description:
          "Early morning pickup from your hotel, riad or the nearest accessible meeting point in Marrakech.",
      },
      {
        title: "Transfer to the Launch Area",
        description:
          "Travel outside Marrakech toward the balloon take-off area while the flight team prepares for departure.",
      },
      {
        title: "Pre-flight Briefing",
        description:
          "Meet the pilot, receive the necessary safety instructions and watch the balloon being prepared for flight.",
      },
      {
        title: "Hot Air Balloon Flight",
        description:
          "Fly above the Marrakech countryside with views of palm groves, villages, open landscapes and the Atlas Mountains.",
      },
      {
        title: "Landing & Moroccan Breakfast",
        description:
          "After landing, return with the flight team and enjoy a traditional Moroccan breakfast.",
      },
      {
        title: "Return to Marrakech",
        description:
          "Travel back to Marrakech for drop-off at your accommodation or agreed meeting point.",
      },
    ],

    included: [
      "Hotel pick-up and drop-off",
      "Transportation to the balloon launch area",
      "Hot air balloon flight",
      "Professional pilot",
      "Pre-flight safety briefing",
      "Traditional Moroccan breakfast",
      "Moroccan tea",
      "Flight certificate",
    ],

    excluded: [
      "Personal expenses",
      "Tips and gratuities",
      "Optional extras",
      "Services not mentioned in the included section",
    ],

    faq: [
      {
        question:
          "How long does the Air Balloon Ride Marrakech experience last?",
        answer:
          "The complete experience generally lasts around 3 to 4 hours, including pickup, transfer, flight preparation, the balloon ride, breakfast and return transportation.",
      },
      {
        question: "What time does the hot air balloon activity start?",
        answer:
          "Pickup takes place early in the morning before sunrise. The exact departure time varies according to the season and is confirmed before the activity.",
      },
      {
        question: "Is hotel pickup included?",
        answer:
          "Yes. Transportation from Marrakech to the launch area and return transportation after the activity are included according to the confirmed pickup arrangements.",
      },
      {
        question: "How long is the actual balloon flight?",
        answer:
          "The exact flight duration depends on weather, wind and operating conditions.",
      },
      {
        question: "What happens if the weather is unsuitable?",
        answer:
          "Hot air balloon flights require suitable weather conditions and may be delayed, rescheduled or cancelled when conditions are considered unsafe.",
      },
      {
        question: "Is breakfast included?",
        answer:
          "Yes. A traditional Moroccan breakfast is included after the balloon flight.",
      },
    ],
  },

  {
    id: 2,

    slug: "marrakech-tour-guide",

    title: "Marrakech Tour Guide",

    badge: "GUIDED CITY TOUR",

    shortDescription:
      "Explore Marrakech with a local guide through the Medina, historic landmarks, traditional souks and cultural sites while learning about the city’s history and daily life.",

    seo: {
      title: "Marrakech Tour Guide | Private Guided City Tour",

      description:
        "Explore the Medina with a Marrakech tour guide and visit historic landmarks, traditional souks and cultural sites on a private guided city tour.",

      keywords: [
        "marrakech tour guide",
        "marrakech guided tour",
        "marrakech city tour",
        "private guide marrakech",
        "marrakech medina tour",
        "marrakech activities",
      ],
    },

    heroImage: {
      src: "/activities/guide1.webp",
      alt: "Marrakech tour guide walking through the historic Medina",
    },

    contentImage: {
      src: "/activities/guide2.webp",
      alt: "Guided Marrakech city tour through traditional souks and historic streets",
    },

    duration: "3–4 Hours",

    activityType: "Private",

    pickup: "Hotel / Riad Meeting Point",

    languages: ["English", "French", "Spanish"],

    highlights: [
      {
        title: "Local Marrakech Guide",
        icon: "group",
      },
      {
        title: "Historic Medina",
        icon: "landmark",
      },
      {
        title: "Traditional Souks",
        icon: "culture",
      },
      {
        title: "Historic Landmarks",
        icon: "map",
      },
      {
        title: "Walking Experience",
        icon: "walk",
      },
      {
        title: "Local Culture",
        icon: "culture",
      },
      {
        title: "Photo Opportunities",
        icon: "camera",
      },
      {
        title: "Private Experience",
        icon: "group",
      },
    ],

    overviewTitle: "About the Marrakech Guided Tour",

    overview: [
      "Explore the historic center of Marrakech with a local guide who can provide context about the city’s architecture, traditions and everyday life.",

      "The Marrakech tour guide experience focuses on the Medina and its most characteristic areas, including narrow streets, traditional souks, historic monuments and lively public spaces.",

      "Walking with a guide makes it easier to understand how the different areas of the Medina connect while learning more about Moroccan craftsmanship, history and local customs.",

      "The private format allows the visit to move at a comfortable pace and gives travelers time to ask questions throughout the tour.",
    ],

    itineraryTitle: "Marrakech Tour Guide Itinerary",

    itinerary: [
      {
        title: "Meet Your Guide",
        description:
          "Meet your local guide at your accommodation or an agreed meeting point in central Marrakech.",
      },
      {
        title: "Explore the Historic Medina",
        description:
          "Walk through the old city while learning about Marrakech, its architecture and the development of the Medina.",
      },
      {
        title: "Visit the Traditional Souks",
        description:
          "Continue through the souks and see workshops, local products and traditional Moroccan craftsmanship.",
      },
      {
        title: "Historic & Cultural Stops",
        description:
          "Visit selected historic and cultural areas according to the itinerary and available time.",
      },
      {
        title: "Local Life & Hidden Streets",
        description:
          "Walk through quieter sections of the Medina and learn more about daily life inside Marrakech's old city.",
      },
      {
        title: "End of the Guided Tour",
        description:
          "Finish the tour in central Marrakech or at an agreed location with your guide.",
      },
    ],

    included: [
      "Professional local Marrakech guide",
      "Private guided walking tour",
      "Medina orientation",
      "Visit to traditional souks",
      "Historical and cultural explanations",
      "Flexible walking pace",
    ],

    excluded: [
      "Entrance tickets to monuments",
      "Food and drinks",
      "Transportation unless arranged",
      "Personal expenses",
      "Tips and gratuities",
    ],

    faq: [
      {
        question: "How long does the Marrakech tour guide experience last?",
        answer:
          "The standard guided visit normally lasts around 3 to 4 hours depending on the itinerary, walking pace and selected stops.",
      },
      {
        question: "Is the Marrakech guided tour private?",
        answer:
          "Yes. This activity can be organized as a private guided experience for the travelers included in your reservation.",
      },
      {
        question: "Where does the Marrakech city tour start?",
        answer:
          "The meeting point can be arranged at your riad, hotel or another convenient location in central Marrakech.",
      },
      {
        question: "Does the tour include the Marrakech souks?",
        answer:
          "Yes. The walking itinerary can include traditional souks and artisan areas within the Medina.",
      },
      {
        question: "Are monument entrance tickets included?",
        answer:
          "Entrance fees are not included unless specifically confirmed as part of your booking.",
      },
      {
        question: "What should I wear for the walking tour?",
        answer:
          "Comfortable walking shoes and weather-appropriate clothing are recommended because much of the experience takes place on foot.",
      },
    ],
  },

  {
    id: 3,

    slug: "agafay-desert-experience",

    title: "Agafay Desert Experience",

    badge: "AGAFAY DESERT",

    shortDescription:
      "Travel from Marrakech to the rocky landscapes of the Agafay Desert for Atlas Mountain views, a camel experience, Moroccan hospitality and sunset in the countryside.",

    seo: {
      title: "Agafay Desert Experience | Tour from Marrakech",

      description:
        "Travel from Marrakech to the Agafay Desert for rocky landscapes, Atlas Mountain views, camel riding, Moroccan hospitality and a memorable sunset experience.",

      keywords: [
        "agafay desert",
        "agafay desert tour from marrakech",
        "agafay desert experience",
        "agafay camel ride",
        "agafay desert marrakech",
        "marrakech activities",
      ],
    },

    heroImage: {
      src: "/activities/agafy1.webp",
      alt: "Agafay Desert landscape near Marrakech with Atlas Mountains views",
    },

    contentImage: {
      src: "/activities/agafy2.webp",
      alt: "Camel experience in the Agafay Desert near Marrakech",
    },

    duration: "4–6 Hours",

    activityType: "Shared / Private",

    pickup: "Hotel Pick-up & Drop-off",

    languages: ["English", "French", "Spanish"],

    highlights: [
      {
        title: "Agafay Desert Landscapes",
        icon: "mountain",
      },
      {
        title: "Atlas Mountains Views",
        icon: "mountain",
      },
      {
        title: "Camel Experience",
        icon: "camel",
      },
      {
        title: "Desert Sunset",
        icon: "sunset",
      },
      {
        title: "Moroccan Hospitality",
        icon: "culture",
      },
      {
        title: "Photo Opportunities",
        icon: "camera",
      },
      {
        title: "Hotel Transportation",
        icon: "transport",
      },
      {
        title: "Small Group Experience",
        icon: "group",
      },
    ],

    overviewTitle: "About the Agafay Desert Experience",

    overview: [
      "Travel outside Marrakech toward the open landscapes of the Agafay Desert, where rocky hills and wide plains create a very different setting from the busy streets of the city.",

      "The experience combines transportation from Marrakech with time in the desert environment, panoramic views and selected activities according to the package booked.",

      "A camel experience can be included as part of the visit, giving travelers time to cross part of the landscape at a slower pace before relaxing in the desert surroundings.",

      "Later in the day, the changing light across the rocky terrain creates an ideal setting for sunset before returning to Marrakech.",
    ],

    itineraryTitle: "Agafay Desert Experience Itinerary",

    itinerary: [
      {
        title: "Pick-up in Marrakech",
        description:
          "Pickup from your hotel, riad or an agreed accessible meeting point in Marrakech.",
      },
      {
        title: "Transfer to Agafay",
        description:
          "Travel outside Marrakech toward the open rocky landscapes of the Agafay Desert.",
      },
      {
        title: "Explore the Desert Landscape",
        description:
          "Spend time in the Agafay region with opportunities to enjoy panoramic scenery and take photographs.",
      },
      {
        title: "Camel Experience",
        description:
          "Ride through part of the desert landscape by camel according to the activity package selected.",
      },
      {
        title: "Sunset & Relaxation",
        description:
          "Relax in the desert surroundings as the light changes across the hills and Atlas Mountain horizon.",
      },
      {
        title: "Return to Marrakech",
        description:
          "Travel back to Marrakech for drop-off at your accommodation or agreed meeting point.",
      },
    ],

    included: [
      "Hotel pick-up and drop-off",
      "Transportation from Marrakech",
      "Agafay Desert visit",
      "Camel experience",
      "Local assistance",
      "Moroccan tea",
      "Sunset experience",
    ],

    excluded: [
      "Personal expenses",
      "Tips and gratuities",
      "Optional activities",
      "Food unless included in the selected package",
      "Services not mentioned in the included section",
    ],

    faq: [
      {
        question: "Where is the Agafay Desert?",
        answer:
          "The Agafay Desert is located outside Marrakech and is known for its rocky, arid landscapes rather than the large sand dunes found in the Sahara.",
      },
      {
        question: "How long does the Agafay Desert experience last?",
        answer:
          "The complete experience normally lasts several hours depending on transportation, selected activities and the package booked.",
      },
      {
        question: "Is hotel pickup included?",
        answer:
          "Yes. Pickup and return transportation from Marrakech can be included according to the confirmed booking arrangements.",
      },
      {
        question: "Is camel riding included in Agafay?",
        answer:
          "A camel experience can be included as part of the activity. The exact duration depends on the package selected.",
      },
      {
        question: "Is Agafay the same as the Sahara Desert?",
        answer:
          "No. Agafay has a rocky and arid landscape rather than the large sand dune fields associated with destinations such as Merzouga.",
      },
      {
        question: "What should I bring to Agafay?",
        answer:
          "Comfortable shoes, sun protection and layered clothing are recommended because temperatures can change between daytime and evening.",
      },
    ],
  },
];


export function getActivityBySlug(slug: string): Activity | undefined {
  return activities.find((activity) => activity.slug === slug);
}

export function getActivitySlugs(): string[] {
  return activities.map((activity) => activity.slug);
}

export function getActivitiesCards(): ActivityCard[] {
  return activities.map((activity) => ({
    id: activity.id,
    slug: activity.slug,
    title: activity.title,
    badge: activity.badge,
    shortDescription: activity.shortDescription,
    heroImage: activity.heroImage,
    duration: activity.duration,
    activityType: activity.activityType,
    pickup: activity.pickup,
  }));
}