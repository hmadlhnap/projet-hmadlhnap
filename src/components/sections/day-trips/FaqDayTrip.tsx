"use client";

import { useState } from "react";
import FaqItem from "@/components/ui/FaqItem";

type FaqDayTripProps = {
  faq: string;
};

type FaqData = {
  question: string;
  answer: string;
};

function cleanText(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function parseFaq(faq: string): FaqData[] {
  const items: FaqData[] = [];

  const pattern = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;

  for (const match of faq.matchAll(pattern)) {
    items.push({
      question: cleanText(match[1]),
      answer: cleanText(match[2]),
    });
  }

  return items;
}

export default function FaqDayTrip({ faq }: FaqDayTripProps) {
  const faqItems = parseFaq(faq);

  const [openIndex, setOpenIndex] = useState<number | null>(-1);

  if (faqItems.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="faq-day-trip-title" className="bg-background">
      <div className="mx-auto max-w-7xl  px-4 py-4 sm:px-6 sm:pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="faq-day-trip-title"
            className="mt-3 text-3xl font-bold text-heading sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-base leading-7 text-text-secondary">
            Find answers to common questions about this day trip,
            transportation, schedules and booking.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-4 lg:grid-cols-2">
          {faqItems.map((item, index) => (
            <FaqItem
              key={`${item.question}-${index}`}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
