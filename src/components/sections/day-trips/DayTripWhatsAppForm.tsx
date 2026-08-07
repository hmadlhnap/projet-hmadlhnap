"use client";

import type { FormEvent } from "react";
import { Mail, MessageCircle } from "lucide-react";


interface DayTripWhatsAppFormProps {dayTripTitle: string;}

export default function DayTripWhatsAppForm({ dayTripTitle,}: DayTripWhatsAppFormProps) {


  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const whatsappNumber = "212642618936";

    const whatsappMessage = `Hello Marrakech Package, I am interested in: ${dayTripTitle} Email:${email} Message: ${message}`.trim();

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }


  return (
    <div className="overflow-hidden rounded-[6px] border border-border bg-card">
      {/* Header */}
      <div className="bg-primary p-4">
        <div className="flex size-11 items-center justify-center rounded-full bg-primary-foreground text-primary">
          <MessageCircle aria-hidden="true" className="size-6" />
        </div>

        <h2 className="mt-4 text-3xl font-bold leading-tight text-primary-foreground">
          Ask About This Day Trip
        </h2>

        <p className="mt-2 text-sm leading-6 text-primary-foreground">
          Send us your question directly through WhatsApp.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 p-5">
        {/* Email */}
        <div>
          <label
            htmlFor="day-trip-email"
            className="mb-2 block text-sm font-semibold text-heading"
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-muted"
            />

            <input
              id="day-trip-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="
                h-12 w-full rounded-lg border border-border
                bg-background pl-11 pr-4
                text-sm text-text-main
                outline-none transition
                placeholder:text-text-muted
                focus:border-primary
                focus:ring-2 focus:ring-primary/15
              "
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="day-trip-message"
            className="mb-2 block text-sm font-semibold text-heading"
          >
            Message
          </label>

          <textarea
            id="day-trip-message"
            name="message"
            required
            rows={5}
            placeholder="Tell us your preferred date, number of travelers or any special request..."
            className="
              w-full resize-none rounded-lg border border-border
              bg-background px-4 py-3
              text-sm leading-6 text-text-main
              outline-none transition
              placeholder:text-text-muted
              focus:border-primary
              focus:ring-2 focus:ring-primary/15
            "
          />
        </div>

        {/* WhatsApp button */}
        <button
          type="submit"
          className="
            flex h-12 w-full items-center justify-center gap-2
            rounded-lg bg-whatsapp px-5
            font-semibold text-footer
            transition
            hover:opacity-90
            focus:outline-none
            focus:ring-2 focus:ring-whatsapp/30
          "
        >
          <MessageCircle aria-hidden="true" className="size-5" />
          Send via WhatsApp
        </button>

        <p className="text-center text-xs leading-5 text-text-muted">
          WhatsApp will open with your message ready to send.
        </p>
      </form>
    </div>
  );
}
