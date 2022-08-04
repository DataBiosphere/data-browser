/**
 * Index page hero component comprising title, summary counts, and export button.
 */

// Core dependencies
import Link from "next/link";
import React, { ReactNode } from "react";

// App dependencies
import { HeroTitle, Title } from "../../../common/Title/title";

// Styles
import { HeroLayout, SummaryWidget, Widgets } from "./hero.styles";

interface Props {
  Summaries?: ReactNode;
  title: HeroTitle;
}

export const Hero = ({ Summaries, title }: Props): JSX.Element => {
  return (
    <HeroLayout>
      <Title title={title} />
      {Summaries && (
        <Widgets>
          <SummaryWidget buttonWidget={false}>
            {/* TODO +n link widget, and accompanying Dot separator */}
            {Summaries}
          </SummaryWidget>
          <Link href="/export" passHref>
            <button>Explore</button>
          </Link>
        </Widgets>
      )}
    </HeroLayout>
  );
};
