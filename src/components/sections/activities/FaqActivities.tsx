"use client";

import { useState } from "react";

import FaqItem from "@/components/ui/FaqItem";

import type { ActivityFaq } from "@/data/activities";

interface FaqActivitiesProps {
  faq: ActivityFaq[];
}

export default function FaqActivities({ faq }: FaqActivitiesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faq.length === 0) {
    return null;
  }

  function handleToggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section aria-labelledby="activity-faq-title" className="bg-background py-6 lg:py-8" >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Useful Information
          </p>

          <h2
            id="activity-faq-title"
            className="mt-3 text-3xl font-bold leading-tight text-heading sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-base leading-7 text-text-secondary">
            Find answers to common questions about this Marrakech experience,
            including timing, transportation, preparation and what to expect.
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-10 space-y-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {faq.map((item, index) => (
            <FaqItem
              key={`${index}-${item.question}`}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
