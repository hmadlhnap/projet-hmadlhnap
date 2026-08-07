import { Info } from "lucide-react";

interface ContentInformationDayTripProps {
  contentSections: string;
  importantInformation: string;
}

export default function ContentInformationDayTrip({contentSections,importantInformation,}: ContentInformationDayTripProps) {


  if (!contentSections && !importantInformation) {
    return null;
  }

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-4 sm:px-6 sm:py-8">
        {/* Additional content */}
        {contentSections && (
          <article
            className="
              [&_h2]:mt-10
              [&_h2]:text-3xl
              [&_h2]:font-bold
              [&_h2]:leading-tight
              [&_h2]:text-heading

              [&_h2:first-child]:mt-0

              [&_p]:mt-4
              [&_p]:pl-8
              [&_p]:text-base
              [&_p]:leading-8
              [&_p]:text-text-secondary

              [&_strong]:font-bold
              [&_strong]:text-heading
            "
            dangerouslySetInnerHTML={{
              __html: contentSections,
            }}
          />
        )}

        {/* Important information */}
        {importantInformation && (
          <article className="rounded-2xl border border-border bg-surface-soft p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-muted text-primary">
                <Info aria-hidden="true" className="size-6" strokeWidth={1.8} />
              </div>

              <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                Important Information
              </h2>
            </div>

            <div
              className="
                mt-6

                [&_ul]:space-y-3
                [&_ul]:pl-5
                [&_ul]:list-disc

                [&_li]:pl-1
                [&_li]:text-base
                [&_li]:leading-7
                [&_li]:text-text-secondary

                [&_li::marker]:text-primary

                [&_p]:text-base
                [&_p]:leading-7
                [&_p]:text-text-secondary
              "
              dangerouslySetInnerHTML={{
                __html: importantInformation,
              }}
            />
          </article>
        )}
      </div>
    </section>
  );
}
