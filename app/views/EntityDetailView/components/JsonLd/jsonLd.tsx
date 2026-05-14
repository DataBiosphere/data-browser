import Head from "next/head";
import { JSX } from "react";
import type { SchemaDataset } from "../../../../utils/schemaOrg/types";
import { escapeJsonForHtml } from "../../../../utils/schemaOrg/utils";

interface JsonLdProps {
  jsonLd: SchemaDataset;
}

/**
 * Renders a Schema.org Dataset JSON-LD `<script>` tag in the document head so
 * search-engine crawlers (Google Dataset Search) can pick it up.
 *
 * The JSON is HTML-escaped via `escapeJsonForHtml` to prevent script-context
 * breakout (e.g. via stray `</script>` sequences in entity descriptions).
 * @param props - Component props.
 * @param props.jsonLd - Schema.org Dataset payload built by a consumer-specific builder.
 * @returns Head element with the JSON-LD script tag.
 */
export const JsonLd = ({ jsonLd }: JsonLdProps): JSX.Element => {
  return (
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: escapeJsonForHtml(JSON.stringify(jsonLd)),
        }}
        type="application/ld+json"
      />
    </Head>
  );
};
