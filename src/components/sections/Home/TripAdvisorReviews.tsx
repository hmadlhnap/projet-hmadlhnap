"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

type Review = {
  id: number;
  name: string;
  location?: string;
  title: string;
  text: string;
  rating: number;
  date?: string;
};

const TRIPADVISOR_URL = "https://www.tripadvisor.co.uk/Attraction_Review-g293734-d34329503-Reviews-Marrakech_Package-Marrakech_Marrakech_Safi.html";

const reviews: Review[] = [
  {
    id: 1,
    name: "Siria Z",
    title: "An unforgettable Moroccan adventure from Marrakech to Fes",
    rating: 5,
    text: `If you’re thinking about booking this tour, do it! It was truly one of the highlights of our trip to Morocco. In just three days we traveled from the vibrant city of Marrakech, through the breathtaking Atlas Mountains and stunning gorges, all the way to the spectacular dunes of Merzouga before arriving in Fes. Every stop was unique and gave us the chance to experience a different side of Morocco. Spending the night in the Sahara Desert, watching the sunset and sunrise over the dunes, and staying in the desert camp was simply magical. Everything was perfectly organized from start to finish. The itinerary was well planned, everything ran smoothly, and we never had to worry about a thing. We always felt we were in great hands. A very special thank you to Ahmed, who made this experience even more memorable. He was always punctual, incredibly kind, friendly, approachable, and genuinely passionate about what he does. He explained everything clearly, kept us informed throughout the trip, and was always happy to help with anything we needed. You can really tell that he cares about his guests and wants everyone to have an unforgettable experience—that personal touch made all the difference. If you’re looking for a trustworthy, professional, and well-organized tour company, you can book with complete confidence. This is the perfect way to discover some of Morocco’s most incredible landscapes and create memories that will stay with you forever. We would do it all over again without hesitation and recommend it wholeheartedly!`,
  },
  {
    id: 2,
    name: "Priscilla T",
    title: "Great guide Zaid",
    rating: 5,
    text: `Unforgettable desert trip with great guide Zaid My tour to the Moroccan desert was truly an unforgettable experience. From the very beginning, everything was perfectly organized, and the journey itself was filled with breathtaking landscapes, from the Atlas Mountains to the golden dunes of the Sahara. One of the highlights of the trip was our guide Zaid, he was incredibly friendly, knowledgeable, attentive and always made sure everyone felt comfortable and safe. Zaid shared fascinating insights about Moroccan culture, history, and local traditions, which made the experience even more meaningful. The desert itself was magical, riding camels at sunset, watching the sky turn shades of orange and pink and spending the night under a sky full of stars was something I will never forget. The camp was well-prepared, with great food, music, and a warm atmosphere that made us feel welcome Overall, I highly recommend this desert tour to anyone visiting Morocco. It's not just a trip—it's an experience full of adventure, culture, and unforgettable memories. And if you're lucky enough to have Zaid as your guide, you're in excellent hands.`,
  },
  {
    id: 3,
    name: "lamenchingman",
    location: "Hong Kong, China",
    title: "The best way to see Morocco: A private tour with Ahmed",
    rating: 5,
    date: "26 June 2026",
    text: `Ahmed organized a phenomenal private tour for us in Morocco. His communication before and during the trip was excellent, and the entire experience felt completely tailored to what we wanted to see and do. He is an outstanding guide. He is professional, reliable, and wonderful company. We felt safe and well-looked after the entire time. Thank you, Ahmed, for making our time in Morocco so magical!`,
  },
];

function RatingDots({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-[3px]"
      aria-label={`${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={`h-[11px] w-[11px] rounded-full ${
            index < rating ? "bg-[#008A42]" : "bg-[#E2E5E2]"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="
        flex h-full flex-col
        rounded-[18px]
        border border-border/60
        bg-white
        p-5
        transition-shadow duration-300
        md:p-6
      "
    >
      {/* Quote icon */}
      <div
        aria-hidden="true"
        className="
          mb-1 font-heading
          text-[58px] leading-[0.65]
          text-[#E6D6B5]
        "
      >
        &ldquo;
      </div>

      {/* Review text */}
      <div className="flex-1 pt-2">
        <p
          className={`
            font-heading
            text-[18px]
            leading-[1.55]
            text-text-main
            md:text-[19px]
            ${expanded ? "" : "line-clamp-5"}
          `}
        >
          {review.text}
        </p>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className=" mt-3 inline-flex cursor-pointer items-center gap-1 font-body text-[13px] font-semibold text-primary transition-colors hover:text-primary-hover">
          {expanded ? "Read less" : "Read more"}

          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Separator */}
      <div className="my-4 h-px bg-border/70" />

      {/* Reviewer information */}
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3
            className="
              !font-body text-[14px]
              font-bold text-heading
            "
          >
            {review.name}
          </h3>

          <div className="mt-2">
            <RatingDots rating={review.rating} />
          </div>

          <p
            className="
              mt-2 font-body
              text-[12px] leading-relaxed
              text-text-secondary
            "
          >
            {review.title}
          </p>
        </div>
      </div>
    </article>
  );
}



export default function TripAdvisorReviews() {
  return (
    <section
      aria-labelledby="traveller-reviews-title"
      className="bg-background py-6"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <span
            className=" font-body text-[11px] font-bold uppercase tracking-[0.22em] text-gold  " >
            Traveller Reviews
          </span>

          <h2
            id="traveller-reviews-title"
            className="
              mt-3 font-heading
              text-[40px]
              font-normal leading-[1.1]
              text-heading
              sm:text-[28px]
              lg:text-[32px]
            "
          >
            What Our Guests Say
          </h2>

          <p
            className="
              mx-auto mt-3 max-w-xl
              font-body text-[13px]
              leading-relaxed
              text-text-muted
              md:text-base
            "
          >
            Real stories from travellers who&apos;ve explored Morocco with us.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-body text-[13px] text-text-muted">
            Guest experiences shared on TripAdvisor
          </p>

          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer external"
            aria-label="Read our reviews on TripAdvisor (opens in a new tab)"
            className=" inline-flex items-center justify-center gap-2 rounded-full border border-primary px-5 py-2.5 font-body text-[13px] font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground">
            View All Reviews on TripAdvisor
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
