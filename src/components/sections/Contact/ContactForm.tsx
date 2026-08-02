"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm({numero}:{numero: string}): React.JSX.Element {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const text =
      `Hello! I'd like to get in touch.\n\n` +
      `👤 Name: ${fullName}\n` +
      `📧 Email: ${email}\n` +
      (whatsapp ? `📱 WhatsApp: ${whatsapp}\n` : "") +
      `\n💬 Message:\n${message}`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };


  return (
    <div
      id="contact-form" className="flex h-full flex-col rounded-[6px] bg-card p-6">
     
     
      <div className="flex items-center gap-2">
        <Send className="h-4 w-4 text-primary" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          Send Us a Message
        </span>
      </div>

      <h2 className="mt-3 text-2xl font-bold text-heading sm:text-3xl">
        We&apos;re Here to Help
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-1 flex-col space-y-5"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Full Name">
            <input
              type="text"
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Your full name"
              className={inputClass}
            />
          </Field>

          <Field label="Email Address">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="WhatsApp (Optional)">
          <input
            type="tel"
            value={whatsapp}
            onChange={(event) => setWhatsapp(event.target.value)}
            placeholder="Your WhatsApp number"
            className={inputClass}
          />
        </Field>

        <div className="flex flex-1 flex-col">
          <Field label="Message">
            <textarea
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell us about your trip, interests, or any questions…"
              className={`${inputClass} h-full min-h-[120px] flex-1 resize-y`}
            />
          </Field>
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send Message
        </button>
      </form>
    </div>
  );
}

const inputClass = "w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-heading placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

function Field({ label, children,}: {label: string; children: React.ReactNode;}): React.JSX.Element {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-text-secondary">
        {label}
      </span>
      {children}
    </label>
  );
}
