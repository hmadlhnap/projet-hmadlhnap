"use client";

import { useState } from "react";
import { Calendar, MapPin, Search, User } from "lucide-react";

const WHATSAPP_NUMBER = "212642618936"; // chiffres uniquement, sans "+" ni espaces

const DESTINATIONS = [
  "Where to?",
  "Marrakech",
  "Merzouga Desert",
  "Fes",
  "Chefchaouen",
  "Sahara / Zagora",
];

const DURATIONS = [
  "Any Duration",
  "Day Trip",
  "2 - 3 Days",
  "4 - 6 Days",
  "7+ Days",
];

const GUESTS = ["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5+ Guests"];

export default function SearchBar(): React.JSX.Element {
  const [destination, setDestination] = useState(DESTINATIONS[0]);
  const [duration, setDuration] = useState(DURATIONS[0]);
  const [guests, setGuests] = useState(GUESTS[1]);

  const handleSearch = (): void => {
    const message =
      `Hello Marrakech Package team,\n\n` +
      `I would like to request more information about a Morocco tour with the following details:\n\n` +
      `• Destination: ${destination}\n` +
      `• Duration: ${duration}\n` +
      `• Number of guests: ${guests}\n\n` +
      `Could you please share availability and pricing? Thank you.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
        <SearchField
          icon={<MapPin className="h-5 w-5" aria-hidden="true" />}
          label="Destination"
          value={destination}
          options={DESTINATIONS}
          onChange={setDestination}
        />

        <Divider />

        <SearchField
          icon={<Calendar className="h-5 w-5" aria-hidden="true" />}
          label="Duration"
          value={duration}
          options={DURATIONS}
          onChange={setDuration}
        />

        <Divider />

        <SearchField
          icon={<User className="h-5 w-5" aria-hidden="true" />}
          label="Guests"
          value={guests}
          options={GUESTS}
          onChange={setGuests}
        />

        <button
          type="button"
          onClick={handleSearch}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover lg:mt-0 lg:ml-2"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Get a Free Quote
        </button>
      </div>
    </div>
  );
}

function SearchField({
  icon,
  label,
  value,
  options,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}): React.JSX.Element {
  return (
    <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-muted">
      <span className="shrink-0 text-primary">{icon}</span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
          {label}
        </span>
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full cursor-pointer truncate border-0 bg-transparent p-0 text-sm font-semibold text-heading focus:outline-none focus:ring-0"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}

function Divider(): React.JSX.Element {
  return (
    <span
      aria-hidden="true"
      className="mx-2 hidden w-px self-stretch bg-border lg:block"
    />
  );
}
