"use client";

import React, {useState } from "react";
import FaqItem from "@/components/ui/FaqItem";

const FAQ_IDS = [
  {
    q: "What is included in a Marrakech Package?",
    a: "Most Marrakech packages include transportation, accommodation, guided sightseeing, and selected activities. The exact inclusions depend on the package you choose.",
  },
  {
    q: "What's the difference between a private tour and a shared tour?",
    a: "A private tour is reserved exclusively for you and your group, offering greater flexibility and a personalized itinerary. A shared tour includes other travelers and follows a fixed schedule.",
  },
  {
    q: "What is the best Marrakech Package for first-time visitors?",
    a: "For first-time visitors, a package combining Marrakech's main attractions, a guided Medina tour, local cultural experiences, and a nearby day trip is usually the best option.",
  },
  {
    q: "Is Morocco safe for tourists?",
    a: "Morocco is generally considered a safe destination for tourists. Travelers should follow standard precautions, protect their belongings, and use trusted guides and transportation services.",
  },
  {
    q: "What should I pack for a Morocco Desert Tour?",
    a: "Pack comfortable clothing, walking shoes, sunscreen, sunglasses, a hat, a reusable water bottle, and warm layers for the evening, as desert temperatures can drop after sunset.",
  },
  {
    q: "Do I need a visa to visit Morocco?",
    a: "Visa requirements depend on your nationality and the length of your stay. Check the latest entry requirements with the Moroccan embassy or official authorities before traveling.",
  },
];


function FAQ(): React.JSX.Element {
  const [openId, setOpenId] = useState<string | null>(FAQ_IDS[FAQ_IDS.length]?.q ?? null);

  return (
    <section
      className="relative overflow-hidden bg-background px-4 py-4 text-foreground sm:px-6 lg:px-8 lg:py-6"
      aria-labelledby="faq-title"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            id="faq-title"
            className="mt-3 font-body text-2xl font-extrabold leading-[1.15] tracking-tight text-heading sm:text-3xl lg:text-4xl"
          >
            Everything You Need to Know
            <span className="text-primary"> About Marrakech Packages</span>
          </h2>
          <p className="mx-auto my-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Find answers to the most common questions about our tours, services,
            and traveling in Morocco.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-3 sm:gap-4">
          <div className="grid grid-cols-1 lg:columns-2 gap-3 sm:gap-4 sm:grid-cols-2">
            {FAQ_IDS.map((faqId) => (
              <div key={faqId.q} className="h-fit">
                <FaqItem
                  question={faqId.q}
                  answer={faqId.a}
                  isOpen={openId === faqId.q}
                  onClick={() => setOpenId(openId === faqId.q ? null : faqId.q)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
