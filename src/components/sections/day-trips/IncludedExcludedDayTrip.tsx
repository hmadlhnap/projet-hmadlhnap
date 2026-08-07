import {Check, X } from "lucide-react";


import { linesToArray } from "@/lib/daytrips";


interface IncludedExcludedDayTripProps {
  included: string;
  excluded: string;
}


export default function IncludedExcludedDayTrip({included,excluded,}: IncludedExcludedDayTripProps) {

  const includedItems = linesToArray(included);
  const excludedItems = linesToArray(excluded);

  if (includedItems.length === 0 && excludedItems.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Day trip inclusions and exclusions"
      className="bg-background"
    >
      <div className="mx-auto grid max-w-7xl px-4 py-4 sm:px-6 sm:py-8 gap-6 lg:grid-cols-2">
      

        <article className=" p-2 sm:p-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              What Is Included
            </h2>
          </div>

          <ul className="mt-6 space-y-4">
            {includedItems.map((item, index) => (
              <li key={`${item}-${index}`} className="flex items-start gap-3">
                <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-gold-muted text-primary">
                  <Check
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={2.2}
                  />
                </span>

                <span className="text-base leading-7 text-text-secondary">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </article>

        {/* Excluded */}
        <article className=" p-2 sm:p-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              What Is Not Included
            </h2>
          </div>

          <ul className="mt-6 space-y-4">
            {excludedItems.map((item, index) => (
              <li key={`${item}-${index}`} className="flex items-start gap-3">
                <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-text-muted">
                  <X aria-hidden="true" className="size-4" strokeWidth={2.2} />
                </span>

                <span className="text-base leading-7 text-text-secondary">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
