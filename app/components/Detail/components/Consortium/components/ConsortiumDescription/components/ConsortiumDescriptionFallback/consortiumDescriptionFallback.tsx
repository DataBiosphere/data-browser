import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { useRouter } from "next/router";
import { Fragment } from "react";

export const ConsortiumDescriptionFallback = (): JSX.Element => {
  const { asPath } = useRouter();
  return (
    <Fragment>
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
    </Fragment>
  );
};
