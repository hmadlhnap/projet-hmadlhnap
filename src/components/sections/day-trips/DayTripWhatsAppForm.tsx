"use client";

import type { FormEvent } from "react";
import { CircleDollarSign, MessageCircle, User } from "lucide-react";

interface DayTripWhatsAppFormProps {
  dayTripTitle: string;
  price: number | string | null;
  priceLabel?: string;
}

export default function DayTripWhatsAppForm({dayTripTitle,price,priceLabel,}: DayTripWhatsAppFormProps) {

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "").trim();

    const message = String(formData.get("message") || "").trim();

    const whatsappNumber = "212642618936";

    const whatsappMessage = `Hello Marrakech Package, I am interested in: ${dayTripTitle} Name: ${name} Message: ${message}`.trim();

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }


  return (
    <div className="overflow-hidden rounded-[8px] border border-border bg-card">
      {/* Header */}
      <div className="bg-primary p-3">
        <div className="flex size-11 items-center justify-center rounded-full bg-primary-foreground text-primary">
          <MessageCircle aria-hidden="true" className="size-5" />
        </div>

        <h2 className="mt-4 text-3xl font-bold leading-tight text-primary-foreground">
          Ask About This Trip
        </h2>

        <p className="mt-2 text-sm leading-6 text-primary-foreground/90">
          Send us your question directly through WhatsApp.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 p-4">
        {/* Name */}
        <div>
          <label
            htmlFor="day-trip-name"
            className="mb-2 block text-sm font-semibold text-heading"
          >
            Your name
          </label>

          <div className="relative">
            <User
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-muted"
            />

            <input
              id="day-trip-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your full name"
              className="
                h-12 w-full rounded-lg border border-border
                bg-background pl-11 pr-4
                text-sm text-text-main
                outline-none transition"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="day-trip-message"
            className="mb-2 block text-sm font-semibold text-heading"
          >
            Your message
          </label>

          <textarea
            id="day-trip-message"
            name="message"
            required
            rows={5}
            placeholder="Tell us your preferred date, number of travelers or any special request..."
            className="
              w-full resize-none rounded-lg border border-border
              bg-background p-3
              text-sm leading-6 text-text-main
              outline-none transition
              placeholder:text-text-muted            "
          />
        </div>

        {/* WhatsApp button */}
        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-whatsapp px-5
            font-semibold text-footer
            transition
            hover:opacity-90"
        >
          <MessageCircle aria-hidden="true" className="size-5" />
          Send via WhatsApp
        </button>

        <p className="text-center text-xs leading-5 text-text-muted">
          WhatsApp will open with your message ready to send.
        </p>
      </form>

      {price !== null && price !== undefined && price !== "" && (
        <div className="border-t border-border">
          <div className="flex items-center justify-between gap-4 rounded-xl bg-surface-soft p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-muted text-primary">
                <CircleDollarSign aria-hidden="true" className="size-5" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                  Tour price
                </p>

                {priceLabel && (
                  <p className="mt-1 text-sm text-text-secondary">
                    {priceLabel}
                  </p>
                )}
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-heading">€{price}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
