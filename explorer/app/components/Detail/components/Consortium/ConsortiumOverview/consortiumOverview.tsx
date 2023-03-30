import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { useRouter } from "next/router";
import React from "react";

export const ConsortiumOverview = (): JSX.Element => {
  const { asPath } = useRouter();
  return (
    <div>
      <p>
        The description of this consortium is under development for additional
        information.
      </p>
      <p>
        Please reach out to{" "}
        <a href={"mailto:help@lists.anvilproject.org"}>
          help@lists.anvilproject.org
        </a>{" "}
        for additional information.
      </p>
      <p>
        Meanwhile, please view the consortium{"'"}s{" "}
        <Link label="studies" url={`${asPath}/studies`} /> and{" "}
        <Link label="workspaces" url={`${asPath}/workspaces`} />.
      </p>
    </div>
  );
};
